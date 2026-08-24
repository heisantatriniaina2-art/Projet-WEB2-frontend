import React, { useState } from 'react';
import LoginForm from './pages/LoginPage';
import StudentDashboard from './pages/StudentPage';
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
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok === true) {
        const data = await response.json();
        console.log('Connecté avec succès :', data);
        setUser({ email, role: 'STUDENT' });
      } else {
        throw new Error('Identifiant incorrect');
      }

    } catch (err) {
      setError(err.message || "Une erreur est survenue");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setEmail('');
    setPassword('');
  };

  if (!user) {
    return (
      <div className='container'>
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          error={error}
          onSubmit={submit}
        />
      </div>
    );
  }

  return (
    <StudentDashboard
      user={user}
      onLogout={handleLogout}
    />
  );
}

export default App;