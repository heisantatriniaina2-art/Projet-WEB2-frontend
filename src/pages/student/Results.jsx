import { Link, useLocation } from "react-router-dom";
import "../../App.css";

export default function Results() {
    const location = useLocation();
    const result = location.state?.result;

    if (!result) {
        return (
            <div className="admin-page">
                <div className="page-header">
                    <div>
                        <h1>Résultats d'examen</h1>
                        <p>Consultez la note et le bilan de votre évaluation.</p>
                    </div>
                </div>

                <div className="card" style={{ textAlign: "center", padding: "3rem 1.5rem" }}>
                    <h2 style={{ marginBottom: "0.5rem" }}>Aucun résultat à afficher</h2>
                    <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
                        Vous n'avez pas encore terminé d'examen ou vous êtes arrivé directement sur cette page.
                    </p>
                    <Link to="/student/exams">
                        <button className="primary-button">Voir les examens disponibles</button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="page-header">
                <div>
                    <h1>Résultat de l'examen</h1>
                    <p>Voici le récapitulatif de votre performance.</p>
                </div>
            </div>

            <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
                <h2 style={{ color: "#4f46e5", marginBottom: "1rem" }}>
                    {result.exam_title || "Examen terminé"}
                </h2>

                <div style={{ background: "#f3f4f6", padding: "1.5rem", borderRadius: "8px", marginBottom: "1.5rem", textAlign: "center" }}>
                    <span style={{ display: "block", color: "#6b7280", fontSize: "0.9rem" }}>Note obtenue</span>
                    <strong style={{ fontSize: "2.5rem", color: "#111827" }}>
                        {result.score ?? 0}
                    </strong>
                </div>

                {result.total_points !== undefined && (
                    <p style={{ marginBottom: "0.5rem" }}>
                        Total de l'examen : <strong>{result.total_points} point(s)</strong>
                    </p>
                )}

                {result.percentage !== undefined && (
                    <p style={{ marginBottom: "1.5rem" }}>
                        Pourcentage : <strong>{result.percentage}%</strong>
                    </p>
                )}

                <Link to="/student/exams">
                    <button className="secondary-button" style={{ width: "100%" }}>
                        Retour aux examens
                    </button>
                </Link>
            </div>
        </div>
    );
}