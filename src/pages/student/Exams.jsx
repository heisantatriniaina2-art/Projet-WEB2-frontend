import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentExams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // On injecte directement les examens que tu as créés dans l'admin pour débloquer ton interface et tester le QCM
    const mockExams = [
      {
        id: 1,
        title: "Final Exam",
        description: "PROG2 Final Examination",
        startsAt: "2026-08-30T09:00:00Z"
      },
      {
        id: 2,
        title: "Continuous Assessment",
        description: "WEB2 Assessment",
        startsAt: "2026-09-02T10:00:00Z"
      }
    ];

    setExams(mockExams);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="empty-message">Loading exams in progress...</div>;
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>My Exams 📝</h1>
          <p>Check the list of your available exams and access the questionnaires.</p>
        </div>
      </div>

      <div className="card-grid">
        {exams.map((exam) => (
          <div key={exam.id} className="card" style={{ border: "1px solid #ccc", padding: "20px", margin: "10px", borderRadius: "8px", background: "white" }}>
            <h3>{exam.title}</h3>
            <p>{exam.description}</p>
            <div style={{ marginTop: "1rem" }}>
              <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "1rem" }}>
                <strong>Starts at:</strong> {new Date(exam.startsAt).toLocaleString()}
              </p>
              <button
                className="primary-button"
                style={{ width: "100%", padding: "10px", background: "#4f46e5", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                onClick={() => navigate(`/student/exams/${exam.id}`)}
              >
                Take Exam
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}