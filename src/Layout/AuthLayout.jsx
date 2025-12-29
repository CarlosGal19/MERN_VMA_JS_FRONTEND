import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <>
            <main className="container mx-auto md:grid grid-cols-2 gap-8 items-center min-h-screen">
                <Outlet />
            </main>
        </>
    )
}
