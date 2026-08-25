import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiFetch } from "../../api/client";
import { useAuth } from "../../contexts/AuthContext";

export default function ExamSubmissionResult() {
    const { id } = useParams();
    const { token } = useAuth();
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // route à adapter selon ton backend :
        // soit GET /api/my/exams/:id (avec correction si déjà passé)
        // soit une entrée dédiée dans /api/my/results filtrée par examId
        apiFetch(`/my/exams/${id}`, { token })
            .then(setResult)
            .catch(err => setError(err.message));
    }, [id]);

    if (error) return <p role="alert" className="error">{error}</p>;
    if (!result) return <p>Chargement…</p>;

    return (
        <div className="exam-result">
            <h1>{result.title} — Résultat</h1>
            <p className="score">
                Note : {result.score} / {result.maxScore}
            </p>

            {result.questions.map(q => {
                const isCorrect = q.studentChoiceId === q.correctChoiceId;
                return (
                    <div
                        key={q.id}
                        className={`question-review ${isCorrect ? "correct" : "incorrect"}`}
                    >
                        <p className="question-text">{q.text}</p>
                        <p>Votre réponse : {q.studentChoiceText ?? "— sans réponse —"}</p>
                        {!isCorrect && <p>Bonne réponse : {q.correctChoiceText}</p>}
                    </div>
                );
            })}

            <Link to="/student/results">Retour à mes résultats</Link>
        </div>
    );
}