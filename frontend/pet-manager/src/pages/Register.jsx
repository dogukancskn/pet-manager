import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Register() {
    const navigate = useNavigate();

    const { register, loading, error } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
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
            await register(formData);

            navigate("/login");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="main-content">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">

                        <div className="form-card">

                            <div className="form-page-header mb-4">
                                <span className="page-label">
                                    PET MANAGEMENT
                                </span>

                                <h1>Hesap Oluştur 🐾</h1>

                                <p>
                                    Pet Manager hesabınızı oluşturun.
                                </p>
                            </div>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Ad Soyad
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
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">
                                        Şifre
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Hesap oluşturuluyor..."
                                        : "Kayıt Ol"}
                                </button>

                            </form>

                            <div className="text-center mt-4">
                                <span className="text-muted">
                                    Zaten hesabınız var mı?
                                </span>

                                {" "}

                                <Link to="/login">
                                    Giriş Yap
                                </Link>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}

export default Register;