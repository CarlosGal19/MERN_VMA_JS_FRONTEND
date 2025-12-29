import { useState } from "react";
import useAuth from '../Hooks/useAuth';

import AdminNav from "../Components/AdminNav";
import Alert from '../Components/Alert';

export default function EditProfile() {

    const { auth, updateProfile } = useAuth();

    const [name, setName] = useState(auth.name);
    const [webSite, setWebSite] = useState(auth.webSite ?? '');
    const [phoneNumber, setPhoneNumber] = useState(auth.phoneNumber ?? '');
    const [email, setEmail] = useState(auth.email);

    const [alert, setAlert] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ([name, email].includes('')) {
            setAlert({
                msg: 'Name and email are required',
                error: true
            });
            return;
        }

        const result = await updateProfile({
            name,
            email,
            webSite,
            phoneNumber
        })

        console.log(result);

        setAlert(result);
    }

    return (
        <>
            <AdminNav />
            <h2 className="font-black text-3xl text-center mt-10">Edit profile</h2>
            <p className="texl-xl mt-5 mb-10 text-center">Modify your <span className="text-indigo-600 font-bold">profile here</span></p>
            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {
                    alert.msg && (
                        <Alert alert={alert} />
                    )
                }
                    <form onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label htmlFor="name" className="uppercase font-bold text-gray-600">Name</label>
                            <input type="text" name="name" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                value={name} onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="website" className="uppercase font-bold text-gray-600">Web site</label>
                            <input type="text" name="website" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                value={webSite} onChange={(e) => setWebSite(e.target.value)}
                                placeholder="Your web site url"
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="phone" className="uppercase font-bold text-gray-600">Phone number</label>
                            <input type="text" name="phone" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Your phone number"
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="email" className="uppercase font-bold text-gray-600">Email</label>
                            <input type="email" name="email" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email address"
                            />
                        </div>
                        <input type="submit" value="Save changes" className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:cursor-pointer" />
                    </form>
                </div>
            </div>
        </>
    )
}
