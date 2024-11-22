import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../pages/navbar";
import axios from "axios";

const UserLayout = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [nom, setNom] = useState();
  useEffect(() => {
    axios
      .get("https://backend.lion-print.net/authentification")
      .then((res) => {
        if (res.data.valid && res.data.role === "simple_user") {
          setNom(res.data.nomUser);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default UserLayout;
