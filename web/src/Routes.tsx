import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import Signin from "./pages/signin/Signin";
import CadastroPatrimonio from "./pages/CadastroPatrimonio";
import ConsultaPatrimonio from "./pages/ConsultaPatrimonio";
import CadastroUsuario from "./pages/CadastroUsuario";

export const PagesRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro" element={<CadastroPatrimonio />} />
        <Route path="/consulta" element={<ConsultaPatrimonio />} />
        <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
      </Routes>
    </Router>
  );
};
