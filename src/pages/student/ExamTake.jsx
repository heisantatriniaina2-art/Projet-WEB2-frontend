import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../../api/client";
import { useAuth } from "../../contexts/AuthContext";

export default function ExamTake() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExam = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await apiFetch(`/exams/${id}`, {
          token,
        });

        setExam(data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger cet examen.");
      } finally {
        setLoading(false);
      }
    };

    if (token && id) {
      fetchExam();
    }
  }, [token, id]);

  const handleAnswerChange = (questionId, answerId) => {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [questionId]: answerId,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      const formattedAnswers = Object.entries(answers).map(
        ([questionId, answerId]) => ({
          question_id: Number(questionId),
          answer_id: Number(answerId),
        })
      );

      const result = await apiFetch(`/exams/${id}/submit`, {
        method: "POST",
        token,
        body: {
          answers: formattedAnswers,
        },
      });

      navigate("/student/results", {
        state: {
          result,
        },
      });
    } catch (err) {
      console.error(err);
      setError("Impossible de soumettre l'examen.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="exam-take">
        <p>Chargement de l'examen...</p>
      </div>
    );
  }

  if (error && !exam) {
    return (
      <div className="exam-take">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="exam-take">
        <p>Examen introuvable.</p>
      </div>
    );
  }

  return (
    <div className="exam-take">
      <header className="dashboard-header">
        <div className="logo">
          <h1>Exam Hub</h1>
        </div>
      </header>

      <main className="exam-container">
        <div className="exam-header">
          <h2>{exam.title}</h2>
          <p>{exam.description}</p>
        </div>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          {exam.questions && exam.questions.length > 0 ? (
            exam.questions.map((question, index) => (
              <div className="question-card" key={question.id}>
                <h3>Question {index + 1}</h3>

                <p className="question-statement">{question.statement}</p>

                <p className="question-points">
                  {question.points} point(s)
                </p>

                <div className="answers">
                  {question.answers?.map((answer) => (
                    <label key={answer.id} className="answer-option">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={answer.id}
                        checked={answers[question.id] === answer.id}
                        onChange={() =>
                          handleAnswerChange(question.id, answer.id)
                        }
                      />
                      <span>{answer.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>Aucune question disponible pour cet examen.</p>
          )}

          {exam.questions?.length > 0 && (
            <button
              type="submit"
              disabled={submitting}
              className="submit-exam-button"
            >
              {submitting ? "Envoi en cours..." : "Terminer l'examen"}
            </button>
          )}
        </form>
      </main>
    </div>
  );
}