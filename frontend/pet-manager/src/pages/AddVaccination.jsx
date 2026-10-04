import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useVaccinations from "../hooks/useVaccinations";

function AddVaccination() {

    const { id } = useParams();
    const navigate = useNavigate();

    const {
        addVaccination,
        loading,
        error
    } = useVaccinations();

    const [formData, setFormData] = useState({
        name: "",
        date: "",
        nextDate: "",
        note: ""
    });

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
            await addVaccination(id, formData);

            navigate(`/pets/${id}`);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow-sm">

                        <div className="card-body">

                            <h2 className="card-title mb-4">
                                Aşı Ekle
                            </h2>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                {/* Aşı adı */}
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
                                        placeholder="Örn: Kuduz Aşısı"
                                        required
                                    />

                                </div>


                                {/* Aşı tarihi */}
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


                                {/* Sonraki aşı tarihi */}
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


                                {/* Not */}
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
                                        placeholder="Aşı hakkında not..."
                                    />

                                </div>


                                <div className="d-flex gap-2">

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate(`/pets/${id}`)}
                                    >
                                        İptal
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Ekleniyor..."
                                            : "Aşı Ekle"
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

export default AddVaccination;