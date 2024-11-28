import React, { useEffect, useState } from "react";
import axios from "axios";

const Accueil = () => {
  const [nombreClients, setNobreClients] = useState();
  const [nombreCmdesEnc, setNombreCmdesEnc] = useState();
  const [nombreCdesFactur, setNombreCdesFactur] = useState();
  const [nombreCdesAnnul, setNombreCdesAnnul] = useState();

  const backend = "https://backend.lion-print.net";

  useEffect(() => {
    axios
      .get(`${backend}/nombreClients`)
      .then((res) => setNobreClients(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${backend}/nombreCdesEnCours`)
      .then((res) => setNombreCmdesEnc(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${backend}/nombreCdesFactur`)
      .then((res) => setNombreCdesFactur(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${backend}/nombreCdesAnnul`)
      .then((res) => setNombreCdesAnnul(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      id="Accueil"
      className="contener"
      style={{
        backgroundImage: `url(
        "images/image.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="clientsCdes">
        <div className="clients">
          <h1>{nombreClients}</h1>
          <p>Nombre de clients</p>
        </div>
        <div className="clients">
          <h1>{nombreCmdesEnc}</h1>
          <p>Commandes en cours</p>
        </div>
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
  );
};

export default Accueil;
