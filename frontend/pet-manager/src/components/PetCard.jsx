import { Link } from "react-router-dom";

function PetCard({ pet, onDelete }) {
    return (
        <div className="card h-100 border-0 shadow-sm">

            <div className="card-body d-flex flex-column">

                {/* Başlık */}
                <div className="d-flex align-items-center mb-3">
                    <div
                        className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                            width: "50px",
                            height: "50px"
                        }}
                    >
                        <span className="fs-4">
                            🐾
                        </span>
                    </div>

                    <div>
                        <h5 className="card-title fw-bold mb-1">
                            {pet.name}
                        </h5>

                        <span className="badge bg-primary">
                            {pet.type}
                        </span>
                    </div>
                </div>

                {/* Bilgiler */}
                <div className="mb-3">

                    <div className="d-flex justify-content-between border-bottom py-2">
                        <span className="text-muted">
                            Cins
                        </span>

                        <strong>
                            {pet.breed || "-"}
                        </strong>
                    </div>

                    <div className="d-flex justify-content-between border-bottom py-2">
                        <span className="text-muted">
                            Küpe No
                        </span>

                        <strong>
                            {pet.tagNo || "-"}
                        </strong>
                    </div>

                    <div className="d-flex justify-content-between border-bottom py-2">
                        <span className="text-muted">
                            Doğum Tarihi
                        </span>

                        <strong>
                            {pet.birthDate || "-"}
                        </strong>
                    </div>

                    <div className="d-flex justify-content-between py-2">
                        <span className="text-muted">
                            Cinsiyet
                        </span>

                        <strong>
                            {pet.gender || "-"}
                        </strong>
                    </div>

                </div>

                {/* Butonlar */}
                <div className="mt-auto pt-2">

                    <div className="d-flex gap-2">

                        <Link
                            to={`/pets/${pet.id}`}
                            className="btn btn-primary flex-grow-1"
                        >
                            Detay
                        </Link>

                        <Link
                            to={`/pets/${pet.id}/edit`}
                            className="btn btn-outline-warning"
                        >
                            Düzenle
                        </Link>

                        <button
                            className="btn btn-outline-danger"
                            onClick={() => onDelete(pet.id)}
                        >
                            Sil
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default PetCard;