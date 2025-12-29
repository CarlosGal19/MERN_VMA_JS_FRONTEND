import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import axiosClient from "../Config/axios";
import Alert from '../Components/Alert';

export default function UpdatePasswort() {

    const params = useParams();
    const token = params.token;

    const [alert, setAlert] = useState({});
    const [validatedToken, setValidatedToken] = useState(false);
    const [loading, setLoading] = useState(true);

    const [password, setPassword] = useState('');


    useEffect(() => {
        async function validateToken() {
            try {
                await axiosClient.get(`veterinarian/reset/${token}`);
                setValidatedToken(true);
            } catch {
                setAlert({ msg: 'There is an error with the link', error: true })
            } finally {
                setLoading(false);
            }
        }

        validateToken();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password) {
            setAlert({ msg: 'Password is required', error: true })
            return;
        }

        if (password.length < 6) {
            setAlert({ msg: 'Password must be equal or longer than 6 characters', error: true });
            return;
        }

        try {
            const response = await axiosClient.post(`veterinarian/reset/${token}`, {
                password
            });

            setAlert({ msg: response.data.message, error: false });
        } catch (error) {
            setAlert({ msg: `${error.response.data.message ?? 'Failed to update password' }`, error: true })
        }
    }

    return (
        <>
            <div>
                <h1 className="text-indigo-600 text-6xl font-black">Update your password and continue managing your <span className="text-black">patients</span></h1>
            </div>
            <div>
                {!loading && alert.msg && (
                    <Alert alert={alert} />
                )}
                {
                    validatedToken && (
                        <>
                            <form onSubmit={handleSubmit}>
                                <div className="my-5">
                                    <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">New password</label>
                                    <input name="password" type="password" placeholder="Your new password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <input type="submit" value="Reset password" className="bg-indigo-700 w-full py-3 px-10 text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 rounded-xl md:w-auto" />
                            </form>
                            <Link className="block text-center my-5 text-gray-500" to='/'>Do you already have an account? Log in</Link>
                        </>
                    )
                }
            </div>
        </>
    )
}
