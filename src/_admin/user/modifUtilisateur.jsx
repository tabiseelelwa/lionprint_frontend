import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ModifUtilisateur = () => {
  const { idUser } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    nom: "",
    postnom: "",
    prenom: "",
    email: "",
    telephone: "",
    role: "",
  });

  const backend = "https://backend-lp.fizitech.org";

  useEffect(() => {
    axios.get(`${backend}/recupUser/` + idUser).then((res) =>
      setUser({
        ...user,
        nom: res.data[0].nomUser,
        postnom: res.data[0].postnomUser,
        prenom: res.data[0].prenomUser,
        email: res.data[0].email,
        telephone: res.data[0].telephone,
        role: res.data[0].role,
      })
    );
  }, []);

  const modifUser = (e) => {
    e.preventDefault();
    axios
      .put(`${backend}/modifUser/${idUser}`, user)
      .then((res) => {
        console.log(res.data);
        navigate("/admin/liste-des-utilisateurs");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="ajoutClient">
      <form onSubmit={modifUser}>
        <h5>Modification utilisateur</h5>
        <input
          type="text"
          placeholder="Nom "
          onChange={(e) => setUser({ ...user, nom: e.target.value })}
          value={user.nom}
        />
        <input
          type="text"
          placeholder="Postnom "
          onChange={(e) => setUser({ ...user, postnom: e.target.value })}
          value={user.postnom}
        />
        <input
          type="text"
          placeholder="Prénom"
          onChange={(e) => setUser({ ...user, prenom: e.target.value })}
          value={user.prenom}
        />
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          value={user.email}
        />
        <input
          type="text"
          placeholder="Téléphone"
          onChange={(e) => setUser({ ...user, telephone: e.target.value })}
          value={user.telephone}
        />
        <select
          name=""
          id=""
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        >
          <option>--Choisir le rôle--</option>
          <option value="simple_user">Simple user</option>
          <option value="admin">Administrateur</option>
        </select>
        <button>Modifier</button>
      </form>
    </div>
  );
};

export default ModifUtilisateur;
