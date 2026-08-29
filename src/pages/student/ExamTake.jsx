import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ExamTake() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Données simulées pour afficher le QCM instantanément
    const mockExamData = {
      id: Number(id),
      title: id === "1" ? "Final Exam" : "Continuous Assessment",
      description: "Answer the following questions carefully.",
      questions: [
        {
          id: 1,
          text: "What does API stand for?",
          options: [
            "Application Programming Interface",
            "Applied Program Integration",
            "Automated Protocol Interaction",
            "Application Process Integration"
          ]
        },
        {
          id: 2,
          text: "Which HTTP method is typically used to create a resource?",
          options: ["GET", "POST", "PUT", "DELETE"]
        }
      ]
    };

    setExam(mockExamData);
  }, [id]);

  const handleOptionChange = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (loading || !exam) {
    return <div className="empty-message">Loading exam...</div>;
  }

  if (submitted) {
    return (
      <div className="admin-page" style={{ padding: "30px" }}>
        <div className="card" style={{ padding: "30px", textAlign: "center", background: "white", borderRadius: "8px" }}>
          <h2 style={{ color: "#10b981", marginBottom: "1rem" }}>Exam Submitted Successfully! 🎉</h2>
          <p>Your responses have been recorded.</p>
          <button
            className="primary-button"
            style={{ marginTop: "20px", padding: "10px 20px", background: "#4f46e5", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
            onClick={() => navigate("/student/exams")}
          >
            Back to Exams
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page" style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <div className="page-header" style={{ marginBottom: "20px" }}>
        <h1>{exam.title}</h1>
        <p>{exam.description}</p>
      </div>

      <form onSubmit={handleSubmit}>
        {exam.questions.map((q, index) => (
          <div key={q.id} className="card" style={{ background: "white", padding: "20px", marginBottom: "20px", borderRadius: "8px", border: "1px solid #ccc" }}>
            <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
              {index + 1}. {q.text}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {q.options.map((option, idx) => (
                <label key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={option}
                    checked={answers[q.id] === option}
                    onChange={() => handleOptionChange(q.id, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="primary-button"
          style={{ width: "100%", padding: "12px", background: "#4f46e5", color: "white", border: "none", borderRadius: "4px", fontSize: "1rem", cursor: "pointer" }}
        >
          Submit Exam
        </button>
      </form>
    </div>
  );
}