import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AjoutProduit = () => {
  const navigate = useNavigate();
  const [produits, setProduits] = useState({
    designation: "",
    categorie: "",
  });

  const backend = "https://backend.lion-print.net";

  const createProd = (e) => {
    e.preventDefault();
    axios
      .post(`${backend}/creatProd`, produits)
      .then((res) => {
        navigate("/admin/liste-des-produits");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div id="ajoutClient">
      <form onSubmit={createProd}>
        <h5>Création produit</h5>
        <input
          type="text"
          placeholder="Désignation produit"
          onChange={(e) =>
            setProduits({ ...produits, designation: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Catégorie"
          onChange={(e) =>
            setProduits({ ...produits, categorie: e.target.value })
          }
        />
        <button>Enregistrer</button>
      </form>
    </div>
  );
};

export default AjoutProduit;
