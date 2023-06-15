import Navbar from '../components/Navbar/Navbar'
import FormUsuario from '../components/FormUser/FormUser'
import './Global.css'

// função que chama a navbar e o componente de formulário de cadastro de usuário
export default function CadastroUsuario() {
    return (
        <main className='pages'>
            <Navbar />
            <FormUsuario />
        </main>
    )
}