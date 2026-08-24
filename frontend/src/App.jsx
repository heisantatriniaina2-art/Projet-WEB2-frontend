import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginForm from './pages/login/LoginPage';
import StudentDashboard from './pages/student/StudentPage';

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
  const [user, setUser] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError('');

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

    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setEmail('');
    setPassword('');

    localStorage.removeItem('token');
  };

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

          <Route
            path="/admin"
            element={
              user.role === 'ADMIN'
                ? <Dashboard />
                : <Navigate to="/student" replace />
            }
          />

          <Route
            path="/admin/students"
            element={
              user.role === 'ADMIN'
                ? <Students />
                : <Navigate to="/student" replace />
            }
          />

          <Route
            path="/admin/courses"
            element={
              user.role === 'ADMIN'
                ? <Courses />
                : <Navigate to="/student" replace />
            }
          />

          <Route
            path="/admin/exams"
            element={
              user.role === 'ADMIN'
                ? <Exams />
                : <Navigate to="/student" replace />
            }
          />

          <Route
            path="/admin/exams/:id/questions"
            element={
              user.role === 'ADMIN'
                ? <Questions />
                : <Navigate to="/student" replace />
            }
          />

          <Route
            path="/admin/exams/:id/results"
            element={
              user.role === 'ADMIN'
                ? <ExamResults />
                : <Navigate to="/student" replace />
            }
          />

          <Route
            path="/student"
            element={
              user.role === 'STUDENT'
                ? (
                  <StudentDashboard
                    user={user}
                    onLogout={handleLogout}
                  />
                )
                : <Navigate to="/admin" replace />
            }
          />


          <Route
            path="*"
            element={
              user.role === 'ADMIN'
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