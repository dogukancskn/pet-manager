import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"
import { useState } from "react";

function Login() {

    const { login, loading, error } = useAuth();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((currentData) => ({
            ...currentData,
            [name]: value
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(formData);
            navigate("/");
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <main className="main-content">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="form-card">
                            <h2 className="mb-4">
                                Giriş Yap
                            </h2>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="form-control"
                                        required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Şifre
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="form-control"
                                        required />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Giriş yapılıyor..."
                                        : "Giriş Yap"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login