import { useEffect, useState } from 'react';
import { getStudents } from '../../api/students';

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents().then(setStudents).catch(console.error);
  }, []);

  return (
    <div>
      <h1>Gestion des Étudiants</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name || s.username}</td>
              <td>{s.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}