import { useEffect, useState } from "react";

import Alert from '../Components/Alert'
import usePatients from "../Hooks/usePatients";

export default function AddPatientForm() {

    const { savePatient, patient } = usePatients();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [owner, setOwner] = useState('');
    const [date, setDate] = useState('');

    const [id, setId] = useState(null);

    const [alert, setAlert] = useState({});


    useEffect(() => {
        if (patient?.name) {
            setName(patient.name);
            setEmail(patient.email);
            setSymptoms(patient.symptoms);
            setDate(patient.date);
            setOwner(patient.owner);
            setId(patient._id);
        }
    }, [patient]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([name, email, symptoms, owner, date].includes('')) {
            setAlert({
                msg: 'All fields are required',
                error: true
            });
            return;
        }

        savePatient({
            name,
            email,
            symptoms,
            owner,
            date,
            id
        });

        setAlert({
            msg: 'Patient saved successfully',
            error: false
        })

        setName('');
        setOwner('');
        setEmail('');
        setSymptoms('');
        setDate('');
    }

    return (
        <>
            <h2 className="font-black text-3xl text-center">Patients manager</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Add and manage your <span className="text-indigo-600 font-bold">patients</span>
            </p>
            <form
                className="py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
                onSubmit={handleSubmit}
            >
                <div className="mb-5">
                    <label htmlFor="name" className="text-gray-700 uppercase font-bold">Pet name</label>
                    <input type="text" name="name" placeholder="Pet name" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="owner" className="text-gray-700 uppercase font-bold">Owner name</label>
                    <input type="text" name="owner" placeholder="Pet owner name" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={owner} onChange={(e) => setOwner(e.target.value)}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="text-gray-700 uppercase font-bold">Owner email</label>
                    <input type="email" name="email" placeholder="Pet owner email" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="date" className="text-gray-700 uppercase font-bold">Registration date</label>
                    <input type="date" name="date" placeholder="Pet registration date" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={date} onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="symptoms" className="text-gray-700 uppercase font-bold">Pet symptoms</label>
                    <textarea type="text" name="symptoms" placeholder="Pet symptoms" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={symptoms} onChange={(e) => setSymptoms(e.target.value)}/>
                </div>
                <input type="submit" value={`${id ? 'Update patient' : 'Add patient'}`} className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 hover:cursor-pointer transition-colors rounded-md" />
            </form>
            {
                alert.msg && (
                    <Alert alert={alert} />
                )
            }
        </>
    )
}
