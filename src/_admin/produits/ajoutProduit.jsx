import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AjoutProduit = () => {
  const navigate = useNavigate();
  const [produits, setProduits] = useState({
    designation: "",
    prix: "",
    categorie: "",
  });

  const createProd = (e) => {
    e.preventDefault();
    axios
      .post("https://backend.lion-print.net/creatProd", produits)
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
          type="texte"
          placeholder="Prix du produit"
          onChange={(e) => setProduits({ ...produits, prix: e.target.value })}
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
