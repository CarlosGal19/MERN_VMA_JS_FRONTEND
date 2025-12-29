import { useState } from "react";
import useAuth from '../Hooks/useAuth';

import AdminNav from "../Components/AdminNav";
import Alert from '../Components/Alert';

export default function ChangePassword() {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [alert, setAlert] = useState({});

    const { updatePassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([currentPassword, newPassword].includes('')) {
            setAlert({
                msg: 'Both fields are required',
                error: true
            })
            return;
        }

        if (newPassword.length < 6) {
            setAlert({
                msg: 'Password must be equal or longer than 6 characters', error: true
            });
            return;
        }

        const result = await updatePassword({
            currentPassword,
            newPassword
        });

        console.log(result);

        setAlert(result);

    }

    return (
        <>
            <AdminNav />
            <h2 className="font-black text-3xl text-center mt-10">Change your password</h2>
            <p className="texl-xl mt-5 mb-10 text-center">Change your <span className="text-indigo-600 font-bold">password here</span></p>
            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    {
                        alert.msg && (
                            <Alert alert={alert} />
                        )
                    }
                    <form onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label htmlFor="currentPassword" className="uppercase font-bold text-gray-600">Current password</label>
                            <input type="password" name="currentPassword" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Type your current password"
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="newPassword" className="uppercase font-bold text-gray-600">News password</label>
                            <input type="password" name="newPassword" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Type your current password"
                            />
                        </div>
                        <input type="submit" value="Update Password" className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:cursor-pointer" />
                    </form>
                </div>
            </div>
        </>
    )
}
