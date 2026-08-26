import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getQuestionsByExam } from '../../api/questions';

export default function Questions() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestionsByExam(id).then(setQuestions).catch(console.error);
  }, [id]);

  return (
    <div>
      <Link to="/admin/exams">← Retour aux examens</Link>
      <h1 style={{ marginTop: '15px' }}>Questions de l'examen #{id}</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Intitulé</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q, index) => (
            <tr key={q.id || index}>
              <td>{index + 1}</td>
              <td>{q.title || q.statement || q.question}</td>
              <td>{q.points || 1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}