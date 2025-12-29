import usePatients from "../Hooks/usePatients";

export default function PatientCard({ patient }) {

    const { setEditionMode, deletePatient } = usePatients();

    const { name, email, owner, date, symptoms, _id } = patient;

    const formatDate = (date) => {
        const newDate = new Date(date);

        return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(newDate);
    }

    return (
        <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
            <p className="font-bold uppercase text-indigo-800 my-2">
                Name: <span className="font-normal normal-case text-black">{name}</span>
            </p>
            <p className="font-bold uppercase text-indigo-800 my-2">
                Owner: <span className="font-normal normal-case text-black">{owner}</span>
            </p>
            <p className="font-bold uppercase text-indigo-800 my-2">
                Owner contact email: <span className="font-normal normal-case text-black">{email}</span>
            </p>
            <p className="font-bold uppercase text-indigo-800 my-2">
                Registration date: <span className="font-normal normal-case text-black">{formatDate(date)}</span>
            </p>
            <p className="font-bold uppercase text-indigo-800 my-2">
                Pet symptoms: <span className="font-normal normal-case text-black">{symptoms}</span>
            </p>
            <div className="flex justify-between mt-5">
                <button type="button" className="py-2 px-10 bg-indigo-600 hover:cursor-pointer hover:bg-indigo-800 text-white uppercase font-bold rounded-lg" onClick={() => setEditionMode(patient)}>Edit</button>
                <button type="button" className="py-2 px-10 bg-red-600 hover:cursor-pointer hover:bg-red-800 text-white uppercase font-bold rounded-lg" onClick={() => deletePatient(_id)}>Delete</button>
            </div>
        </div>
    )
}
