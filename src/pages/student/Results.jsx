import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { apiFetch } from "../../api/client";
import { useAuth } from "../../contexts/AuthContext";
import "./Exam.css";
export default function Results() {
    const { token } = useAuth();
    const location = useLocation();
    
    const submittedResult = location.state?.result;
    
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(!submittedResult);

    useEffect(() => {
        if (!submittedResult && token) {
            const fetchHistory = async () => {
                try {
                    setLoading(true);
                    const data = await apiFetch("/my/results", { token });
                    setHistory(data);
                } catch (err) {
                    console.error("Erreur lors du chargement de l'historique", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchHistory();
        }
    }, [submittedResult, token]);

    if (submittedResult) {
        return (
            <div className="results-page">
                <header className="dashboard-header">
                    <div className="logo"><h1>Exam Hub</h1></div>
                    <nav className="navbar">
                        <Link to="/student">Tableau de bord</Link>
                        <Link to="/student/exams">Examens</Link>
                        <Link to="/student/results" className="active">Résultats</Link>
                    </nav>
                </header>
                <main className="results-content">
                    <h2>Résultat de l'examen</h2>
                    <div className="result-card">
                        <h3>{submittedResult.exam_title || "Examen terminé"}</h3>
                        <div className="score">
                            <span>Votre note</span>
                            <strong>{submittedResult.score ?? 0} / {submittedResult.total_points ?? 0}</strong>
                        </div>
                        {submittedResult.percentage !== undefined && (
                            <p>Pourcentage : <strong>{submittedResult.percentage}%</strong></p>
                        )}

                        {/* Correction détaillée question par question */}
                        {submittedResult.corrections && submittedResult.corrections.length > 0 && (
                            <div className="corrections-list" style={{ marginTop: "20px", textAlign: "left" }}>
                                <h4>Correction détaillée :</h4>
                                {submittedResult.corrections.map((item, idx) => (
                                    <div key={idx} className={`correction-item ${item.is_correct ? "correct" : "incorrect"}`} style={{ margin: "10px 0", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                                        <p><strong>Q{idx + 1}:</strong> {item.statement}</p>
                                        <p>Votre choix : <span style={{ color: item.is_correct ? "green" : "red" }}>{item.user_answer_text || "Aucune réponse"}</span></p>
                                        {!item.is_correct && <p>Bonne réponse : <span style={{ color: "green" }}>{item.correct_answer_text}</span></p>}
                                    </div>
                                ))}
                            </div>
                        )}

                        <Link to="/student/exams" className="back-exams-button" style={{ display: "inline-block", marginTop: "20px" }}>
                            Retour aux examens
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    if (loading) {
        return <div className="results-page"><p style={{ textAlign: "center", marginTop: "50px" }}>Chargement de vos résultats...</p></div>;
    }

    return (
        <div className="results-page">
            <header className="dashboard-header">
                <div className="logo"><h1>Exam Hub</h1></div>
                <nav className="navbar">
                    <Link to="/student">Tableau de bord</Link>
                    <Link to="/student/exams">Examens</Link>
                    <Link to="/student/results" className="active">Résultats</Link>
                </nav>
            </header>
            <main className="results-content">
                <h2>Mon historique de résultats</h2>
                {history.length === 0 ? (
                    <div className="result-card">
                        <p>Vous n'avez pas encore terminé d'examen.</p>
                        <Link to="/student/exams">Voir les examens disponibles</Link>
                    </div>
                ) : (
                    <div className="exam-list">
                        {history.map((res, index) => (
                            <div className="result-card" key={index} style={{ marginBottom: "15px" }}>
                                <h3>{res.exam_title || "Examen"}</h3>
                                <p>Note : <strong>{res.score} / {res.total_points}</strong> ({res.percentage}%)</p>
                                <p><small>Passé le : {new Date(res.submitted_at || res.date).toLocaleString()}</small></p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}