// importações de todas as páginas do sistema
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/SigninPage";
import CadastroPatrimonio from "./pages/CadastroPatrimonio";
import ConsultaPatrimonio from "./pages/ConsultaPatrimonio";
import CadastroUsuario from "./pages/CadastroUsuario";
import Configuracoes from "./pages/Configuracoes";

// Função que define todas as rotas do sistema usando o react-router-dom
export const PagesRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registros" element={<CadastroPatrimonio />} />
        <Route path="/consulta" element={<ConsultaPatrimonio />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
      </Routes>
    </Router>
  );
};
