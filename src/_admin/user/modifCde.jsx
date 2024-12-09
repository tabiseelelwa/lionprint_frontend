import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GoPencil, GoTrash } from "react-icons/go";

const ModifCde = () => {
  const { num } = useParams();
  const [commande, setCommande] = useState([]);
  const [nomClient, setNomClient] = useState([]);
  const [total, setTotal] = useState(0);

  const backend = "https://backend.lion-print.net";

  // Récupération des données de la facture
  useEffect(() => {
    axios
      .get(`${backend}/recupDetComm/${num}`)
      .then((res) => {
        setCommande(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Récupération du nom du client ayant commandé
  useEffect(() => {
    axios
      .get(`${backend}/recupNomClient/${num}`)
      .then((res) => {
        setNomClient(res.data[0].client);
      })
      .catch((err) => console.log(err));
  }, []);

  // CALCUL DU TOTAL DE LA FACTURE
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

  // SUPPRESION D'UN ELEMENT DE LA COMMANDE

  const suppElmtCde = (idDetailCom) => {
    axios
      .delete(`${backend}/suppElmtCde/` + idDetailCom)
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  };

  return (
    <div id="Commande">
      <div className="form">
        <div className="body">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
            }}
          >
            <p>
              Nom client : <strong>{nomClient}</strong>
            </p>
          </div>
          <hr />
          <div className="commande">
            <table className="table table-borderless ">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th style={{ textAlign: "right" }}>Quantité</th>
                  <th style={{ textAlign: "right" }}>P.U</th>
                  <th style={{ textAlign: "right" }}>P.T</th>
                  <th style={{ textAlign: "right" }}></th>
                </tr>
              </thead>

              <tbody>
                {commande.map((com, i) => {
                  const totalPrix = com.quantite * com.prixUnit;
                  return (
                    <>
                      <tr key={i}>
                        <td>{com.desiProd}</td>
                        <td style={{ textAlign: "right" }}>{com.quantite}</td>
                        <td style={{ textAlign: "right" }}>{com.prixUnit}</td>
                        <td style={{ textAlign: "right" }} className="total">
                          {totalPrix}
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            display: "flex",
                            gap: "1rem",
                          }}
                        >
                          <GoPencil style={{ color: "blue" }} />
                          <GoTrash
                            style={{ color: "red" }}
                            onClick={() => suppElmtCde(com.idDetailCom)}
                          />
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div
            style={{
              display: "flex",
              gap: "2rem",
            }}
          >
            <h3 style={{ fontWeight: "bold" }}>Total</h3>
            <h3 style={{ fontWeight: "bold" }}>{total.toLocaleString()} $</h3>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2rem",
            borderTop: "1px #ccc solid",
            paddingTop: "2rem",
          }}
        >
          <Link
            to="/list-cdes"
            style={{
              borderRadius: "0.38rem",
              width: "100%",
              backgroundColor: "#d1820c",
              padding: "0.5rem",
              textDecoration: "none",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Retour à la liste des commandes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModifCde;
