import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../../api/client";
import { useAuth } from "../../contexts/AuthContext";

export default function ResultsHistory() {
    const { token } = useAuth();
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiFetch("/my/results", { token })
            .then(setResults)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Chargement…</p>;

    return (
        <div className="results-history">
            <h1>Mes résultats</h1>
            {error && <p role="alert" className="error">{error}</p>}

            {results.length === 0 && !error && <p>Aucun examen passé pour le moment.</p>}

            <table>
                <thead>
                    <tr>
                        <th>Examen</th>
                        <th>Cours</th>
                        <th>Date</th>
                        <th>Note</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {results.map(r => (
                        <tr key={r.examId}>
                            <td>{r.examTitle}</td>
                            <td>{r.courseName}</td>
                            <td>{new Date(r.submittedAt).toLocaleString()}</td>
                            <td>{r.score} / {r.maxScore}</td>
                            <td>
                                <Link to={`/student/exams/${r.examId}/result`}>Voir la correction</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}