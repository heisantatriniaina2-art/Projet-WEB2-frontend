import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "Administrateur", role: "Administrateur" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser({
          name: parsed.name || parsed.email || "Administrateur",
          role: "Administrateur"
        });
      } catch (e) {
        console.error("Erreur", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        { }
        <div className="logo">
          <h1>Exam Hub <span className="admin-badge-tag">Admin</span></h1>
        </div>

        { }
        <nav className="navbar">
          <Link to="/admin" className="active">
            Tableau de bord
          </Link>
          <Link to="/admin/students">
            Étudiants
          </Link>
          <Link to="/admin/courses">
            Cours
          </Link>
          <Link to="/admin/exams">
            Examens
          </Link>
        </nav>

        { }
        <div className="header-right">
          <div className="user-profile-header">
            <div className="user-profile-info">
              <h3>{user.name}</h3>
            </div>
            <div className="user-avatar admin-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>

          <button onClick={handleLogout} className="logout-button">
            Déconnexion
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="welcome-section">
          <h2>Espace Administrateur ⚙️</h2>
          <p>
            Gérez les utilisateurs, suivez les cours et supervisez l'ensemble des examens de la plateforme.
          </p>
        </section>

        { }
        <section className="admin-stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>Étudiants</h3>
              <p className="stat-number">0</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-info">
              <h3>Cours</h3>
              <p className="stat-number">0</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-info">
              <h3>Examens</h3>
              <p className="stat-number">0</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;