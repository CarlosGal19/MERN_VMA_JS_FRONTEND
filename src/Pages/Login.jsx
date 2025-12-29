import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../Components/Alert";
import axiosClient from "../Config/axios";
import useAuth from "../Hooks/useAuth";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [alert, setAlert] = useState({});

    const navigate = useNavigate();

    const { setAuth } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([email, password].includes('')) {
            setAlert({
                msg: 'Email and password are required',
                error: true
            });
            return;
        }

        try {
            const loginResponse = await axiosClient.post('veterinarian/login', {
                email,
                password
            });

            const authToken = loginResponse.data.data.token;
            localStorage.setItem('vma_token', authToken);

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`
                }
            }

            const profileResponse = await axiosClient.get('veterinarian/profile', config);

            setAuth(profileResponse.data.data.userProfile);

            navigate('/admin');

        } catch (error) {
            setAlert({
                msg: error.response.data.message,
                error: true
            })
        }
    }

    return (
        <>
            <div>
                <h1 className="text-indigo-600 text-6xl font-black">Log in and manage your <span className="text-black">patients</span></h1>
            </div>
            <div>
                {
                    alert.msg && (
                        <Alert alert={alert} />
                    )
                }
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input name="email" type="email" placeholder="email@email.com" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="my-5">
                        <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                        <input name="password" type="password" placeholder="Your password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <input type="submit" value="Log in" className="bg-indigo-700 w-full py-3 px-10 text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 rounded-xl md:w-auto" />
                </form>
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link className="block text-center my-5 text-gray-500" to='/register'>Do not you already have an account? Sign in</Link>
                    <Link className="block text-center my-5 text-gray-500" to='/forget-password'>I forgot my password</Link>
                </nav>
            </div>
        </>
    )
}
