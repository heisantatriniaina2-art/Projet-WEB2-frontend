import React from "react";
import { useParams, Link } from "react-router-dom";

function Results() {
  const { id } = useParams();

  // Mock data
  const results = [
    { id: 1, student: "Jean", score: 16, total: 20, attempts: 1 },
    { id: 2, student: "Paul", score: 12, total: 20, attempts: 1 },
    { id: 3, student: "Marie", score: 15, total: 20, attempts: 1 },
  ];

  const average =
    results.length > 0
      ? (
          results.reduce((sum, r) => sum + r.score, 0) / results.length
        ).toFixed(1)
      : 0;

  const totalAttempts = results.reduce((sum, r) => sum + r.attempts, 0);

  return (
    <div className="admin-page">
      <Link to="/admin/exams">← Back to exams</Link>

      <div className="page-header" style={{ marginTop: "15px" }}>
        <div>
          <h1>Results for Exam #{id}</h1>
          <p>View student grades and performance.</p>
        </div>
      </div>

      <div className="form-card">
        <p>
          <strong>Average:</strong> {average}/20
        </p>
        <p>
          <strong>Total Attempts:</strong> {totalAttempts}
        </p>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Score</th>
              <th>Attempts</th>
            </tr>
          </thead>

          <tbody>
            {results.map((r) => (
              <tr key={r.id}>
                <td>{r.student}</td>
                <td>
                  {r.score}/{r.total}
                </td>
                <td>{r.attempts}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {results.length === 0 && (
          <p className="empty-message">No results for this exam.</p>
        )}
      </div>
    </div>
  );
}

export default Results;