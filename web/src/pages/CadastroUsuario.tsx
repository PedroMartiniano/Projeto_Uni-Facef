import Navbar from '../components/Navbar/Navbar'
import FormUsuario from '../components/FormUser/FormUser'
import './Global.css'


export default function CadastroUsuario() {
    return (
        <main className='cadastro-usuario-page'>
            <Navbar />
            <FormUsuario />
        </main>
    )
}