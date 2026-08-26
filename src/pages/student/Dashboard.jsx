import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "Jean Dupont", role: "Étudiante" });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                setUser({
                    name: parsed.name || parsed.email || "Jean Dupont",
                    role: parsed.role === "admin" ? "Administrateur" : "Étudiante"
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
                {/* 1. LOGO À GAUCHE */}
                <div className="logo">
                    <h1>Exam Hub</h1>
                </div>

                {/* 2. NAVBAR AU CENTRE */}
                <nav className="navbar">
                    <Link to="/student" className="active">
                        Tableau de bord
                    </Link>
                    <Link to="/student/exams">
                        Examens
                    </Link>
                    <Link to="/student/results">
                        Résultats
                    </Link>
                </nav>

                {/* 3. PROFIL + DÉCO CONNEXION À DROITE */}
                <div className="header-right">
                    <div className="user-profile-header">
                        <div className="user-profile-info">
                            <h3>{user.name}</h3>
                        </div>
                        <div className="user-avatar">
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
                    <h2>Bienvenue sur Exam Hub 👋</h2>
                    <p>
                        Retrouvez vos examens, passez vos QCM
                        et consultez vos résultats.
                    </p>
                </section>

                <section className="dashboard-cards">
                    <div className="dashboard-card">
                        <h3>📝 Examens</h3>
                        <p>
                            Consultez les examens disponibles
                            et passez vos QCM.
                        </p>
                        <Link to="/student/exams">
                            Voir les examens
                        </Link>
                    </div>

                    <div className="dashboard-card">
                        <h3>📊 Résultats</h3>
                        <p>
                            Consultez vos notes et les résultats
                            de vos examens.
                        </p>
                        <Link to="/student/results">
                            Voir mes résultats
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;