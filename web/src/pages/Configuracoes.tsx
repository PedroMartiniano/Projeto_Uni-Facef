import Configs from "../components/Configuracoes/Configuracoes";
import Navbar from "../components/Navbar/Navbar";
import './Global.css'

// Função que chamada a navbar e o componente de configurações
export default function Configuracoes() {
    return (
        <main className="pages">
            <Navbar />
            <Configs />
        </main>
    )
}