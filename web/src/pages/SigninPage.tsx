import Signin from "../components/Signin/Signin";
import './Global.css';

// função que chama o componente da página de login
export default function SigninPage() {
    return (
        <main className="signinPage">
            <Signin />
        </main>
    )
}