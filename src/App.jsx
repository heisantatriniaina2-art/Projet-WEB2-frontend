import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import './App.css';

import Dashboard from './pages/admin/Dashboard.jsx';
import Students from './pages/admin/Students.jsx';
import Courses from './pages/admin/Courses.jsx';
import Exams from './pages/admin/Exams.jsx';
import Questions from './pages/admin/Questions.jsx';
import Results from './pages/admin/Results.jsx';

function Layout({ links, children }) {
  return (
    <div className="admin-layout">
      <header className="admin-header">
        <h2>Examens - Admin</h2>
        <nav className="admin-navbar">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="admin-content">{children}</main>
    </div>
  );
}

const adminLinks = [
  { to: '/admin', label: 'Tableau de bord', end: true },
  { to: '/admin/students', label: 'Étudiants' },
  { to: '/admin/courses', label: 'Cours' },
  { to: '/admin/exams', label: 'Examens' },
];

export default function App() {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <Layout links={adminLinks}>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/admin/students"
        element={
          <Layout links={adminLinks}>
            <Students />
          </Layout>
        }
      />
      <Route
        path="/admin/courses"
        element={
          <Layout links={adminLinks}>
            <Courses />
          </Layout>
        }
      />
      <Route
        path="/admin/exams"
        element={
          <Layout links={adminLinks}>
            <Exams />
          </Layout>
        }
      />
      <Route
        path="/admin/exams/:id/questions"
        element={
          <Layout links={adminLinks}>
            <Questions />
          </Layout>
        }
      />
      <Route
        path="/admin/exams/:id/results"
        element={
          <Layout links={adminLinks}>
            <Results />
          </Layout>
        }
      />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}