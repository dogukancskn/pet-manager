import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import usePets from "../hooks/usePets";
import useVaccinations from "../hooks/useVaccinations";

function PetDetails() {

    const { id } = useParams();

    const { getPetById } = usePets();

    const {
        doneVaccines,
        upcomingVaccines,
        overdueVaccines,
        getDoneVaccines,
        getUpcomingVaccines,
        getOverdueVaccines,
        deleteVaccination,
        loading,
        error
    } = useVaccinations();

    const [pet, setPet] = useState(null);
    const [petLoading, setPetLoading] = useState(true);

    useEffect(() => {

        const loadPet = async () => {
            try {
                setPetLoading(true);

                const data = await getPetById(id);

                setPet(data);

            } catch (error) {
                console.log(error);
            } finally {
                setPetLoading(false);
            }
        };

        loadPet();

    }, [id]);

    useEffect(() => {

        if (!id) {
            return;
        }

        const loadVaccinations = async () => {
            try {
                await Promise.all([
                    getDoneVaccines(id),
                    getUpcomingVaccines(id),
                    getOverdueVaccines(id)
                ]);
            } catch (error) {
                console.log(error);
            }
        };

        loadVaccinations();

    }, [id]);

    const handleDeleteVaccination = async (vaccinationId) => {

        const confirmed = window.confirm(
            "Bu aşıyı silmek istediğinize emin misiniz?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteVaccination(vaccinationId);

            await Promise.all([
                getDoneVaccines(id),
                getUpcomingVaccines(id),
                getOverdueVaccines(id)
            ]);

        } catch (error) {
            console.log(error);
        }
    };

    if (petLoading) {
        return (
            <div className="container mt-5">
                <p>Hayvan bilgileri yükleniyor...</p>
            </div>
        );
    }

    if (!pet) {
        return (
            <div className="container mt-5">

                <div className="alert alert-danger">
                    Hayvan bulunamadı.
                </div>

                <Link
                    to="/"
                    className="btn btn-secondary"
                >
                    Geri Dön
                </Link>

            </div>
        );
    }

    return (
        <main className="container mt-4">

            {/* Hayvan Bilgileri */}

            <div className="card mb-4 shadow-sm">

                <div className="card-body">

                    <h2 className="card-title mb-4">
                        {pet.name}
                    </h2>

                    <p className="mb-1">
                        <strong>Tür:</strong>{" "}
                        {pet.type}
                    </p>

                    <p className="mb-1">
                        <strong>Cins:</strong>{" "}
                        {pet.breed || "-"}
                    </p>

                    <p className="mb-1">
                        <strong>Küpe No:</strong>{" "}
                        {pet.tagNo || "-"}
                    </p>

                    <p className="mb-1">
                        <strong>Doğum Tarihi:</strong>{" "}
                        {pet.birthDate || "-"}
                    </p>

                    <p className="mb-3">
                        <strong>Cinsiyet:</strong>{" "}
                        {pet.gender || "-"}
                    </p>

                    <Link
                        to={`/pets/${pet.id}/edit`}
                        className="btn btn-warning"
                    >
                        Düzenle
                    </Link>

                </div>

            </div>


            {/* Aşı Başlığı */}

            <div className="d-flex justify-content-between align-items-center mb-3">

                <h3>Aşılar</h3>

                <Link
                    to={`/pets/${pet.id}/vaccinations/add`}
                    className="btn btn-primary"
                >
                    Aşı Ekle
                </Link>

            </div>


            {/* Hata */}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}


            {/* Loading */}

            {loading && (
                <div className="alert alert-info">
                    Aşılar yükleniyor...
                </div>
            )}


            {/* Yapılmış Aşılar */}

            <div className="card mb-4 shadow-sm">

                <div className="card-header">
                    <h5 className="mb-0">
                        Yapılmış Aşılar
                    </h5>
                </div>

                <div className="card-body">

                    {doneVaccines.length === 0 ? (

                        <p className="text-muted mb-0">
                            Yapılmış aşı bulunmuyor.
                        </p>

                    ) : (

                        <div className="list-group">

                            {doneVaccines.map((vaccine) => (

                                <div
                                    key={vaccine.id}
                                    className="list-group-item"
                                >

                                    <div className="d-flex justify-content-between align-items-start">

                                        <div>

                                            <strong>
                                                {vaccine.name}
                                            </strong>

                                            <div>
                                                Aşı tarihi:{" "}
                                                {new Date(
                                                    vaccine.date
                                                ).toLocaleDateString("tr-TR")}
                                            </div>

                                            {vaccine.nextDate && (
                                                <div>
                                                    Sonraki aşı:{" "}
                                                    {new Date(
                                                        vaccine.nextDate
                                                    ).toLocaleDateString("tr-TR")}
                                                </div>
                                            )}

                                            {vaccine.note && (
                                                <div className="text-muted">
                                                    Not: {vaccine.note}
                                                </div>
                                            )}

                                        </div>

                                        <div className="d-flex gap-2">

                                            <Link
                                                to={`/vaccinations/${vaccine.id}/edit`}
                                                className="btn btn-sm btn-warning"
                                            >
                                                Düzenle
                                            </Link>

                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() =>
                                                    handleDeleteVaccination(
                                                        vaccine.id
                                                    )
                                                }
                                            >
                                                Sil
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>


            {/* Yaklaşan Aşılar */}

            <div className="card mb-4 shadow-sm">

                <div className="card-header">
                    <h5 className="mb-0">
                        Yaklaşan Aşılar
                    </h5>
                </div>

                <div className="card-body">

                    {upcomingVaccines.length === 0 ? (

                        <p className="text-muted mb-0">
                            Önümüzdeki 7 gün içinde aşı bulunmuyor.
                        </p>

                    ) : (

                        <div className="list-group">

                            {upcomingVaccines.map((vaccine) => (

                                <div
                                    key={vaccine.id}
                                    className="list-group-item"
                                >

                                    <div className="d-flex justify-content-between align-items-start">

                                        <div>

                                            <strong>
                                                {vaccine.name}
                                            </strong>

                                            <div>
                                                Sonraki aşı tarihi:{" "}
                                                {new Date(
                                                    vaccine.nextDate
                                                ).toLocaleDateString("tr-TR")}
                                            </div>

                                            {vaccine.note && (
                                                <div className="text-muted">
                                                    Not: {vaccine.note}
                                                </div>
                                            )}

                                        </div>

                                        <div className="d-flex gap-2">

                                            <Link
                                                to={`/vaccinations/${vaccine.id}/edit`}
                                                className="btn btn-sm btn-warning"
                                            >
                                                Düzenle
                                            </Link>

                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() =>
                                                    handleDeleteVaccination(
                                                        vaccine.id
                                                    )
                                                }
                                            >
                                                Sil
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>


            {/* Gecikmiş Aşılar */}

            <div className="card mb-4 shadow-sm">

                <div className="card-header">
                    <h5 className="mb-0">
                        Gecikmiş Aşılar
                    </h5>
                </div>

                <div className="card-body">

                    {overdueVaccines.length === 0 ? (

                        <p className="text-muted mb-0">
                            Gecikmiş aşı bulunmuyor.
                        </p>

                    ) : (

                        <div className="list-group">

                            {overdueVaccines.map((vaccine) => (

                                <div
                                    key={vaccine.id}
                                    className="list-group-item"
                                >

                                    <div className="d-flex justify-content-between align-items-start">

                                        <div>

                                            <strong>
                                                {vaccine.name}
                                            </strong>

                                            <div>
                                                Son tarih:{" "}
                                                {new Date(
                                                    vaccine.nextDate
                                                ).toLocaleDateString("tr-TR")}
                                            </div>

                                            {vaccine.note && (
                                                <div className="text-muted">
                                                    Not: {vaccine.note}
                                                </div>
                                            )}

                                        </div>

                                        <div className="d-flex gap-2">

                                            <Link
                                                to={`/vaccinations/${vaccine.id}/edit`}
                                                className="btn btn-sm btn-warning"
                                            >
                                                Düzenle
                                            </Link>

                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() =>
                                                    handleDeleteVaccination(
                                                        vaccine.id
                                                    )
                                                }
                                            >
                                                Sil
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>


            {/* Geri Dön */}

            <div className="mb-5">

                <Link
                    to="/"
                    className="btn btn-secondary"
                >
                    Hayvanlarıma Dön
                </Link>

            </div>

        </main>
    );
}

export default PetDetails;