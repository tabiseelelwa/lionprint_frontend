import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ModifClient = () => {
  const { numCli } = useParams();
  const navigate = useNavigate();
  const [clients, setClients] = useState({
    nom: "",
    postnom: "",
    prenom: "",
    email: "",
    telephone: "",
  });

  const backend = "https://backend.fizitech.org";

  useEffect(() => {
    axios
      .get(`${backend}/recupCli/` + numCli)
      .then((res) => {
        setClients({
          ...clients,
          nom: res.data[0].nomClient,
          postnom: res.data[0].postnomClient,
          prenom: res.data[0].prenomClient,
          email: res.data[0].email,
          telephone: res.data[0].telephone,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const modif = (e) => {
    e.preventDefault();
    axios
      .put(`${backend}/modifCli/${numCli}`, clients)
      .then((res) => {
        navigate("/admin/liste-des-clients");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="ajoutClient">
      <form onSubmit={modif}>
        <h5>Nouveau client</h5>
        <input
          type="text"
          placeholder="Nom du client"
          onChange={(e) => setClients({ ...clients, nom: e.target.value })}
          value={clients.nom}
        />
        <input
          type="text"
          placeholder="Postnom du client"
          onChange={(e) => setClients({ ...clients, postnom: e.target.value })}
          value={clients.postnom}
        />
        <input
          type="text"
          placeholder="Prénom"
          onChange={(e) => setClients({ ...clients, prenom: e.target.value })}
          value={clients.prenom}
        />
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setClients({ ...clients, email: e.target.value })}
          value={clients.email}
        />
        <input
          type="text"
          placeholder="Téléphone"
          onChange={(e) =>
            setClients({ ...clients, telephone: e.target.value })
          }
          value={clients.telephone}
        />
        <button>Modifier</button>
      </form>
    </div>
  );
};

export default ModifClient;
