import { useState } from "react";
import AddPatientForm from "../Components/AddPatientForm";
import ListPatients from "../Components/ListPatients";

export default function ManagePatients() {

    const [showForm, setShowForm] = useState(false);

    return (
        <div className="flex flex-col md:flex-row">
            <button
                type="button"
                className="bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-md mb-10 md:hidden"
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? 'Hide form' : 'Show form'}
            </button>
            <div className={`${showForm ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
                <AddPatientForm />
            </div>
            <div className="md:w-1/2 lg:w-3/5">
                <ListPatients />
            </div>
        </div>
    )
}
