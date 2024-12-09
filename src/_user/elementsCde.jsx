import axios from "axios";
import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";

const ElementsCde = () => {
  const [showModal, setShowModal] = useState(false);
  const { num } = useParams();
  const navigate = useNavigate();
  const [prod, setProd] = useState([]); // pour charger les produits
  const [numCommande, setNumCommande] = useState([]); // Pour afficher de numéro de la dernière commande
  const [detailCmd, setDetailCmd] = useState([]);
  const [total, setTotal] = useState(0);

  const [value, setValue] = useState({
    // Les valeurs à enregistrer dans détails command
    numCom: "",
    designProduit: "",
    prix: 0,
    quantProd: "",
  });

  const backend = "https://backend.lion-print.net";

  // Récupération du numéro de la dernière commande
  useEffect(() => {
    axios
      .get(`${backend}/dernCommande`)
      .then((res) => {
        setNumCommande(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Récupération des détails de la dernière commande
  useEffect(() => {
    axios
      .get(`${backend}/recupDetComm/${num}`)
      .then((res) => {
        setDetailCmd(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Récupération des produits
  useEffect(() => {
    axios
      .get(`${backend}/recupProds`)
      .then((res) => {
        setProd(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Ajout des détails de la commande
  const postDetCom = (e) => {
    e.preventDefault();
    axios
      .post(`${backend}/destailCommande`, value)
      .then((res) => {
        setShowModal(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // CALCUL DU MONTANT TOTAL DE LA FACTURE
  useEffect(() => {
    let lignes = document.querySelectorAll(".total");
    let somme = 0;

    for (let i = 0; i < lignes.length; i++) {
      if (lignes[i].className === "total") {
        somme += isNaN(lignes[i].innerHTML) ? 0 : parseInt(lignes[i].innerHTML);
        setTotal(somme);
      }
    }
  });

  // Terminer la commande
  const terminerCde = (e) => {
    e.preventDefault();
    axios
      .put(`${backend}/terminerCde/` + num)
      .then((res) => {
        navigate("/list-cdes");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="elmtsCde">
      {showModal ? (
        <div className="formModalWrapper">
          <form onSubmit={postDetCom}>
            <div className="commande">
              <select
                onChange={(e) => setValue({ ...value, numCom: e.target.value })}
              >
                <option value="">Sélectioner le numéro de la commande</option>
                {numCommande.map((p, i) => {
                  return (
                    <option key={i} value={p.numCom}>
                      {p.numCom}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="produits">
              <select
                onChange={(e) =>
                  setValue({ ...value, designProduit: e.target.value })
                }
              >
                <option value="">Choisir un produit</option>
                {prod.map((p, i) => {
                  return (
                    <option key={i} value={p.designProd}>
                      {p.designProd}
                    </option>
                  );
                })}
              </select>

              <input
                type="number"
                placeholder="Prix"
                onChange={(e) => setValue({ ...value, prix: e.target.value })}
              />
              <input
                type="number"
                placeholder="Quantité"
                onChange={(e) =>
                  setValue({ ...value, quantProd: e.target.value })
                }
              />
            </div>
            <div className="btns">
              <button>Ajouter</button>
              <span onClick={() => setShowModal(false)}>Fermer</span>
            </div>
          </form>
        </div>
      ) : null}
      <div>
        <button
          onClick={() => setShowModal(true)}
          style={{ marginBottom: "5px" }}
        >
          <GoPlus style={{ fontSize: "22px", fontWeight: "700" }} /> Ajouter un
          produit
        </button>
        <div className="cde">
          <table className="table table-stripped ">
            <thead>
              <tr>
                <th>Produit</th>
                <th style={{ textAlign: "right" }}>Quantité</th>
                <th style={{ textAlign: "right" }}>P.U</th>
                <th style={{ textAlign: "right" }}>P.T</th>
              </tr>
            </thead>

            <tbody>
              {detailCmd.map((cmd, i) => {
                const PrixTotal = cmd.quantite * cmd.prixUnit;
                return (
                  <tr key={i}>
                    <td>{cmd.desiProd}</td>
                    <td style={{ textAlign: "right" }}>{cmd.quantite}</td>
                    <td style={{ textAlign: "right" }}>{cmd.prixUnit}</td>
                    <td style={{ textAlign: "right" }} className="total">
                      {PrixTotal}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="calcul">
          <h4>Total</h4>
          <h4> {total.toLocaleString()} $</h4>
        </div>
        <div>
          <button className="enregCommande" onClick={terminerCde}>
            Terminer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElementsCde;
