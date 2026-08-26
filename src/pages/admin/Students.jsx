import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getStudents } from "../../api/students";
import "../../App.css";

export default function StudentsManagement() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // États pour le formulaire de création
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    setLoading(true);
    getStudents()
      .then((data) => {
        setStudents(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement étudiants", err);
        setLoading(false);
      });
  };

  // Gérer la création d'un étudiant
  const handleCreateStudent = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    fetch("http://localhost:3000/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ name, email, password })
    })
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Erreur lors de la création de l'étudiant");
        }
        return res.json();
      })
      .then(() => {
        setSuccess("Étudiant créé avec succès !");
        setName("");
        setEmail("");
        setPassword("");
        fetchStudents();
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // Gérer la désactivation / activation d'un étudiant
  const handleToggleStatus = (id, currentStatus) => {
    const action = currentStatus ? "désactiver" : "activer";
    if (!window.confirm(`Voulez-vous vraiment ${action} cet étudiant ?`)) return;

    fetch(`http://localhost:3000/api/students/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ active: !currentStatus })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la modification du statut");
        fetchStudents();
      })
      .catch((err) => alert(err.message));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      {/* En-tête admin */}
      <header className="dashboard-header">
        <div className="logo">
          <h1>Exam Hub <span className="admin-badge-tag">Admin</span></h1>
        </div>

        <nav className="navbar">
          <Link to="/admin">Tableau de bord</Link>
          <Link to="/admin/students" className="active">Étudiants</Link>
          <Link to="/admin/courses">Cours</Link>
          <Link to="/admin/exams">Examens</Link>
        </nav>

        <div className="header-right">
          <button onClick={handleLogout} className="logout-button">Déconnexion</button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="section-header">
          <h2>Gestion des étudiants 👥</h2>
          <p>Créez les accès des étudiants et gérez leur statut sur la plateforme.</p>
        </div>

        {/* Formulaire de création */}
        <div className="form-card">
          <h3>Créer un étudiant</h3>
          {error && <div className="alert error">{error}</div>}
          {success && <div className="alert success">{success}</div>}

          <form onSubmit={handleCreateStudent} className="inline-form">
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom de l'étudiant"
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@exemple.com"
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Mot de passe initial</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe initial"
                required
              />
            </div>

            <button type="submit" className="btn-primary">Créer</button>
          </form>
        </div>

        {/* Liste des étudiants */}
        <div className="table-container">
          <h3>Liste des étudiants</h3>
          {loading ? (
            <p className="loading-text">Chargement des étudiants...</p>
          ) : students.length === 0 ? (
            <p className="empty-text">Aucun étudiant disponible.</p>
          ) : (
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td><strong>{student.name}</strong></td>
                    <td>{student.email}</td>
                    <td>
                      <span className={`badge-status ${student.active !== false ? "active" : "disabled"}`}>
                        {student.active !== false ? "Actif" : "Désactivé"}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleStatus(student.id, student.active !== false)}
                        className={`btn-action ${student.active !== false ? "btn-danger" : "btn-success"}`}
                      >
                        {student.active !== false ? "Désactiver" : "Activer"}
                      </button>
                    </td>
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