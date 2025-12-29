import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../Components/Alert";
import axiosClient from "../Config/axios";

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const [alert, setAlert] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ([name, email, password, repeatPassword].includes('')) {
            setAlert({ msg: 'All fields are required', error: true })
            return;
        }

        if (password !== repeatPassword) {
            setAlert({ msg: 'Passwords mismatch', error: true })
            return
        }

        if (password.length < 6) {
            setAlert({ msg: 'Password must be equal or longer than 6 characters', error: true });
            return;
        }

        try {
            await axiosClient.post('veterinarian', {
                name,
                email,
                password
            });

            setAlert({ msg: 'User created successfully, check your email', error: false });
        } catch (error) {
            setAlert({ msg: `${error.response.data.message ?? 'Failed to register user' }`, error: true })
        }
    }

    return (
        <>
            <div>
                <h1 className="text-indigo-600 text-6xl font-black">Create your account and manage your <span className="text-black">patients</span></h1>
            </div>
            <div
                className="mt-20 md:mt-5 px-5 py-10 rounded-xl"
            >
                {
                    alert.msg && (
                        <Alert alert={alert} />
                    )
                }
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label htmlFor="name" className="uppercase text-gray-600 block text-xl font-bold">Name</label>
                        <input name="name" type="text" placeholder="Ej. John Doe" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="my-5">
                        <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input name="email" type="email" placeholder="email@email.com" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="my-5">
                        <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                        <input name="password" type="password" placeholder="Your password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="my-5">
                        <label htmlFor="repeat_password" className="uppercase text-gray-600 block text-xl font-bold">Repeat Password</label>
                        <input name="repeat_password" type="password" placeholder="Repeat your password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}/>
                    </div>
                    <input type="submit" value="Sign in" className="bg-indigo-700 w-full py-3 px-10 text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 rounded-xl md:w-auto" />
                </form>
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link className="block text-center my-5 text-gray-500" to='/'>Do you already have an account? Log in</Link>
                    <Link className="block text-center my-5 text-gray-500" to='/forget-password'>I forgot my password</Link>
                </nav>
            </div>
        </>
    )
}
