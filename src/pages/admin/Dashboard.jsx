import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStudents } from '../../api/students';
import { getCourses } from '../../api/courses';
import { getExams } from '../../api/exams';

export default function Dashboard() {
  const [stats, setStats] = useState({ students: 0, courses: 0, exams: 0 });

  useEffect(() => {
    Promise.all([
      getStudents().catch(() => []),
      getCourses().catch(() => []),
      getExams().catch(() => [])
    ]).then(([students, courses, exams]) => {
      setStats({
        students: students.length || 0,
        courses: courses.length || 0,
        exams: exams.length || 0
      });
    });
  }, []);

  return (
    <div>
      <h1>Tableau de bord</h1>
      <div className="card-grid">
        <div className="card">
          <Link to="/admin/students">Étudiants</Link>
          <h3>{stats.students}</h3>
        </div>
        <div className="card">
          <Link to="/admin/courses">Cours</Link>
          <h3>{stats.courses}</h3>
        </div>
        <div className="card">
          <Link to="/admin/exams">Examens</Link>
          <h3>{stats.exams}</h3>
        </div>
      </div>
    </div>
  );
}