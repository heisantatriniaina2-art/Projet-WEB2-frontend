import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../../api/client";
import { useAuth } from "../../contexts/AuthContext";

export default function Exams() {
  const { token } = useAuth();

  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await apiFetch("/exams", {
          token,
        });

        setExams(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load exams.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchExams();
    }
  }, [token]);

  if (loading) {
    return <p>Loading exams...</p>;
  }

  return (
    <div className="student-exams">
      <header className="dashboard-header">
        <div className="logo">
          <h1>ExamHub</h1>
        </div>

        <nav className="navbar">
          <Link to="/student">Dashboard</Link>

          <Link to="/student/exams" className="active">
            Exams
          </Link>

          <Link to="/student/results">Results</Link>
        </nav>
      </header>

      <main className="exams-content">
        <h2>Available Exams</h2>

        {error && <p className="error-message">{error}</p>}

        {!error && exams.length === 0 && (
          <p>No exams available at the moment.</p>
        )}

        <div className="exam-list">
          {exams.map((exam) => (
            <div className="exam-card" key={exam.id}>
              <h3>{exam.title}</h3>

              <p>{exam.description}</p>

              <p>
                <strong>Start:</strong>{" "}
                {new Date(exam.start_at).toLocaleString()}
              </p>

              <p>
                <strong>End:</strong>{" "}
                {new Date(exam.end_at).toLocaleString()}
              </p>

              <Link to={`/student/exams/${exam.id}/take`}>
                Start Exam
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}