import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCourses } from "../../api/courses"; // Vérifie que ton API existe
import "../../App.css";

export default function CoursesManagement() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // États pour le formulaire d'ajout d'un cours
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Charger les cours au montage de la page
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    setLoading(true);
    getCourses()
      .then((data) => {
        setCourses(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des cours", err);
        setLoading(false);
      });
  };

  // Fonction pour gérer la création d'un cours
  const handleCreateCourse = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Appel à ton API de création (adapte selon ton fichier api/courses.js)
    fetch("http://localhost:3000/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ code, name, description })
    })
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Erreur lors de la création du cours");
        }
        return res.json();
      })
      .then(() => {
        setSuccess("Cours créé avec succès !");
        setCode("");
        setName("");
        setDescription("");
        fetchCourses(); // Recharger la liste
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      {/* En-tête admin standardisé */}
      <header className="dashboard-header">
        <div className="logo">
          <h1>Exam Hub <span className="admin-badge-tag">Admin</span></h1>
        </div>

        <nav className="navbar">
          <Link to="/admin">Tableau de bord</Link>
          <Link to="/admin/students">Étudiants</Link>
          <Link to="/admin/courses" className="active">Cours</Link>
          <Link to="/admin/exams">Examens</Link>
        </nav>

        <div className="header-right">
          <button onClick={handleLogout} className="logout-button">Déconnexion</button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="section-header">
          <h2>Gestion des Cours 📚</h2>
          <p>Créez et gérez les différents modules de formation (ex. PROG2, WEB1).</p>
        </div>

        {/* Formulaire d'ajout de cours */}
        <div className="form-card">
          <h3>Ajouter un nouveau cours</h3>
          {error && <div className="alert error">{error}</div>}
          {success && <div className="alert success">{success}</div>}

          <form onSubmit={handleCreateCourse} className="inline-form">
            <div className="form-group">
              <label>Code unique (ex: PROG2)</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="PROG2"
                required
              />
            </div>

            <div className="form-group">
              <label>Nom du cours</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Programmation Avancée"
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Description (Qu'est-ce qu'on y fait ?)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description du contenu du cours..."
                rows="2"
                required
              />
            </div>

            <button type="submit" className="btn-primary">Créer le cours</button>
          </form>
        </div>

        {/* Tableau de la liste des cours */}
        <div className="table-container">
          <h3>Liste des cours enregistrés</h3>
          {loading ? (
            <p className="loading-text">Chargement des cours...</p>
          ) : courses.length === 0 ? (
            <p className="empty-text">Aucun cours trouvé pour le moment.</p>
          ) : (
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Titre / Nom</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id || course.code}>
                    <td><span className="badge-code">{course.code}</span></td>
                    <td><strong>{course.name}</strong></td>
                    <td>{course.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}