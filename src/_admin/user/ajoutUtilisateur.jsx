import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AjoutUtilisateur = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    nom: "",
    postnom: "",
    prenom: "",
    email: "",
    telephone: "",
  });

  const backend = "https://backend-lp.fizitech.org";

  const enregUser = (e) => {
    e.preventDefault();
    axios
      .post(`${backend}/creatUser`, values)
      .then((res) => {
        console.log(res);
        navigate("/admin/liste-des-utilisateurs");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div id="ajoutClient">
      <form onSubmit={enregUser}>
        <h5>Nouvel utilisateur</h5>
        <input
          type="text"
          placeholder="Nom "
          onChange={(e) => setValues({ ...values, nom: e.target.value })}
        />
        <input
          type="text"
          placeholder="Postnom "
          onChange={(e) => setValues({ ...values, postnom: e.target.value })}
        />
        <input
          type="text"
          placeholder="Prénom"
          onChange={(e) => setValues({ ...values, prenom: e.target.value })}
        />
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Téléphone"
          onChange={(e) => setValues({ ...values, telephone: e.target.value })}
        />
        <button>Enregistrer</button>
      </form>
    </div>
  );
};

export default AjoutUtilisateur;
