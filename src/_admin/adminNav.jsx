import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "../images/lionprint.png";
import { Link } from "react-router-dom";
const AdminNav = () => {
  const [nom, setNom] = useState();
  useEffect(() => {
    axios.get("http://localhost:500/authentification").then((res) => {
      setNom(res.data.nomUser);
    });
  }, []);

  const deconnexion = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:500/logout")
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {});
  };
  return (
    <div className="navba contener">
      <div className="logo">
        <Link to="">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div>
        <ul className="menu">
          <Link to="">
            <li>Tableau de bord</li>
          </Link>
          <Link to="liste-des-utilisateurs">
            <li>Utilisateurs</li>
          </Link>
          <Link to="liste-des-produits">
            <li>Produits</li>
          </Link>
          <Link to="list-cdes">
            <li>Commandes</li>
          </Link>
          <Link to="liste-des-clients">
            <li>Clients</li>
          </Link>
        </ul>
      </div>
      <div className="user">
        <p>{nom}</p>
        <button className="bouton" onClick={deconnexion}>
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default AdminNav;
