import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../pages/navbar";

const AdminLayout = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [nom, setNom] = useState();

  const backend = "https://backend.lion-print.net";

  useEffect(() => {
    axios
      .get(`${backend}/authentification`)
      .then((res) => {
        if (res.data.valid && res.data.role === "admin") {
          setNom(res.data.nomUser);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  });
  return (
    <div className={nom}>
      <Navbar />
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
