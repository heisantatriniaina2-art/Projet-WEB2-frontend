import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../../api/client";
import { useAuth } from "../../contexts/AuthContext";

export default function ExamTake() {
    const { id } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();

    const [exam, setExam] = useState(null);
    const [answers, setAnswers] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const loadExam = async () => {
            try {
                const data = await apiFetch(`/my/exams/${id}`, {
                    token
                });

                setExam(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadExam();
    }, [id, token]);

    const handleAnswerChange = (questionId, choiceId) => {
        setAnswers({
            ...answers,
            [questionId]: choiceId
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitting(true);
        setError("");

        try {
            await apiFetch(`/my/exams/${id}/submit`, {
                method: "POST",
                token,
                body: {
                    answers
                }
            });

            navigate("/student/results");

        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <p>Chargement de l'examen...</p>;
    }

    if (error) {
        return <p role="alert">{error}</p>;
    }

    if (!exam) {
        return <p>Examen introuvable.</p>;
    }

    return (
        <div>
            <h1>{exam.title}</h1>

            <p>{exam.description}</p>

            <form onSubmit={handleSubmit}>

                {exam.questions.map((question, index) => (
                    <div key={question.id}>

                        <h2>
                            {index + 1}. {question.statement}
                        </h2>

                        <p>
                            Points : {question.points}
                        </p>

                        {question.choices.map((choice) => (
                            <label key={choice.id}>
                                <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    value={choice.id}
                                    checked={
                                        answers[question.id] === choice.id
                                    }
                                    onChange={() =>
                                        handleAnswerChange(
                                            question.id,
                                            choice.id
                                        )
                                    }
                                />

                                {choice.label}
                            </label>
                        ))}

                    </div>
                ))}

                {error && (
                    <p role="alert">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={submitting}
                >
                    {submitting
                        ? "Envoi..."
                        : "Terminer l'examen"}
                </button>

            </form>
        </div>
    );
} 