// importações
import FetchUsers from "./FetchUser"
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import api from "../../lib/axios";
import "./FormUser.css"

// funcão principal do compornente do formulário de cadastro de usuário
export default function FormUsuario() {
    // hooks que armazenam os valores dos campos do formulário
    const [email, setEmail] = useState('')
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')
    const [senhaConf, setSenhaConf] = useState('')

    // atribuição da função FetchUsers que resgata todos os usuários do banco de dados a variavel users
    const users = FetchUsers()

    // criação do objeto usuario que recebe os dados de email, nome e senha que o usuário digitou
    const usuario = { email, nome, senha }

    //função que faz a verificação dos dados de email e senha quando o usuário faz o submit
    const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // verificação se o email digitado já está cadastrado no banco de dados
        const verif = users.map((user) => {
            if (user.email === usuario.email) {
                return true
            }
            return false
        }).includes(true)

        // verificação se a senha e a confirmação de senha são iguais, após a verificação do email pela variavel verif        
        if (!verif) {
            (senha === senhaConf)
                ? api.post('/user', usuario)
                    .then(() => toast.success("Usuário cadastrado com sucesso!"))
                    .catch(() => toast.error("Erro ao cadastrar usuário!"))
                : toast.error("As senhas não coincidem!")
        }
        else {
            toast.error("Email já cadastrado!")
        }
    }

    // retorno do html do formulário de cadastro de usuário
    return (
        <div id="form-user-container">
            <div>
                <Toaster />
            </div>
            <form className="form-user" onSubmit={formSubmit}>
                <ul>
                    <li>
                        <label>Email</label>
                        <input
                            type="text"
                            id="form-input"
                            placeholder="E-mail"
                            onChange={(change) => setEmail(change.target.value)}
                            required
                        />
                    </li>
                    <li>
                        <label>Nome</label>
                        <input
                            type="text"
                            id="form-input"
                            placeholder="Nome"
                            onChange={(change) => setNome(change.target.value)}
                            required
                        />
                    </li>
                    <li>
                        <label>Senha</label>
                        <input
                            type="password"
                            placeholder="Senha"
                            onChange={(change) => setSenha(change.target.value)}
                            required
                        />
                    </li>
                    <li>
                        <label>Confirme sua Senha</label>
                        <input
                            type="password"
                            placeholder="Senha"
                            onChange={(change) => setSenhaConf(change.target.value)}
                            required
                        />
                    </li>
                </ul>
                <button type="submit">Cadastrar Usuário</button>
            </form>
        </div>
    )
}