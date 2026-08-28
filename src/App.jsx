import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import './App.css';

// Pages Admin
import AdminDashboard from './pages/admin/Dashboard.jsx';
import AdminStudents from './pages/admin/Students.jsx';
import AdminCourses from './pages/admin/Courses.jsx';
import AdminExams from './pages/admin/Exams.jsx';
import AdminQuestions from './pages/admin/Questions.jsx';
import AdminResults from './pages/admin/Results.jsx';

// Pages Student
import StudentDashboard from './pages/student/Dashboard.jsx';
import StudentExams from './pages/student/Exams.jsx';
import StudentResults from './pages/student/Results.jsx';

// Page Login
import Login from './pages/Login.jsx';

function Layout({ links, title, children }) {
    return (
        <div className="layout">
            <header className="header">
                <h2>{title}</h2>
                <nav className="navbar">
                    {links.map((l) => (
                        <NavLink key={l.to} to={l.to} end={l.end}>
                            {l.label}
                        </NavLink>
                    ))}
                </nav>
            </header>
            <main className="content">{children}</main>
        </div>
    );
}

const adminLinks = [
    { to: '/admin', label: 'Tableau de bord', end: true },
    { to: '/admin/students', label: 'Étudiants' },
    { to: '/admin/courses', label: 'Cours' },
    { to: '/admin/exams', label: 'Examens' },
];

const studentLinks = [
    { to: '/student', label: 'Tableau de bord', end: true },
    { to: '/student/exams', label: 'Mes Examens' },
    { to: '/student/results', label: 'Mes Résultats' },
];

export default function App() {
    return (
        <Routes>
            {/* Route Connexion */}
            <Route path="/login" element={<Login />} />

            {/* Routes Admin */}
            <Route
                path="/admin"
                element={
                    <Layout links={adminLinks} title="Examens - Admin">
                        <AdminDashboard />
                    </Layout>
                }
            />
            <Route
                path="/admin/students"
                element={
                    <Layout links={adminLinks} title="Examens - Admin">
                        <AdminStudents />
                    </Layout>
                }
            />
            <Route
                path="/admin/courses"
                element={
                    <Layout links={adminLinks} title="Examens - Admin">
                        <AdminCourses />
                    </Layout>
                }
            />
            <Route
                path="/admin/exams"
                element={
                    <Layout links={adminLinks} title="Examens - Admin">
                        <AdminExams />
                    </Layout>
                }
            />
            <Route
                path="/admin/exams/:id/questions"
                element={
                    <Layout links={adminLinks} title="Examens - Admin">
                        <AdminQuestions />
                    </Layout>
                }
            />
            <Route
                path="/admin/exams/:id/results"
                element={
                    <Layout links={adminLinks} title="Examens - Admin">
                        <AdminResults />
                    </Layout>
                }
            />

            {/* Routes Student */}
            <Route
                path="/student"
                element={
                    <Layout links={studentLinks} title="Espace Étudiant">
                        <StudentDashboard />
                    </Layout>
                }
            />
            <Route
                path="/student/exams"
                element={
                    <Layout links={studentLinks} title="Espace Étudiant">
                        <StudentExams />
                    </Layout>
                }
            />
            <Route
                path="/student/results"
                element={
                    <Layout links={studentLinks} title="Espace Étudiant">
                        <StudentResults />
                    </Layout>
                }
            />

            {/* Redirection par défaut vers la page de login ou admin */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}