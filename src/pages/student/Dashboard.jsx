import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", role: "Student" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser({
          name: parsed.name || parsed.email || "",
          role: parsed.role === "admin" ? "Administrator" : "Student",
        });
      } catch (e) {
        console.error("Error", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Welcome 👋 {user.name}</h1>
          <p>
            Find your exams, take your quizzes, and view your results.
          </p>
        </div>
        <button onClick={handleLogout} className="action-button danger">
          Log Out
        </button>
      </div>

      <div className="card-grid">
        <div className="card">
          <h3>📝 Exams</h3>
          <p>
            View available exams and take your quizzes.
          </p>
          <Link to="/student/exams" style={{ marginTop: "auto" }}>
            <button
              className="primary-button"
              style={{ width: "100%", marginTop: "1rem" }}
            >
              View Exams
            </button>
          </Link>
        </div>

        <div className="card">
          <h3>📊 Results</h3>
          <p>
            Check your grades and review your exam results.
          </p>
          <Link to="/student/results" style={{ marginTop: "auto" }}>
            <button
              className="secondary-button"
              style={{ width: "100%", marginTop: "1rem" }}
            >
              View My Results
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;