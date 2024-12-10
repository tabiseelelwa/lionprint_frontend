import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../images/lionprint.png";

const Navbar = () => {
  const [navActif, setNavActif] = useState(
    window.innerWidth >= 800 ? true : false
  );

  const closeNav = () => {
    if (navActif === true) {
      if (window.innerWidth <= 800) {
        setNavActif(false);
      } else {
        setNavActif(true);
      }
    }
  };

  const [nom, setNom] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    axios.get(`${backend}/authentification`).then((res) => {
      setRole(res.data.role);
    });
  }, []);

  const backend = "https://backend.fizitech.org";

  useEffect(() => {
    axios.get(`${backend}/authentification`).then((res) => {
      setNom(res.data.nomUser);
    });
  }, []);

  const deconnexion = (e) => {
    e.preventDefault();
    axios
      .get(`${backend}/logout`)
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
      {navActif ? (
        <div className="__menu">
          <div>
            <ul className="menu">
              {role === "admin" ? (
                <>
                  <Link to="" onClick={closeNav}>
                    <li>Tableau de bord</li>
                  </Link>
                  <Link to="liste-des-utilisateurs" onClick={closeNav}>
                    <li>Utilisateurs</li>
                  </Link>
                  <Link to="liste-des-produits" onClick={closeNav}>
                    <li>Produits</li>
                  </Link>
                </>
              ) : null}

              {role === "simple_user" ? (
                <Link to="" onClick={closeNav}>
                  <li>Accueil</li>
                </Link>
              ) : (
                ""
              )}

              <Link to="list-cdes" onClick={closeNav}>
                <li>Commandes</li>
              </Link>

              <Link to="liste-des-clients" onClick={closeNav}>
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
      ) : (
        ""
      )}
      <div className="nav__buttons" onClick={() => setNavActif(!navActif)}>
        {navActif ? (
          <AiOutlineClose style={{ fontSize: "24px" }} />
        ) : (
          <FaBars style={{ fontSize: "24px" }} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
