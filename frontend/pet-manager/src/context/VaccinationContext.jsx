import api from "../services/vaccinationService";
import { createContext, useState } from "react";

const VaccinationContext = createContext();

export function VaccinationProvider({ children }) {

    const [doneVaccines, setDoneVaccines] = useState([]);
    const [upcomingVaccines, setUpcomingVaccines] = useState([]);
    const [overdueVaccines, setOverdueVaccines] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Aşı ekle
    const addVaccination = async (petId, vaccinationData) => {
        try {
            setLoading(true);
            setError("");

            const response = await api.post(
                `/${petId}`,
                vaccinationData
            );

            return response.data.data;

        } catch (error) {
            console.log(error);

            setError(
                error.response?.data?.message ||
                "Aşı eklenirken bir hata oluştu."
            );

            throw error;

        } finally {
            setLoading(false);
        }
    };

    // Yapılmış aşılar
    const getDoneVaccines = async (petId) => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                `/done/${petId}`
            );

            setDoneVaccines(response.data.data || []);

            return response.data.data;

        } catch (error) {
            console.log(error);

            setError(
                error.response?.data?.message ||
                "Yapılmış aşılar alınırken bir hata oluştu."
            );

            throw error;

        } finally {
            setLoading(false);
        }
    };

    // Yaklaşan aşılar
    const getUpcomingVaccines = async (petId) => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                `/upcoming/${petId}`
            );

            setUpcomingVaccines(response.data.data || []);

            return response.data.data;

        } catch (error) {
            console.log(error);

            setError(
                error.response?.data?.message ||
                "Yaklaşan aşılar alınırken bir hata oluştu."
            );

            throw error;

        } finally {
            setLoading(false);
        }
    };

    // Gecikmiş aşılar
    const getOverdueVaccines = async (petId) => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                `/overdue/${petId}`
            );

            setOverdueVaccines(response.data.data || []);
            return response.data.data;

        } catch (error) {
            console.log(error);

            setError(
                error.response?.data?.message ||
                "Gecikmiş aşılar alınırken bir hata oluştu."
            );

            throw error;

        } finally {
            setLoading(false);
        }
    };
    const updateVaccination = async (id, vaccinationData) => {
        try {
            setLoading(true);
            setError("");

            const response = await api.put(
                `/${id}`,
                vaccinationData
            );

            return response.data.data;

        } catch (error) {
            console.log(error);

            setError(
                error.response?.data?.message ||
                "Aşı güncellenirken bir hata oluştu."
            );

            throw error;

        } finally {
            setLoading(false);
        }
    };

    const deleteVaccination = async (id) => {
        try {
            setLoading(true);
            setError("");

            await api.delete(`/${id}`);

        } catch (error) {
            console.log(error);

            setError(
                error.response?.data?.message ||
                "Aşı silinirken bir hata oluştu."
            );

            throw error;

        } finally {
            setLoading(false);
        }
    };

    return (
        <VaccinationContext.Provider
            value={{
                doneVaccines,
                upcomingVaccines,
                overdueVaccines,

                loading,
                error,

                addVaccination,
                getDoneVaccines,
                getUpcomingVaccines,
                getOverdueVaccines,
                updateVaccination,
                deleteVaccination
            }}
        >
            {children}
        </VaccinationContext.Provider>
    );
}

export default VaccinationContext;