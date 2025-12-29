import { Link } from "react-router-dom";
import { useState } from "react";
import Alert from '../Components/Alert';
import axiosClient from "../Config/axios"

export default function ForgetPassword() {

    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setAlert({ msg: 'Email is required', error: true });
            return;
        }
        try {
            const response = await axiosClient.post('veterinarian/reset', {
                email
            });

            setAlert({ msg: response.data.message, error: false })
        } catch (error) {
            setAlert({ msg: `${error.response.data.message ?? 'Failed to send email'}`, error: true })
        }

    }

    return (
        <>
            <div>
                <h1 className="text-indigo-600 text-6xl font-black">Recover your access and keep your <span className="text-black">patients</span></h1>
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
                        <input name="email" type="email" placeholder="email@email.com" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <input type="submit" value="Recover access" className="bg-indigo-700 w-full py-3 px-10 text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 rounded-xl md:w-auto" />
                </form>
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link className="block text-center my-5 text-gray-500" to='/'>Do you already have an account? Log in</Link>
                    <Link className="block text-center my-5 text-gray-500" to='/register'>Create an account</Link>
                </nav>
            </div>
        </>
    )
}
