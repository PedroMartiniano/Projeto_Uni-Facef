import "./Navbar.css";

/*Função principal do componente de navbar. */
function Navbar() {
  return (
    
    <div className="navbar-container">
      {/*Botões que redirecionam para as páginas de cadastro e consulta. */}
      <img src="src\assets\logo.svg" alt="" className="navbar-logo" />
      <img src="src\assets\Ordinis.svg" alt="" className="navbar-title"/>
      <ul className="navbar-list">
        <li className="navbar-item">
          <img src="src\assets\home-icon.svg" alt="" />
          <a href="http://localhost:5173/home">Home</a>
        </li>
        <li className="navbar-item">
          <img src="src\assets\registros.svg" alt="" />
          <a href="http://localhost:5173/cadastro">Cadastro de Patrimônios</a>
        </li>
        <li className="navbar-item">
          <img src="src\assets\consult-icon.svg" alt="" />
          <a href="http://localhost:5173/consulta">Consulta de Patrimônios</a>
        </li>
        <li className="navbar-item">
          <img src="src\assets\config.svg" alt="" />
          <a href="#">Configurações</a>
        </li>
        <li className="navbar-item">
          <img src="src\assets\create-user.svg" alt="" />
          <a href="http://localhost:5173/cadastro-usuario">Cadastrar Usuário</a>
        </li>
        <li className="navbar-item">
          <img src="src\assets\sair.svg" alt="" />
          <a href="http://localhost:5173/signin">Sair</a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
