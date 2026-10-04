import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/vaccinationService";
import useVaccinations from "../hooks/useVaccinations";

function EditVaccination() {

    const { id } = useParams();
    const navigate = useNavigate();

    const { updateVaccination, loading, error } = useVaccinations();

    const [formData, setFormData] = useState({
        name: "",
        date: "",
        nextDate: "",
        note: ""
    });

    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {

        const loadVaccination = async () => {
            try {
                setPageLoading(true);

                const response = await api.get(`/${id}`);

                const vaccination = response.data.data;

                setFormData({
                    name: vaccination.name || "",
                    date: vaccination.date
                        ? vaccination.date.substring(0, 10)
                        : "",
                    nextDate: vaccination.nextDate
                        ? vaccination.nextDate.substring(0, 10)
                        : "",
                    note: vaccination.note || ""
                });

            } catch (error) {
                console.log(error);
            } finally {
                setPageLoading(false);
            }
        };

        loadVaccination();

    }, [id]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateVaccination(id, formData);

            navigate(-1);

        } catch (error) {
            console.log(error);
        }
    };

    if (pageLoading) {
        return (
            <main className="container mt-5">
                <p>Aşı bilgileri yükleniyor...</p>
            </main>
        );
    }

    return (
        <main className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow-sm">

                        <div className="card-body">

                            <h2 className="mb-4">
                                Aşı Düzenle
                            </h2>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label
                                        htmlFor="name"
                                        className="form-label"
                                    >
                                        Aşı Adı
                                    </label>

                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label
                                        htmlFor="date"
                                        className="form-label"
                                    >
                                        Aşı Tarihi
                                    </label>

                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        className="form-control"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label
                                        htmlFor="nextDate"
                                        className="form-label"
                                    >
                                        Sonraki Aşı Tarihi
                                    </label>

                                    <input
                                        type="date"
                                        id="nextDate"
                                        name="nextDate"
                                        className="form-control"
                                        value={formData.nextDate}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="mb-3">

                                    <label
                                        htmlFor="note"
                                        className="form-label"
                                    >
                                        Not
                                    </label>

                                    <textarea
                                        id="note"
                                        name="note"
                                        className="form-control"
                                        rows="3"
                                        value={formData.note}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="d-flex gap-2">

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate(-1)}
                                    >
                                        İptal
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Güncelleniyor..."
                                            : "Güncelle"
                                        }
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default EditVaccination;