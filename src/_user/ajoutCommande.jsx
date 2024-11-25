import axios from "axios";
import React, { useEffect, useState } from "react";
import { GoX } from "react-icons/go";

const AjoutCommande = ({ setModal }) => {
  const [client, setClient] = useState([]);
  const [value, setValue] = useState({
    nomClient: "",
  });

  const creatCommande = (e) => {
    e.preventDefault();
    axios
      .post("https://backend.lion-print.net/commande", value)
      .then((res) => {
        console.log(res.data);
        setModal(false);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("https://backend.lion-print.net/recupClient")
      .then((res) => {
        console.log(res.data);
        setClient(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div id="modalAjoutCommade">
      <div className="form-wrapper">
        <form onSubmit={creatCommande}>
          <div className="head">
            <h5>Nouvelle commande</h5>
            <span onClick={() => setModal(false)}>
              <GoX style={{ fontSize: "18px" }} />
            </span>
          </div>
          <select
            name=""
            id=""
            onChange={(e) => setValue({ ...value, nomClient: e.target.value })}
          >
            <option> -- Choisir un client -- </option>
            {client.map((c, i) => {
              return (
                <option value={c.nomClient + " " + c.prenomClient} key={i}>
                  {c.nomClient + " " + c.prenomClient}
                </option>
              );
            })}
          </select>
          <button>Créer</button>
        </form>
      </div>
    </div>
  );
};

export default AjoutCommande;
