import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../pages/navbar";
import axios from "axios";

const UserLayout = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [nom, setNom] = useState();

  const backend = "https://backend.fizitech.org";

  useEffect(() => {
    axios
      .get(`${backend}/authentification`)
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
    <div className={nom}>
      <Navbar />
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
