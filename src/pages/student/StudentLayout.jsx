import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './StudentLayout.css';

export default function StudentLayout({ onLogout }) {
    return (
        <div className="student-layout">
            { }
            <header className="student-header">
                <h1>Exam Hub</h1>
                <nav className="student-nav">
                    <Link to="/student" className="nav-link">Accueil</Link>
                    <Link to="/student/exams" className="nav-link">Examens</Link>
                    <Link to="/student/results" className="nav-link">Mes résultats</Link>
                    <Link to="/student/courses" className="nav-link">Cours</Link>
                </nav>
                <button className="btn-logout" onClick={onLogout}>
                    Déconnexion
                </button>
            </header>

            { }
            <main className="student-content">
                <Outlet />
            </main>
        </div>
    );
}