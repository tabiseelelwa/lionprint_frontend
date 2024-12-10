import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AjoutClient = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState({
    nom: "",
    postnom: "",
    prenom: "",
    email: "",
    telephone: "",
  });

  const backend = "https://backend.lion-print.net";

  const enregClient = (e) => {
    e.preventDefault();
    axios
      .post(`${backend}/creatClient`, clients)
      .then((res) => {
        console.log(res.data);
        navigate("/liste-des-clients");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="ajoutClient">
      <form onSubmit={enregClient}>
        <h5>Nouveau client</h5>
        <input
          type="text"
          placeholder="Nom du client"
          onChange={(e) => setClients({ ...clients, nom: e.target.value })}
        />
        <input
          type="text"
          placeholder="Postnom du client"
          onChange={(e) => setClients({ ...clients, postnom: e.target.value })}
        />
        <input
          type="text"
          placeholder="Prénom"
          onChange={(e) => setClients({ ...clients, prenom: e.target.value })}
        />
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setClients({ ...clients, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Téléphone"
          onChange={(e) =>
            setClients({ ...clients, telephone: e.target.value })
          }
        />
        <button>Enregistrer</button>
      </form>
    </div>
  );
};

export default AjoutClient;
