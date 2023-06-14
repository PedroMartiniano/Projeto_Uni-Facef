import Form from '../components/Form/Form'
import Navbar from '../components/Navbar/Navbar'
import './Global.css'

/*Função principal da página de cadastro de patrimônio, onde é chamado o componente de formulário e o componente de navbar. */
export default function CadastroPatrimonio() {
    return (
       <main className='cadastro-page'>
        <Navbar />
        <Form />
       </main>
    )
}