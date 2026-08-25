import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './StudentLayout.css';

export default function StudentLayout({ onLogout }) {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="student-layout-container">
            { }
            <aside className="student-sidebar">
                <div className="sidebar-top">
                    <div className="sidebar-brand">
                        <span className="brand-logo">[ HEI ]</span>
                        <span className="brand-title">HEI Student</span>
                    </div>

                    <nav className="sidebar-nav">
                        <Link to="/student" className={`sidebar-link ${isActive('/student') ? 'active' : ''}`}>
                            <span className="icon">🏠</span> Accueil
                        </Link>
                        <Link to="/student/exams" className={`sidebar-link ${isActive('/student/exams') ? 'active' : ''}`}>
                            <span className="icon">📝</span> Examens
                        </Link>
                        <Link to="/student/results" className={`sidebar-link ${isActive('/student/results') ? 'active' : ''}`}>
                            <span className="icon">📊</span> Mes résultats
                        </Link>
                        <Link to="/student/courses" className={`sidebar-link ${isActive('/student/courses') ? 'active' : ''}`}>
                            <span className="icon">📚</span> Cours
                        </Link>
                    </nav>
                </div>

                <div className="sidebar-bottom">
                    <button className="sidebar-logout" onClick={onLogout}>
                        <span className="icon">🚪</span> Se déconnecter
                    </button>

                    <div className="sidebar-contact">
                        <p className="contact-title">Horaires d'ouverture</p>
                        <div className="contact-info">📞 034 94 041 16</div>
                        <div className="contact-info">✉️ contact@mail.hei.school</div>
                    </div>
                </div>
            </aside>

            {/* Zone de contenu principale à droite */}
            <main className="student-main-content">
                <Outlet />
            </main>
        </div>
    );
}