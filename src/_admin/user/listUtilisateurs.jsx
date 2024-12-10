import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoPencil, GoTrash } from "react-icons/go";
import axios from "axios";

const ListUtilisateurs = () => {
  const [users, setUsers] = useState([]);

  const backend = "https://backend.fizitech.org";

  useEffect(() => {
    axios
      .get(`${backend}/recupUsers`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const supprimerUser = (idUser) => {
    axios
      .delete(`${backend}/supprUser/` + idUser)
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  };

  const [currentPage, setCurrentpage] = useState(1);

  const enregParPage = 10;
  const lastIndex = currentPage * enregParPage;
  const firstIndex = lastIndex - enregParPage;
  const donnees = users.slice(firstIndex, lastIndex);
  const nbrPage = Math.ceil(users.length / enregParPage);

  return (
    <div id="listes">
      <div id="head">
        <div className="list-com">Les utilisateurs</div>
        <Link className="ajoutCommande" to="/admin/nouvel-utilisateur">
          Ajouter un Utilisateur
        </Link>
      </div>

      <div id="tableau">
        <table className="table W-100">
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Postnom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Rôle</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {donnees.map((u, i) => {
              return (
                <tr key={i}>
                  <td>{u.idUser} </td>
                  <td>{u.nomUser}</td>
                  <td>{u.postnomUser}</td>
                  <td>{u.prenomUser}</td>
                  <td>{u.email}</td>
                  <td>{u.telephone}</td>
                  <td>{u.role}</td>
                  <td className="controlsBtn">
                    {/* <Link to={`/admin/profil-utlisateur/${u.idUser}`}>
                    <GoEye
                      style={{
                        color: "black",
                        fontSize: "18px",
                        fontWeight: "650",
                      }}
                    />
                  </Link> */}
                    <Link to={`/admin/modif-utilisateur/${u.idUser}`}>
                      <GoPencil
                        style={{
                          fontSize: "18px",
                          fontWeight: "650",
                        }}
                      />
                    </Link>
                    <Link onClick={() => supprimerUser(u.idUser)}>
                      <GoTrash
                        style={{
                          color: "red",
                          fontSize: "22px",
                          fontWeight: "650",
                        }}
                      />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="controls">
        <button onClick={precedent}>
          {nbrPage <= 1
            ? ""
            : currentPage > 1 && nbrPage > 1
            ? "Précédent"
            : ""}
        </button>
        <span>{nbrPage <= 1 ? "" : currentPage + " sur " + nbrPage}</span>
        <button onClick={suivant}>
          {currentPage >= nbrPage ? "" : "Suivant"}
        </button>
      </div>
    </div>
  );

  function precedent() {
    if (currentPage !== 1) {
      setCurrentpage(currentPage - 1);
    }
  }

  function suivant() {
    if (currentPage !== nbrPage) {
      setCurrentpage(currentPage + 1);
    }
  }
};

export default ListUtilisateurs;
