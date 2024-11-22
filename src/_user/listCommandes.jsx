import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoCheck, GoEye, GoTrash, GoX } from "react-icons/go";
import AjoutCommande from "./ajoutCommande";
import axios from "axios";

const ListCommandes = () => {
  const [modal, setModal] = useState(false);
  const [cmds, setCmds] = useState([]);
  const [cmdsNulles, setCmdsNulles] = useState([]);

  const [role, setRole] = useState();

  useEffect(() => {
    axios.get("https://backend.lion-print.net/authentification").then((res) => {
      setRole(res.data.role);
    });
  }, []);

  // Toutes les commandes nulles
  useEffect(() => {
    axios
      .get("https://backend.lion-print.net/recupCmdsNull")
      .then((res) => {
        setCmdsNulles(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Toutes les commandes non nulles
  useEffect(() => {
    axios
      .get("https://backend.lion-print.net/recupCmds")
      .then((res) => {
        setCmds(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const facturer = (numCom) => {
    axios
      .put("https://backend.lion-print.net/facturer/" + numCom)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const Annuler = (numCom) => {
    axios
      .put("https://backend.lion-print.net/annuler/" + numCom)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const suppri = (numCom) => {
    axios
      .delete("https://backend.lion-print.net/suppCde/" + numCom)
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  };

  const [currentPage, setCurrentpage] = useState(1);

  const enregParPage = 10;
  const lastIndex = currentPage * enregParPage;
  const firstIndex = lastIndex - enregParPage;
  const donnees = cmds.slice(firstIndex, lastIndex);
  const nbrPage = Math.ceil(cmds.length / enregParPage);

  return (
    <div>
      {modal ? (
        <div>
          <AjoutCommande setModal={setModal} />
        </div>
      ) : null}
      <div className="container w-75" id="head">
        <div className="list-com">Liste de toutes les commandes</div>
        {role === "simple_user" ? (
          <Link className="ajoutCommande" onClick={() => setModal(true)}>
            Nouvelle commande
          </Link>
        ) : (
          ""
        )}
      </div>

      <div className="contener" id="cdesNulles">
        {cmdsNulles.map((cde, i) => {
          return (
            <div className="cde" key={i}>
              <div className="nomClient">
                <h5>{cde.client}</h5>
              </div>
              <div className="dateCde">{cde.dateCommande}</div>
              {role === "simple_user" ? (
                <Link className="btnAjoutCde" to={`/commande/${cde.numCom}`}>
                  Ajouter les produits
                </Link>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>

      <table className="table container w-75">
        <thead>
          <tr>
            <th>Numéro commande</th>
            <th>Date commande</th>
            <th>Nom du client</th>
            <th>Statut</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {donnees.map((com, i) => {
            return (
              <tr key={i}>
                <td>{com.numCom}</td>
                <td>{com.dateCommande}</td>
                <td>{com.client}</td>
                <td>{com.statut}</td>
                <td className="controlsBtn">
                  {role === "simple_user" ? (
                    <>
                      <Link to={`/descript-commande/${com.numCom}`}>
                        <GoEye
                          style={{
                            color: "black",
                            fontSize: "18px",
                            fontWeight: "650",
                          }}
                        />
                      </Link>
                      <div onClick={() => facturer(com.numCom)}>
                        <GoCheck
                          style={{
                            color: "green",
                            display: com.statut === "Facturée" ? "none" : "",
                            fontSize: "18px",
                            fontWeight: "650",
                          }}
                        />
                      </div>
                      <div onClick={() => Annuler(com.numCom)}>
                        <GoX
                          // {...com.statut === "Annulée" ? "disabled" : null}
                          style={{
                            color: "red",
                            display: com.statut === "Annulée" ? "none" : "",
                            fontSize: "18px",
                            fontWeight: "650",
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div onClick={() => suppri(com.numCom)}>
                        <GoTrash style={{ color: "red", cursor: "pointer" }} />
                      </div>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="controls">
        <button onClick={precedent}>
          {nbrPage <= 1
            ? ""
            : currentPage > 1 && nbrPage > 1
            ? "Précédent"
            : ""}
        </button>
        <span>{nbrPage <= 1 ? "" : currentPage + " sur " + nbrPage}</span>
        <button onClick={suivant}>
          {currentPage >= nbrPage ? "" : "Suivant"}
        </button>
      </div>
    </div>
  );

  function precedent() {
    if (currentPage !== 1) {
      setCurrentpage(currentPage - 1);
    }
  }

  function suivant() {
    if (currentPage !== nbrPage) {
      setCurrentpage(currentPage + 1);
    }
  }
};

export default ListCommandes;
