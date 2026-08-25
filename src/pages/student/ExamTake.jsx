import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../../api/client";
import { useAuth } from "../../contexts/AuthContext";


export default function ExamTake() {
    const { id } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();

    const [exam, setExam] = useState(null);
    const [answers, setAnswers] = useState({}); // { questionId: choiceId }
    const [confirming, setConfirming] = useState(false);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        apiFetch(`/my/exams/${id}`, { token })
            .then(setExam)
            .catch(err => setError(err.message));
    }, [id]);

    function selectChoice(questionId, choiceId) {
        setAnswers(prev => ({ ...prev, [questionId]: choiceId }));
    }

    async function handleConfirmSubmit() {
        setSubmitting(true);
        setError(null);
        try {
            // RG-06 : on n'envoie que les IDs choisis, jamais de note
            const payload = {
                answers: Object.entries(answers).map(([questionId, choiceId]) => ({
                    questionId,
                    choiceId,
                })),
            };
            await apiFetch(`/my/exams/${id}/submit`, {
                method: "POST",
                body: payload,
                token,
            });
            navigate(`/student/exams/${id}/result`);
        } catch (err) {
            setError(err.message);
            setConfirming(false);
        } finally {
            setSubmitting(false);
        }
    }

    if (error && !exam) return <p role="alert" className="error">{error}</p>;
    if (!exam) return <p>Chargement…</p>;

    const unanswered = exam.questions.filter(q => !answers[q.id]).length;

    return (
        <div className="exam-take">
            <h1>{exam.title}</h1>
            {error && <p role="alert" className="error">{error}</p>}

            {exam.questions.map(q => (
                <fieldset key={q.id} className="question-block">
                    <legend>{q.text} ({q.points} pt{q.points > 1 ? "s" : ""})</legend>
                    {q.choices.map(c => (
                        <label key={c.id} className="choice">
                            <input
                                type="radio"
                                name={`question-${q.id}`}
                                checked={answers[q.id] === c.id}
                                onChange={() => selectChoice(q.id, c.id)}
                            />
                            {c.text}
                        </label>
                    ))}
                </fieldset>
            ))}

            <button onClick={() => setConfirming(true)} disabled={submitting}>
                Soumettre l'examen
            </button>

            {confirming && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <p>
                            Voulez-vous vraiment soumettre ? Cette action est définitive.
                            {unanswered > 0 && (
                                <><br />{unanswered} question(s) sans réponse (0 point).</>
                            )}
                        </p>
                        <button onClick={handleConfirmSubmit} disabled={submitting}>
                            Confirmer
                        </button>
                        <button onClick={() => setConfirming(false)} disabled={submitting}>
                            Annuler
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}