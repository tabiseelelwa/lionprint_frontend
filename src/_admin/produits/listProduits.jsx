import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoPencil, GoTrash } from "react-icons/go";
import axios from "axios";

const ListProduits = () => {
  const [produits, setProduits] = useState([]);

  const backend = "https://backend.fizitech.org";

  useEffect(() => {
    axios
      .get(`${backend}/recupProds`)
      .then((res) => {
        setProduits(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const supprimer = (codeProd) => {
    axios
      .delete(`${backend}/supprimer/` + codeProd)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const [currentPage, setCurrentpage] = useState(1);

  const enregParPage = 10;
  const lastIndex = currentPage * enregParPage;
  const firstIndex = lastIndex - enregParPage;
  const donnees = produits.slice(firstIndex, lastIndex);
  const nbrPage = Math.ceil(produits.length / enregParPage);

  return (
    <div id="listes">
      <div id="head">
        <div className="list-com">Nos produits</div>
        <Link className="ajoutCommande" to="/admin/ajout-produit">
          Ajouter un produit
        </Link>
      </div>

      <div id="tableau">
        <table className="table">
          <thead>
            <tr>
              <th>Code produit</th>
              <th>Désignation</th>
              <th>Catégorie</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {donnees.map((p, i) => {
              return (
                <tr key={i}>
                  <td>{p.codeProd}</td>
                  <td>{p.designProd}</td>
                  <td>{p.categorie}</td>
                  <td className="controlsBtn">
                    <Link to={`/admin/modif-produit/${p.codeProd}`}>
                      <GoPencil
                        style={{
                          fontSize: "18px",
                          fontWeight: "650",
                        }}
                      />
                    </Link>
                    <Link onClick={() => supprimer(p.codeProd)}>
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

export default ListProduits;
