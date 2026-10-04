import { useState } from "react";
import { useNavigate } from "react-router-dom";

import usePets from "../hooks/usePets";
import Navbar from "../components/Navbar";

function AddPet() {
    const navigate = useNavigate();

    const { addPet, loading, error } = usePets();

    const [formData, setFormData] = useState({
        name: "",
        type: "",
        breed: "",
        tagNo: "",
        birthDate: "",
        gender: ""
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
            await addPet(formData);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />

            <main className="container mt-4 mb-5">

                <div className="row justify-content-center">

                    <div className="col-md-8 col-lg-6">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body p-4">

                                {/* Başlık */}
                                <div className="text-center mb-4">

                                    <div
                                        className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                                        style={{
                                            width: "65px",
                                            height: "65px"
                                        }}
                                    >
                                        <span className="fs-2">
                                            🐾
                                        </span>
                                    </div>

                                    <h2 className="fw-bold mb-1">
                                        Hayvan Ekle
                                    </h2>

                                    <p className="text-muted mb-0">
                                        Yeni hayvanınızın bilgilerini girin.
                                    </p>

                                </div>

                                {/* Hata */}
                                {error && (
                                    <div className="alert alert-danger">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>

                                    {/* Hayvan Adı */}
                                    <div className="mb-3">

                                        <label
                                            htmlFor="name"
                                            className="form-label fw-semibold"
                                        >
                                            Hayvan Adı
                                        </label>

                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-control"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Örn: Boncuk"
                                            required
                                        />

                                    </div>

                                    {/* Tür */}
                                    <div className="mb-3">

                                        <label
                                            htmlFor="type"
                                            className="form-label fw-semibold"
                                        >
                                            Tür
                                        </label>

                                        <input
                                            type="text"
                                            id="type"
                                            name="type"
                                            className="form-control"
                                            value={formData.type}
                                            onChange={handleChange}
                                            placeholder="Örn: Sığır"
                                            required
                                        />

                                    </div>

                                    {/* Cins */}
                                    <div className="mb-3">

                                        <label
                                            htmlFor="breed"
                                            className="form-label fw-semibold"
                                        >
                                            Cins
                                        </label>

                                        <input
                                            type="text"
                                            id="breed"
                                            name="breed"
                                            className="form-control"
                                            value={formData.breed}
                                            onChange={handleChange}
                                            placeholder="Örn: Holstein"
                                        />

                                    </div>

                                    {/* Küpe No */}
                                    <div className="mb-3">

                                        <label
                                            htmlFor="tagNo"
                                            className="form-label fw-semibold"
                                        >
                                            Küpe Numarası
                                        </label>

                                        <input
                                            type="text"
                                            id="tagNo"
                                            name="tagNo"
                                            className="form-control"
                                            value={formData.tagNo}
                                            onChange={handleChange}
                                            placeholder="Örn: TR123456789"
                                        />

                                    </div>

                                    {/* Doğum Tarihi */}
                                    <div className="mb-3">

                                        <label
                                            htmlFor="birthDate"
                                            className="form-label fw-semibold"
                                        >
                                            Doğum Tarihi
                                        </label>

                                        <input
                                            type="date"
                                            id="birthDate"
                                            name="birthDate"
                                            className="form-control"
                                            value={formData.birthDate}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    {/* Cinsiyet */}
                                    <div className="mb-4">

                                        <label
                                            htmlFor="gender"
                                            className="form-label fw-semibold"
                                        >
                                            Cinsiyet
                                        </label>

                                        <select
                                            id="gender"
                                            name="gender"
                                            className="form-select"
                                            value={formData.gender}
                                            onChange={handleChange}
                                        >
                                            <option value="">
                                                Seçiniz
                                            </option>

                                            <option value="Dişi">
                                                Dişi
                                            </option>

                                            <option value="Erkek">
                                                Erkek
                                            </option>
                                        </select>

                                    </div>

                                    {/* Butonlar */}
                                    <div className="d-flex gap-2">

                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary flex-grow-1"
                                            onClick={() => navigate("/")}
                                        >
                                            İptal
                                        </button>

                                        <button
                                            type="submit"
                                            className="btn btn-primary flex-grow-1"
                                            disabled={loading}
                                        >
                                            {loading
                                                ? "Ekleniyor..."
                                                : "Hayvan Ekle"
                                            }
                                        </button>

                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </main>
        </>
    );
}

export default AddPet;