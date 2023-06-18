//importações
import { useState } from "react";
import "./Signin.css";
import logo from '../../assets/logo-marca.svg';
import Ordinis from '../../assets/Ordinis.svg';
import toast, { Toaster } from "react-hot-toast";
import api from "../../lib/axios";

// classe principal de login 
const Signin = () => {

    // criação de variaveis de estado 
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // criação da variavel usuario que recebe os dados de email e senha
    const usuario = { email, senha }

    // função que faz a verificação dos dados de email e senha quando o usuário faz o submit
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // verificação se o email e senha digitados já estão cadastrados no banco de dados pelo retorno da rota
        const verif = await api.post('user/verif', usuario)
        
        // caso encontrado, verif.data será o objeto do usuário encontrado, caso não encontrado, verif.data será null
        if(verif.data){
            setIsAuthenticated(true)
        }
        else{
            toast.error("Email ou senha incorretos!")
        }
    }
    
    // verificação da variavel isAuthenticated para redirecionar o usuário para a pagina home
    (isAuthenticated) && window.open('/home', "_self") // ? window.location.replace('/home')

    // retorno do html da pagina de login 
    return (
        <section id="main">
            <div> <Toaster /> </div>
            <div id="container">
                <a className="logo-marca">
                    <img className="logo" src={logo} alt="logo" width="100" height="95" />
                    <img className="marca" src={Ordinis} alt="marca" width="167" height="27" />
                </a>
                <form className="login" onSubmit={handleSubmit}>
                    <div className="inputContainer">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="E-mail"
                            onChange={(change) => setEmail(change.target.value)}
                        />
                    </div>
                    <div className="inputContainer">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Senha"
                            onChange={(change) => setSenha(change.target.value)}
                        />
                    </div>
                    <button id="login-submit" type="submit">Entrar</button>
                </form>
                <p id="help"><a href="#">Não consegue entrar? Clique aqui!</a></p>
            </div>
        </section>
    )
}

// exportação da classe signin
export default Signin;