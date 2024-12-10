import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "./composants/adminLayout";
import UserLayout from "./composants/userLayout";
import Login from "./pages/login";
import ListCommandes from "./_user/listCommandes";
import Commande from "./_user/commande";
import ListClients from "./_user/listClients";
import "./styles/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import AjoutClient from "./_user/ajoutClient";
import ElementsCde from "./_user/elementsCde";
import Accueil from "./_user/accueil";
import Introuvable from "./pages/introuvable";
import Operations from "./_admin/operations";
import ListUtilisateurs from "./_admin/user/listUtilisateurs";
import ModifUtilisateur from "./_admin/user/modifUtilisateur";
import AjoutUtilisateur from "./_admin/user/ajoutUtilisateur";
import ProfilUtilisateur from "./_admin/user/profilUtilisateur";
import AjoutProduit from "./_admin/produits/ajoutProduit";
import ListProduits from "./_admin/produits/listProduits";
import ModifProduit from "./_admin/produits/modifProduit";
import ModifClient from "./_admin/user/modifClient";
import ModifCde from "./_admin/user/modifCde";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "", element: <Accueil /> },
      { path: "list-cdes", element: <ListCommandes /> },
      { path: "descript-commande/:num", element: <Commande /> },
      { path: "nouveau-client", element: <AjoutClient /> },
      { path: "liste-des-clients", element: <ListClients /> },
      { path: "commande/:num", element: <ElementsCde /> },
      { path: "modif-commande/:num", element: <ModifCde /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Operations />,
      },
      {
        path: "liste-des-utilisateurs",
        element: <ListUtilisateurs />,
      },
      {
        path: "nouvel-utilisateur",
        element: <AjoutUtilisateur />,
      },
      {
        path: "profil-utlisateur/:idUser",
        element: <ProfilUtilisateur />,
      },
      { path: "liste-des-clients", element: <ListClients /> },
      { path: "list-cdes", element: <ListCommandes /> },
      {
        path: "modif-utilisateur/:idUser",
        element: <ModifUtilisateur />,
      },
      {
        path: "ajout-produit",
        element: <AjoutProduit />,
      },
      {
        path: "liste-des-produits",
        element: <ListProduits />,
      },
      {
        path: "modif-produit/:codeProd",
        element: <ModifProduit />,
      },
      {
        path: "modif-client/:numCli",
        element: <ModifClient />,
      },
      {
        path: "modif-cde/:numCom",
        element: <ModifClient />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Introuvable />,
  },
]);

function App() {
  return (
    <div>
      <div>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
