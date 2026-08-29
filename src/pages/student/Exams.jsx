import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentExams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const localExams = localStorage.getItem("exams");
        if (localExams) {
          setExams(JSON.parse(localExams));
        } else {
          setExams([
            { id: 1, title: "Java Exam", description: "Evaluation on Object-Oriented Programming", duration: 120 },
            { id: 2, title: "Database Exam", description: "SQL queries and modeling", duration: 90 }
          ]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [navigate]);

  if (loading) {
    return <div className="empty-message">Loading exams in progress...</div>;
  }

  if (error) {
    return <div className="empty-message" style={{ color: "var(--danger-color)" }}>{error}</div>;
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>My Exams 📝</h1>
          <p>Check the list of your available exams and access the questionnaires.</p>
        </div>
      </div>

      {exams.length === 0 ? (
        <div className="card empty-message">
          <p>No exams available at the moment.</p>
        </div>
      ) : (
        <div className="card-grid">
          {exams.map((exam) => (
            <div key={exam.id || exam._id} className="card">
              <h3>{exam.title || exam.name}</h3>
              <p>{exam.description || "No description available for this exam."}</p>
              <div style={{ marginTop: "auto" }}>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                  <strong>Duration / Limit:</strong> {exam.duration ? `${exam.duration} minutes` : "Not specified"}
                </p>
                <button
                  className="primary-button"
                  style={{ width: "100%" }}
                  onClick={() => navigate(`/student/exams/${exam.id || exam._id}`)}
                >
                  Take Exam
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}