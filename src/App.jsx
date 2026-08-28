import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import './App.css';

import AdminDashboard from './pages/admin/Dashboard.jsx';
import AdminStudents from './pages/admin/Students.jsx';
import AdminCourses from './pages/admin/Courses.jsx';
import AdminExams from './pages/admin/Exams.jsx';
import AdminQuestions from './pages/admin/Questions.jsx';
import AdminResults from './pages/admin/Results.jsx';

import StudentDashboard from './pages/student/Dashboard.jsx';
import StudentExams from './pages/student/Exams.jsx';
import StudentResults from './pages/student/Results.jsx';

import Login from './pages/Login.jsx';

function Layout({ links, title, children }) {
  return (
    <div className="layout">
      <header className="header">
        <div className="header-container">
          <h2 className="header-title">{title}</h2>
          <nav className="navbar">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="content">{children}</main>
    </div>
  );
}

const adminLinks = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/students', label: 'Students' },
  { to: '/admin/courses', label: 'Courses' },
  { to: '/admin/exams', label: 'Exams' },
];

const studentLinks = [
  { to: '/student', label: 'Dashboard', end: true },
  { to: '/student/exams', label: 'My Exams' },
  { to: '/student/results', label: 'My Results' },
];

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <Layout links={adminLinks} title="Exams - Admin">
            <AdminDashboard />
          </Layout>
        }
      />
      <Route
        path="/admin/students"
        element={
          <Layout links={adminLinks} title="Exams - Admin">
            <AdminStudents />
          </Layout>
        }
      />
      <Route
        path="/admin/courses"
        element={
          <Layout links={adminLinks} title="Exams - Admin">
            <AdminCourses />
          </Layout>
        }
      />
      <Route
        path="/admin/exams"
        element={
          <Layout links={adminLinks} title="Exams - Admin">
            <AdminExams />
          </Layout>
        }
      />
      <Route
        path="/admin/exams/:id/questions"
        element={
          <Layout links={adminLinks} title="Exams - Admin">
            <AdminQuestions />
          </Layout>
        }
      />
      <Route
        path="/admin/exams/:id/results"
        element={
          <Layout links={adminLinks} title="Exams - Admin">
            <AdminResults />
          </Layout>
        }
      />

      <Route
        path="/student"
        element={
          <Layout links={studentLinks} title="Student Portal">
            <StudentDashboard />
          </Layout>
        }
      />
      <Route
        path="/student/exams"
        element={
          <Layout links={studentLinks} title="Student Portal">
            <StudentExams />
          </Layout>
        }
      />
      <Route
        path="/student/results"
        element={
          <Layout links={studentLinks} title="Student Portal">
            <StudentResults />
          </Layout>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}