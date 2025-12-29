import { Link, useNavigate } from "react-router-dom"
import useAuth from "../Hooks/useAuth"

export default function Header() {

    const { logout } = useAuth();

    const navigate = useNavigate();

    const handleClick = () => {
        logout();
        navigate('/');
    }

    return (
        <header className="py-10 bg-indigo-600">
            <div className="container mx-auto flex justify-between items-center flex-col lg:flex-row">
                <h1 className="font-bold text-2xl text-indigo-200 text-center">
                    <span className="text-white font-black">Vets</span> Management Application
                </h1>
                <nav className="flex gap-4 flex-col items-center lg:flex-row mt-5 lg:mt-0">
                    <Link to='/admin' className="text-white text-lg uppercase font-bold">Admin</Link>
                    <Link to='/admin/profile' className="text-white text-lg uppercase font-bold">Patients</Link>
                    <button type="button" className="text-white text-lg uppercase font-bold hover:cursor-pointer" onClick={handleClick}>Log out</button>
                </nav>
            </div>
        </header>
    )
}
