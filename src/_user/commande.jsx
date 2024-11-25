import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import logo from "../images/lionprint.png";

const Commande = () => {
  const { num } = useParams();
  const [commande, setCommande] = useState([]);
  const [nomClient, setNomClient] = useState([]);
  const [total, setTotal] = useState(0);

  // Récupération des données de la facture
  useEffect(() => {
    axios
      .get(`https://backend.lion-print.net/recupDetComm/${num}`)
      .then((res) => {
        setCommande(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Récupération du nom du client ayant commandé
  useEffect(() => {
    axios
      .get(`https://backend.lion-print.net/recupNomClient/${num}`)
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
        <div
          ref={factuRef}
          className="body"
          style={{ width: "100%", padding: "2rem" }}
        >
          {/* <div className="entete">
            <img src={logo} alt="" />
          </div> */}
          <p>
            Nom client : <strong>{nomClient}</strong>
          </p>
          <hr />
          <div className="commande">
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
                {commande.map((com, i) => {
                  const totalPrix = com.quantite * com.Prix;
                  return (
                    <tr key={i}>
                      <td>{com.desiProd}</td>
                      <td style={{ textAlign: "right" }}>{com.quantite}</td>
                      <td style={{ textAlign: "right" }}>{com.Prix}</td>
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
              justifyContent: "space-between",
            }}
          >
            <h3 style={{ fontWeight: "bold" }}>Total</h3>
            <h3 style={{ fontWeight: "bold" }}>{total} $</h3>
          </div>
        </div>
        <button onClick={imprimer} style={{ margin: " 0 5rem 0 1rem" }}>
          Imprimer
        </button>
      </div>
    </div>
  );
};

export default Commande;
