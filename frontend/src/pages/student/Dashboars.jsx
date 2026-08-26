import { Link, useNavigate } from "react-router-dom";
import '../../App.css';
import { useAuth } from "../../contexts/AuthContext";

export default function Dashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="dashboard">

            <header className="dashboard-header">
                <div className="logo">
                    <h1>Exam Hub</h1>
                </div>

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

                <div className="student-profile">
                    <div className="student-avatar">
                        JD
                    </div>

                    <span>Jean Dupont</span>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Déconnexion
                    </button>
                </div>
            </header>

            <main className="dashboard-content">
                <section className="welcome">
                    <h2>Bonjour Jean 👋</h2>
                    <p>
                        Bienvenue sur votre espace étudiant.
                    </p>
                </section>

                <section className="dashboard-cards">

                    <Link
                        to="/student/exams"
                        className="dashboard-card"
                    >
                        <div className="card-icon">📝</div>

                        <div>
                            <h3>Mes examens</h3>
                            <p>
                                Consultez les examens disponibles.
                            </p>
                        </div>

                        <span className="arrow">→</span>
                    </Link>

                    <Link
                        to="/student/results"
                        className="dashboard-card"
                    >
                        <div className="card-icon">📊</div>

                        <div>
                            <h3>Mes résultats</h3>
                            <p>
                                Consultez vos résultats.
                            </p>
                        </div>

                        <span className="arrow">→</span>
                    </Link>

                </section>
            </main>

        </div>
    );
}