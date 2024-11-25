import axios from "axios";
import React, { useEffect, useState } from "react";
import { GoPencil, GoTrash } from "react-icons/go";
import { Link } from "react-router-dom";

const ListClient = () => {
  const [clients, setClients] = useState([]);
  const [role, setRole] = useState();

  useEffect(() => {
    axios.get("https://backend.lion-print.net/authentification").then((res) => {
      console.log(res.data.role);
      setRole(res.data.role);
    });
  }, []);

  useEffect(() => {
    axios
      .get("https://backend.lion-print.net/recupClient")
      .then((res) => {
        console.log(res.data);
        setClients(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const suppClient = (numClient) => {
    axios
      .delete("https://backend.lion-print.net/suppClient/" + numClient)
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  };

  const [currentPage, setCurrentpage] = useState(1);

  const enregParPage = 10;
  const lastIndex = currentPage * enregParPage;
  const firstIndex = lastIndex - enregParPage;
  const donnees = clients.slice(firstIndex, lastIndex);
  const nbrPage = Math.ceil(clients.length / enregParPage);

  return (
    <div className="container w-75">
      <div className="" id="head">
        <div className="list-com">Les clients</div>
        {role === "simple_user" ? (
          <Link className="ajoutCommande" to="/nouveau-client">
            Ajouter
          </Link>
        ) : (
          ""
        )}
      </div>

      <table className="table ">
        <thead>
          <tr>
            <th>Numéro client</th>
            <th>Nom </th>
            <th>Postnom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
            {role === "admin" ? <th></th> : ""}
          </tr>
        </thead>
        <tbody>
          {donnees.map((c, i) => {
            return (
              <tr key={i}>
                <td>{c.numClient}</td>
                <td>{c.nomClient} </td>
                <td>{c.postnomClient}</td>
                <td>{c.prenomClient}</td>
                <td>{c.email}</td>
                <td>{c.telephone}</td>
                {role === "admin" ? (
                  <td className="controlsBtn">
                    <Link to={`/admin/modif-client/${c.numClient}`}>
                      <GoPencil />
                    </Link>
                    <div onClick={() => suppClient(c.numClient)}>
                      <GoTrash style={{ color: "red", cursor: "pointer" }} />
                    </div>
                  </td>
                ) : (
                  ""
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
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

export default ListClient;
