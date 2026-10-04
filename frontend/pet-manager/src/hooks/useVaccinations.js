import { useContext } from "react";
import VaccinationContext from "../context/VaccinationContext";

const useVaccinations = () => {
    const context = useContext(VaccinationContext);

    if (!context) {
        throw new Error(
            "useVaccinations must be used inside VaccinationProvider"
        );
    }

    return context;
};

export default useVaccinations;