import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getExams } from '../../api/exams';

export default function Exams() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    getExams().then(setExams).catch(console.error);
  }, []);

  return (
    <div>
      <h1>Gestion des Examens</h1>
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((e) => (
            <tr key={e.id}>
              <td>{e.title}</td>
              <td>
                <Link to={`/admin/exams/${e.id}/questions`} className="btn" style={{ marginRight: '10px' }}>
                  Questions
                </Link>
                <Link to={`/admin/exams/${e.id}/results`} className="btn">
                  Résultats
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}