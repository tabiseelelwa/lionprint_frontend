import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [err, setErreur] = useState(false);
  const [values, setValues] = useState({
    email: "",
    mdp: "",
  });

  const backend = "https://backend.lion-print.net";

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get(`${backend}/authentification`)
      .then((res) => {
        if (res.data.valid) {
          if (res.data.role === "admin") {
            navigate("/Admin");
          } else if (res.data.role === "simple_user") {
            navigate("/");
          } else {
            navigate("/login");
          }
        }
      })
      .catch((err) => console.log(err));
  });

  const login = (e) => {
    e.preventDefault();
    axios
      .post(`${backend}/login`, values, {
        withCredentials: true, // This ensures that cookies are sent
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header
        },
      })
      .then((res) => {
        if (res.data.Login === "admin") {
          navigate("/admin");
        } else if (res.data.Login === "simple_user") {
          navigate("/");
        } else {
          setErreur(true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login">
      <form onSubmit={login}>
        <h5>Connectez-vous</h5>
        {err ? (
          <p style={{ textAlign: "center", color: "red" }}>
            Email ou mot de passe incorrect
          </p>
        ) : null}
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => setValues({ ...values, mdp: e.target.value })}
        />
        <button>Connexion</button>
        <Link>Mot de passe oublié ?</Link>
      </form>
    </div>
  );
};

export default Login;
