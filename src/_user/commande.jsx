
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { FaArrowLeft } from "react-icons/fa";

const Commande = () => {
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

  const factuRef = useRef();
  const imprimer = useReactToPrint({
    content: () => factuRef.current,
  });

  return (
    <div id="Commande">
      <div className="form">
        <div ref={factuRef} className="body">
          <p>
            Nom client : <strong>{nomClient}</strong>
          </p>
          <hr />
          <div className="commande">
            <table className="table table-borderless ">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th style={{ textAlign: "right" }}>Quantité</th>
                  <th style={{ textAlign: "right" }}>P.U</th>
                  <th style={{ textAlign: "right" }}>P.T</th>
                </tr>
              </thead>

              <tbody>
                {commande.map((com, i) => {
                  const totalPrix = com.quantite * com.prixUnit;
                  return (
                    <tr key={i}>
                      <td>{com.desiProd}</td>
                      <td style={{ textAlign: "right" }}>{com.quantite}</td>
                      <td style={{ textAlign: "right" }}>{com.prixUnit}</td>
                      <td style={{ textAlign: "right" }} className="total">
                        {totalPrix}
                      </td>
                    </tr>
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
          <button onClick={imprimer} style={{ borderRadius: "0.38rem" }}>
            Imprimer
          </button>
          <Link
            to="/list-cdes"
            style={{
              backgroundColor: "#2a0685",
              border: "2px solid #2a0685",
              textDecoration: "none",
              textAlign: "center",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 0.3rem",
              gap: "0.5rem",
              borderRadius: "0.38rem",
            }}
          >
            <FaArrowLeft />
            Retour
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Commande;
