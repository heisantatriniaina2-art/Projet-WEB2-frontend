import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginForm from './pages/login/LoginPage';

// Import des composants de l'espace étudiant (Layout et onglets)
import StudentLayout from './pages/student/StudentLayout';
import StudentHome from './pages/student/StudentPage'; // Fait office d'Accueil
import StudentExams from './pages/student/StudentExams';
import StudentResults from './pages/student/StudentResult';
import StudentCourses from './pages/student/StudentCourses';

import Dashboard from './pages/admin/Dashboard';
import Students from './pages/admin/Students';
import Courses from './pages/admin/Courses';
import Exams from './pages/admin/Exams';
import Questions from './pages/admin/Questions';
import ExamResults from './pages/admin/ExamResults';

import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState({ id: 1, email: 'student@test.com', role: 'student' });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Identifiants incorrects');
      }

      console.log('Connecté avec succès :', data);

      setUser(data.user);

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      const role = data.user.role ? data.user.role.toLowerCase() : '';
      if (role === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/student';
      }

    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setEmail('');
    setPassword('');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  const userRole = user && user.role ? user.role.toLowerCase() : '';

  return (
    <BrowserRouter>

      {!user ? (
        <div className="container">
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
            onSubmit={submit}
          />
        </div>
      ) : (
        <Routes>

          {/* ROUTES ADMIN */}
          <Route
            path="/admin"
            element={
              userRole === 'admin'
                ? <Dashboard />
                : <Navigate to="/student" replace />
            }
          />

          <Route
            path="/admin/students"
            element={
              userRole === 'admin'
                ? <Students />
                : <Navigate to="/student" replace />
            }
          />

          <Route
            path="/admin/courses"
            element={
              userRole === 'admin'
                ? <Courses />
                : <Navigate to="/student" replace />
            }
          />

          <Route
            path="/admin/exams"
            element={
              userRole === 'admin'
                ? <Exams />
                : <Navigate to="/student" replace />
            }
          />

          <Route
            path="/admin/exams/:id/questions"
            element={
              userRole === 'admin'
                ? <Questions />
                : <Navigate to="/student" replace />
            }
          />

          <Route
            path="/admin/exams/:id/results"
            element={
              userRole === 'admin'
                ? <ExamResults />
                : <Navigate to="/student" replace />
            }
          />

          {/* ROUTES ÉTUDIANT AVEC LE LAYOUT ET LA NAVBAR */}
          <Route
            path="/student"
            element={
              userRole === 'student'
                ? <StudentLayout onLogout={handleLogout} />
                : <Navigate to="/admin" replace />
            }
          >
            {/* Index correspond à la page affichée par défaut sur /student (Accueil) */}
            <Route index element={<StudentHome user={user} />} />
            <Route path="exams" element={<StudentExams />} />
            <Route path="results" element={<StudentResults />} />
            <Route path="courses" element={<StudentCourses />} />
          </Route>

          {/* REDIRECTION PAR DÉFAUT */}
          <Route
            path="*"
            element={
              userRole === 'admin'
                ? <Navigate to="/admin" replace />
                : <Navigate to="/student" replace />
            }
          />

        </Routes>
      )}

    </BrowserRouter>
  );
}

export default App;