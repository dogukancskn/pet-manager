import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm border-bottom">
            <div className="container">

                <Link
                    to="/"
                    className="navbar-brand fw-bold text-primary"
                >
                    🐾 Pet Manager
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Menüyü aç"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarContent"
                >
                    <ul className="navbar-nav me-auto">

                        <li className="nav-item">
                            <Link
                                to="/"
                                className="nav-link text-dark"
                            >
                                Hayvanlarım
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                to="/pets/add"
                                className="nav-link text-dark"
                            >
                                Hayvan Ekle
                            </Link>
                        </li>

                    </ul>

                    <div className="d-flex align-items-center gap-3">

                        {user && (
                            <span className="text-dark">
                                Hoş geldin,{" "}
                                <strong>{user.name}</strong>
                            </span>
                        )}

                        <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={handleLogout}
                        >
                            Çıkış Yap
                        </button>

                    </div>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;