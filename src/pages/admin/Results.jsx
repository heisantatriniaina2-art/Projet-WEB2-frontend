import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getExamResults } from '../../api/exams';

export default function Results() {
  const { id } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    getExamResults(id).then(setResults).catch(console.error);
  }, [id]);

  return (
    <div>
      <Link to="/admin/exams">← Retour aux examens</Link>
      <h1 style={{ marginTop: '15px' }}>Résultats de l'examen #{id}</h1>
      <table>
        <thead>
          <tr>
            <th>Étudiant</th>
            <th>Note</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, index) => (
            <tr key={r.id || index}>
              <td>{r.studentName || r.user_id}</td>
              <td>{r.score} / {r.totalScore || 20}</td>
              <td>{r.status || 'Terminé'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}