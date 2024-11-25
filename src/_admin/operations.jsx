import axios from "axios";
import React, { useEffect, useState } from "react";

const Operations = () => {
  const [nombreClients, setNobreClients] = useState();
  const [nombreCmdesEnc, setNombreCmdesEnc] = useState();
  const [nombreCdesFactur, setNombreCdesFactur] = useState();
  const [nombreCdesAnnul, setNombreCdesAnnul] = useState();
  const [nombreUtlisateurs, setNombreUtlisateurs] = useState();
  const [nombreProduits, setNombreProduits] = useState();

  useEffect(() => {
    axios
      .get(`https://backend.lion-print.net/nombreUtilisateurs`)
      .then((res) => setNombreUtlisateurs(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`https://backend.lion-print.net/nombreProduits`)
      .then((res) => setNombreProduits(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`https://backend.lion-print.net/nombreClients`)
      .then((res) => setNobreClients(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`https://backend.lion-print.net/nombreCdesEnCours`)
      .then((res) => setNombreCmdesEnc(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`https://backend.lion-print.net/nombreCdesFactur`)
      .then((res) => setNombreCdesFactur(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`https://backend.lion-print.net/nombreCdesAnnul`)
      .then((res) => setNombreCdesAnnul(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      id="AccueilAdmin"
      className="contener"
      style={{
        backgroundImage: `url(
      "images/image.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="cont">
        <div className="gauche">
          <div className="produits">
            <div className="nobrProds">
              <h1>{nombreProduits}</h1>
              <p>Produits et services</p>
            </div>
          </div>
          <div className="client">
            <div className="clients">
              <h1>{nombreClients}</h1>
              <p>Clients</p>
            </div>
            <div className="clients">
              <h1>{nombreCmdesEnc}</h1>
              <p>Commandes en cours</p>
            </div>
          </div>
        </div>

        <div className="droite">
          <div className="utilisateurs">
            <h1>{nombreUtlisateurs}</h1>
            <p>Utilisateurs</p>
          </div>
          <div className="client">
            <div className="clients">
              <h1>{nombreCdesFactur}</h1>
              <p>Commandes Facturées</p>
            </div>
            <div className="clients">
              <h1>{nombreCdesAnnul}</h1>
              <p>Commandes Annulées</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operations;
