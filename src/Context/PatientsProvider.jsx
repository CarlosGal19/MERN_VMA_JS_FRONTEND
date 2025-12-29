import { createContext, useEffect, useState } from "react";

import axiosClient from '../Config/axios';
import useAuth from "../Hooks/useAuth";

const PatientsContext = createContext();

const PatientProvider = ({ children }) => {

    const [patients, setPatients] = useState([]);
    const [patient, setPatient] = useState({});

    const { auth } = useAuth();

    useEffect(() => {
        async function getPatients() {
            try {
                const authToken = localStorage.getItem('vma_token');
                if (!authToken) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`
                    }
                }

                const response = await axiosClient.get('patient', config);

                const fetchedPatients = response.data.data.patients;

                setPatients(fetchedPatients)
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
        getPatients();
    }, [auth]);

    const savePatient = async (patient) => {
        try {
            const authToken = localStorage.getItem('vma_token');

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`
                }
            }

            if (patient.id) {
                const updatePatientResponse = await axiosClient.patch(`patient/${patient.id}`, {
                    name: patient.name,
                    owner: patient.owner,
                    email: patient.email,
                    date: patient.date,
                    symptoms: patient.symptoms
                }, config);

                const patientUpdated = updatePatientResponse.data.data.patientData;

                const updatedPatients = patients.map(patient => {
                    if (patient.id === patientUpdated.id) {
                        return patientUpdated;
                    }
                    return patient;
                })

                setPatients(updatedPatients);

                return;
            }

            const newPatientResponse = await axiosClient.post('patient', patient, config);

            const newPatient = newPatientResponse.data.data.patientData;

            setPatients([...patients, newPatient]);
        } catch (error) {
            console.log(error.newPatientResponse.data.message || error.updatePatientResponse.data.message)
        }
    }

    const setEditionMode = (patient) => {
        setPatient(patient);
    }

    const deletePatient = async (id) => {
        const confirmed = confirm('Please confirm you want to delete the patient');

        if (!confirmed) return;

        try {
            const authToken = localStorage.getItem('vma_token');

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`
                }
            }
            await axiosClient.delete(`patient/${id}`, config);

            const filteredPatients = patients.filter(patient => patient.id !== id);

            setPatients(filteredPatients);

        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    return (
        <PatientsContext.Provider
            value={{
                patients,
                savePatient,
                setEditionMode,
                patient,
                deletePatient
            }}
        >
            {children}
        </PatientsContext.Provider>
    )
}

export {
    PatientProvider
}

export default PatientsContext;
