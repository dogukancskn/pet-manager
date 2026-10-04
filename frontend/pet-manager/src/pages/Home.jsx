import Navbar from "../components/Navbar";
import PetCard from "../components/PetCard";
import usePets from "../hooks/usePets";

function Home() {
  const { pets,
    loading,
    deletePet } = usePets();
    
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Bu hayvanı silmek istediğinize emin misiniz?"
    );

    if (!confirmed) {
      return;
    }
    try {
      await deletePet(id)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <Navbar />

      <main className="main-content">
        <div className="container py-5">

          {/* Başlık */}
          <div className="page-header mb-5">
            <div>
              <span className="page-label">
                PET MANAGEMENT
              </span>

              <h1>
                Evcil Hayvanlarım 🐾
              </h1>

              <p>
                Evcil hayvanlarınızı kolayca yönetin ve
                bilgilerini güncel tutun.
              </p>
            </div>

            <div className="d-none d-md-block">
              <span className="pet-count">
                {pets.length} Hayvan
              </span>
            </div>
          </div>

          {loading && (
            <div className="text-center py-5">
              <div
                className="spinner-border"
                role="status"
              >
                <span className="visually-hidden">
                  Yükleniyor...
                </span>
              </div>
            </div>
          )}

          {!loading && (
            <>
              <div className="section-header mb-4">
                <div>
                  <h2>Kayıtlı Hayvanlar</h2>

                  <p>
                    Sistemde kayıtlı evcil hayvanlarınız
                  </p>
                </div>
              </div>

              {pets.length === 0 ? (
                <div className="text-center py-5">
                  <h4>
                    Henüz hayvan eklenmemiş 🐾
                  </h4>

                  <p className="text-muted">
                    İlk evcil hayvanınızı ekleyerek
                    başlayabilirsiniz.
                  </p>
                </div>
              ) : (
                <div className="row g-4">
                  {pets.map((pet) => (
                    <PetCard
                      key={pet.id}
                      pet={pet}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </>
          )}

        </div>
      </main>
    </>
  );
}

export default Home;