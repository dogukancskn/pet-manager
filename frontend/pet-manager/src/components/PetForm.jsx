import { useState } from "react";

function PetForm({
    onSubmit,
    buttonText = "Kaydet",
    initialData
}) {
    const [formData, setFormData] = useState(
        initialData || {
            name: "",
            type: "",
            breed: "",
            tagNo: "",
            birthDate: "",
            gender: ""
        }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>

            <div className="mb-3">
                <label className="form-label">
                    Hayvan Adı
                </label>

                <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">
                    Tür
                </label>

                <select
                    name="type"
                    className="form-select"
                    value={formData.type}
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        Tür seçiniz
                    </option>

                    <option value="Kedi">
                        Kedi
                    </option>

                    <option value="Köpek">
                        Köpek
                    </option>

                    <option value="Kuş">
                        Kuş
                    </option>

                    <option value="Diğer">
                        Diğer
                    </option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">
                    Cins
                </label>

                <input
                    type="text"
                    name="breed"
                    className="form-control"
                    value={formData.breed}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">
                    Küpe / Tasma No
                </label>

                <input
                    type="text"
                    name="tagNo"
                    className="form-control"
                    value={formData.tagNo}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">
                    Doğum Tarihi
                </label>

                <input
                    type="date"
                    name="birthDate"
                    className="form-control"
                    value={formData.birthDate}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-4">
                <label className="form-label">
                    Cinsiyet
                </label>

                <select
                    name="gender"
                    className="form-select"
                    value={formData.gender}
                    onChange={handleChange}
                >
                    <option value="">
                        Cinsiyet seçiniz
                    </option>

                    <option value="Dişi">
                        Dişi
                    </option>

                    <option value="Erkek">
                        Erkek
                    </option>
                </select>
            </div>

            <button
                type="submit"
                className="btn btn-primary w-100"
            >
                {buttonText}
            </button>

        </form>
    );
}

export default PetForm;