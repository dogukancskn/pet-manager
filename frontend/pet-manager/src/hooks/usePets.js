import { useContext } from "react";
import  PetContext  from "../context/PetContext";

const usePets = () => {
    const context = useContext(PetContext);
    if (!context) {
        throw new Error(
            "usePets must be used inside PetProvider"
        );
    }

    return context;
}

export default usePets;