import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import App from "./App";
import Acompanhamento from "./Acompanhamento";

import { useContext } from "react";
import AuthProvider, { AuthContext } from "./Auth/AuthProvider";
import Inicial from "./Inicial";
import Anonimo from "./Anonimo";

const AppRouts = () => {
  const Private = ({ children }) => {
    const { autenticado, loading } = useContext(AuthContext);
    if (loading) {
      return <div className="loading">Carregando...</div>;
    }
    if (!autenticado) {
      return <Navigate to={"/"} />;
    }
    return children;
  };

  return (
    <Router basename="ouvidoria_santa_casa">
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Inicial />} />
          <Route exact path="/cadastro" element={<App />} />
          <Route exact path="/anonimo" element={<Anonimo />} />
          <Route
            exact
            path="/acompanhamento"
            element={
              <Private>
                <Acompanhamento />{" "}
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRouts;
