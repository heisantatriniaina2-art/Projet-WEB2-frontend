import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../../api/client";
import { useAuth } from "../../contexts/AuthContext";
import "./Exam.css";
export default function Exams() {
    const { token } = useAuth();
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchExams = async () => {
            try {
                setLoading(true);
                setError("");
                const data = await apiFetch("/my/exams", { token });
                setExams(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load exams.");
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchExams();
    }, [token]);

    if (loading) return <p>Chargement des examens...</p>;

    return (
        <div className="student-exams">
            <header className="dashboard-header">
                <div className="logo"><h1>Exam Hub</h1></div>
                <nav className="navbar">
                    <Link to="/student" className="active">Tableau de bord</Link>
                    <Link to="/student/results">Résultats</Link>
                </nav>
            </header>
            <main className="exams-content">
                <h2>Examens disponibles</h2>
                {error && <p className="error-message">{error}</p>}
                {!error && exams.length === 0 && <p>Aucun examen disponible pour le moment.</p>}
                <div className="exam-list">
                    {exams.map((exam) => (
                        <div className="exam-card" key={exam.id}>
                            <h3>{exam.title}</h3>
                            <p>{exam.description}</p>
                            <p><strong>Début :</strong> {new Date(exam.start_at || exam.start_time).toLocaleString()}</p>
                            <p><strong>Fin :</strong> {new Date(exam.end_at || exam.end_time).toLocaleString()}</p>
                            <Link to={`/student/exams/${exam.id}`}>Commencer l'examen</Link>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}