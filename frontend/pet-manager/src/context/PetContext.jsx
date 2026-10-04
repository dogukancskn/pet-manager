import api from "../services/petService";
import { useState, useEffect } from "react";
import { createContext } from "react";
import useAuth from "../hooks/useAuth";

const PetContext = createContext();

export function PetProvider({ children }) {

    const { token } = useAuth();

    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchPets = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/");

            setPets(response.data.data);

        } catch (error) {
            console.log(error);
            setError("Hayvanlar yüklenirken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    const getPetById = async (id) => {
        try {
            const response = await api.get(`/${id}`);

            return response.data.data;

        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const addPet = async (petData) => {
        try {
            setError("");

            const response = await api.post("/", petData);

            const newPet = response.data.data;

            setPets((currentPets) => [
                newPet,
                ...currentPets
            ]);

            return newPet;

        } catch (error) {
            console.log(error);
            setError("Hayvan eklenirken bir hata oluştu.");
            throw error;
        }
    };

    const updatePet = async (id, petData) => {
        try {
            setError("");

            const response = await api.put(`/${id}`, petData);

            const updatedPet = response.data.data;

            setPets((currentPets) =>
                currentPets.map((pet) =>
                    pet.id === Number(id)
                        ? updatedPet
                        : pet
                )
            );

            return updatedPet;

        } catch (error) {
            console.log(error);
            setError("Hayvan güncellenirken bir hata oluştu.");
            throw error;
        }
    };

    const deletePet = async (id) => {
        try {
            setError("");

            await api.delete(`/${id}`);

            setPets((currentPets) =>
                currentPets.filter(
                    (pet) => pet.id !== Number(id)
                )
            );

        } catch (error) {
            console.log(error);
            setError("Hayvan silinirken bir hata oluştu.");
            throw error;
        }
    };

    useEffect(() => {

        if (!token) {
            return;
        }

        const loadPets = async () => {
            await fetchPets();
        };

        loadPets();

    }, [token]);

    return (
        <PetContext.Provider
            value={{
                pets,
                loading,
                error,
                fetchPets,
                getPetById,
                addPet,
                updatePet,
                deletePet
            }}
        >
            {children}
        </PetContext.Provider>
    );
}

export default PetContext;