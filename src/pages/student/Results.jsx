import { Link, useLocation } from "react-router-dom";
import "../../App.css";

export default function Results() {
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="admin-page">
        <div className="page-header">
          <div>
            <h1>Exam Results</h1>
            <p>View your grade and assessment summary.</p>
          </div>
        </div>

        <div
          className="card"
          style={{ textAlign: "center", padding: "3rem 1.5rem" }}
        >
          <h2 style={{ marginBottom: "0.5rem" }}>No results to display</h2>
          <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
            You have not completed an exam yet or you navigated directly to this page.
          </p>
          <Link to="/student/exams">
            <button className="primary-button">
              View Available Exams
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Exam Result</h1>
          <p>Here is the summary of your performance.</p>
        </div>
      </div>

      <div className="card">
        <h2 >
          {result.exam_title || "Exam Completed"}
        </h2>

        <div
        >
          <span>
            Score Obtained
          </span>
          <strong>
            {result.score ?? 0}
          </strong>
        </div>

        {result.total_points !== undefined && (
          <p>
            Total Points: <strong>{result.total_points} point(s)</strong>
          </p>
        )}

        {result.percentage !== undefined && (
          <p style={{ marginBottom: "1.5rem" }}>
            Percentage: <strong>{result.percentage}%</strong>
          </p>
        )}

        <Link to="/student/exams">
          <button className="secondary-button">
            Back to Exams
          </button>
        </Link>
      </div>
    </div>
  );
}