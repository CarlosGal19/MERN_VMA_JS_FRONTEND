import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function ProtectedLayout() {

    const { auth, loading } = useAuth();

    if (loading) return 'Loading...'

    return (
        <>
            <Header />
            {
                auth?._id ? (
                    <main className="container mx-auto mt-10">
                        <Outlet />
                    </main>
                ) : (
                    <Navigate to='/' />
                )
            }
            <Footer />
        </>
    )
}
