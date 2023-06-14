//importações
import { useState, useEffect, useCallback } from "react";
import "./Signin.css";
import logo from '../../assets/logo-marca.svg';
import api from "../../lib/axios";
import { User } from "../../models/user-data";

// classe principal de login 
const Signin = () => {

    // criação de variaveis de estado 
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [dataUser, setDataUser] = useState<User[]>([])
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // criação da variavel usuario que recebe os dados de email e senha
    const usuario = { email, senha }

    // função que faz a requisição dos dados dos usuarios vinda do banco de dados
    const getUsers = useCallback(() => {
        api.get('/users').then((response) => { setDataUser(response.data); });
    }, []);

    // chamada da função getUsers utilizando useEffect
    useEffect(() => { getUsers() }, [getUsers])

    // função que faz a verificação dos dados de email e senha quando o usuário faz o submit
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        let verif = false
        dataUser.map((user) => {
            (usuario.email === user.email && usuario.senha === user.senha) && (verif = true)
        });
        setIsAuthenticated(verif)
    }

    // verificação da variavel isAuthenticated para redirecionar o usuário para a pagina home
    (isAuthenticated)
        ? window.open('/home', "_self") // ? window.location.replace('/home')
        : console.log("Não autenticado")

    // retorno do html 
    return (
        <section>
            <div id="container">
                <header>
                    <img src={logo} alt="" />
                    <h1>ORDINIS</h1>
                </header>
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