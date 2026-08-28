import React from "react";
import { useParams, Link } from "react-router-dom";

function Results() {
  const { id } = useParams();

  // Données fictives
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

      <Link to="/admin/exams">← Retour aux examens</Link>

      <div className="page-header" style={{ marginTop: "15px" }}>
        <div>
          <h1>Résultats de l'examen #{id}</h1>
          <p>Consulter les notes des étudiants.</p>
        </div>
      </div>

      <div className="form-card">
        <p>
          <strong>Moyenne :</strong> {average}/20
        </p>
        <p>
          <strong>Nombre de tentatives :</strong> {totalAttempts}
        </p>
      </div>

      <div className="table-card">

        <table>

          <thead>
            <tr>
              <th>Étudiant</th>
              <th>Note</th>
              <th>Tentatives</th>
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
          <p className="empty-message">Aucun résultat pour cet examen.</p>
        )}

      </div>

    </div>
  );
}

export default Results;