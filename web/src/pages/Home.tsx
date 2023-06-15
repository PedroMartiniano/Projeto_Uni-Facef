import Navbar from '../components/Navbar/Navbar'
import  './Global.css'

/*Função principal da página home, onde é chamado o componente de navbar. */
export default function Home(){
    return (
    <main className='pages'>
        <Navbar/>
    </main>
    )
}