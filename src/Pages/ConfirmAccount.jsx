import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axiosClient from "../Config/axios";

import Alert from '../Components/Alert'

export default function ConfirmAccount() {

    const params = useParams();
    const token = params.token;

    const [alert, setAlert] = useState({});
    const [loading, setLoading] = useState(true);
    const [userConfirmed, setUserConfirmed] = useState(false);

    useEffect(() => {
        async function validateToken() {
            try {
                const response = await axiosClient.get(`veterinarian/validate/${token}`);

                setAlert({
                    msg: response.data.message, error: false
                })
                setUserConfirmed(true);
            } catch (error) {
                setAlert({ msg: `${error.response.data.message ?? 'Failed to register user' }`, error: true })
            } finally {
                setLoading(false);
            }
        }

        validateToken();
    }, [token]);

    return (
        <>
            <div>
                <h1 className="text-indigo-600 text-6xl font-black">Confirm your account and start to manage your <span className="text-black">patients</span></h1>
            </div>
            <div
                className="mt-20 md:mt-5 px-5 py-10 rounded-xl"
            >
                {
                    !loading && (
                        <Alert alert={alert} />
                    )
                }

                {
                    userConfirmed && (
                        <Link className="block text-center my-5 text-gray-500" to='/'>Log in</Link>
                    )
                }
            </div>
        </>
    )
}
