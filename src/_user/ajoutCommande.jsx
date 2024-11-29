import axios from "axios";
import React, { useEffect, useState } from "react";
import { GoX } from "react-icons/go";

const AjoutCommande = ({ setModal }) => {
  const [client, setClient] = useState([]);
  const [value, setValue] = useState({
    nomClient: "",
  });

  const backend = "https://backend.lion-print.net";

  const creatCommande = (e) => {
    e.preventDefault();
    axios
      .post(`${backend}/commande`, value)
      .then((res) => {
        setModal(false);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${backend}/recupClient`)
      .then((res) => {
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
