import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../../api/client";
import { useAuth } from "../../contexts/AuthContext";

export default function ExamList() {
    const { token } = useAuth();
    const [exams, setExams] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiFetch("/my/exams", { token })
            .then(setExams)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Chargement…</p>;

    return (
        <div className="exam-list">
            <h1>Examens disponibles</h1>
            {error && <p role="alert" className="error">{error}</p>}

            {exams.length === 0 && !error && (
                <p>Aucun examen disponible pour le moment.</p>
            )}

            <ul className="exam-list__items">
                {exams.map(exam => (
                    <li key={exam.id} className="exam-card">
                        <h2>{exam.title}</h2>
                        <p>{exam.description}</p>
                        <p className="exam-card__course">{exam.courseName}</p>
                        <p className="exam-card__window">
                            Disponible jusqu'au {new Date(exam.endsAt).toLocaleString()}
                        </p>
                        <Link to={`/student/exams/${exam.id}`}>Passer l'examen</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}