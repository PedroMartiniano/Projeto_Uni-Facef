import Navbar from "../components/Navbar/Navbar";
import Table from "../components/Table/Table";


/*Função principal da página de consulta de patrimônio, onde é chamado o componente de tabela e o componente de navbar. */
export default function ConsultaPatrimonio() {
    return (
        <main className="consulta-page">
            <Navbar />
            <Table />
        </main>
    )
}
