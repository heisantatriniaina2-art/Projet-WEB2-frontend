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
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Platform overview.</p>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <Link to="/admin/students">Students</Link>
          <h3>{stats.students}</h3>
        </div>
        <div className="card">
          <Link to="/admin/courses">Courses</Link>
          <h3>{stats.courses}</h3>
        </div>
        <div className="card">
          <Link to="/admin/exams">Exams</Link>
          <h3>{stats.exams}</h3>
        </div>
      </div>
    </div>
  );
}