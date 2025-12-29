import { useContext } from "react";
import PatientsContext from "../Context/PatientsProvider";

const usePatients = () => {
    return useContext(PatientsContext);
}

export default usePatients;
