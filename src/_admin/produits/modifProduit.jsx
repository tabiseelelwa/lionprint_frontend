import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ModifProduit = () => {
  const navigate = useNavigate();
  const { codeProd } = useParams();
  const [produit, setProduit] = useState({
    designation: "",
    categorie: "",
  });

  const backend = "https://backend.fizitech.org";

  useEffect(() => {
    axios
      .get(`${backend}/recupProd/${codeProd}`)
      .then((res) =>
        setProduit({
          ...produit,
          designation: res.data[0].designProd,
          categorie: res.data[0].categorie,
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const modifProd = (e) => {
    e.preventDefault();
    axios
      .put(`${backend}/modifProd/${codeProd}`, produit)
      .then((res) => {
        console.log(res);
        navigate("/admin/liste-des-produits");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="ajoutClient">
      <form onSubmit={modifProd}>
        <h5>Modification produit</h5>
        <input
          type="text"
          placeholder="Désignation produit"
          onChange={(e) =>
            setProduit({ ...produit, designation: e.target.value })
          }
          value={produit.designation}
        />
        <input
          type="text"
          placeholder="Catégorie"
          onChange={(e) =>
            setProduit({ ...produit, categorie: e.target.value })
          }
          value={produit.categorie}
        />
        <button>Modifier</button>
      </form>
    </div>
  );
};

export default ModifProduit;
