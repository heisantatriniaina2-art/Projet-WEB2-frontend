import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "", role: "Étudiante" });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                setUser({
                    name: parsed.name || parsed.email || "",
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
        <div className="admin-page">
            <div className="page-header">
                <div>
                    <h1>Bienvenue 👋 {user.name && user.name}</h1>
                    <p>
                        Retrouvez vos examens, passez vos QCM et consultez vos résultats.
                    </p>
                </div>
                <button onClick={handleLogout} className="action-button danger">
                    Déconnexion
                </button>
            </div>

            <div className="card-grid">
                <div className="card">
                    <h3>📝 Examens</h3>
                    <p>
                        Consultez les examens disponibles et passez vos QCM.
                    </p>
                    <Link to="/student/exams" style={{ marginTop: "auto", pt: "1rem" }}>
                        <button className="primary-button" style={{ width: "100%", marginTop: "1rem" }}>
                            Voir les examens
                        </button>
                    </Link>
                </div>

                <div className="card">
                    <h3>📊 Résultats</h3>
                    <p>
                        Consultez vos notes et les résultats de vos examens.
                    </p>
                    <Link to="/student/results" style={{ marginTop: "auto" }}>
                        <button className="secondary-button" style={{ width: "100%", marginTop: "1rem" }}>
                            Voir mes résultats
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;