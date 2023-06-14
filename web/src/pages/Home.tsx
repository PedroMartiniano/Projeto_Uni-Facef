import Navbar from '../components/Navbar/Navbar'
import  './Global.css'

/*Função principal da página home, onde é chamado o componente de navbar. */
export const Home = () =>{
    return (
    <main className='home-page'>
        <Navbar/>
    </main>
    )
}