import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './StudentLayout.css';

export default function StudentLayout({ onLogout }) {
    return (
        <div className="student-layout">
            {/* Barre de navigation horizontale en haut */}
            <header className="student-header">
                <div className="brand-title">[ HEI ] Student Hub</div>
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

            {/* Contenu principal de la page */}
            <main className="student-content">
                <Outlet />
            </main>
        </div>
    );
}