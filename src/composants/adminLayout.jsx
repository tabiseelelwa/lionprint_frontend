import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNav from "../_admin/adminNav";
import axios from "axios";

const AdminLayout = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [nom, setNom] = useState();
  useEffect(() => {
    axios
      .get("https://backend.lion-print.net/authentification")
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
    <div className="">
      <AdminNav />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
