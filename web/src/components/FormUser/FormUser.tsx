import FetchUsers from "./FetchUser"
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import api from "../../lib/axios";
import "./FormUser.css"

export default function FormUsuario() {
    const [email, setEmail] = useState('')
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')
    const [senhaConf, setSenhaConf] = useState('')

    const Users = FetchUsers()

    const usuario = { email, nome, senha }

    const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const verif = Users.map((user) => {
            if (user.email === usuario.email) {
                return true
            }
            return false
        }).includes(true)

        
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