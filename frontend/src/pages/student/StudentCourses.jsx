import React, { useState, useEffect } from 'react';
import './StudentCourses.css';

export default function StudentCourses() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch('http://localhost:3000/api/my/courses', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(async (res) => {
                if (!res.ok) {
                    const errData = await res.json();
                    throw new Error(errData.message || 'Erreur lors du chargement des cours');
                }
                return res.json();
            })
            .then((data) => {
                setCourses(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="loading">Chargement des cours disponibles...</div>;
    }

    return (
        <div className="student-courses-container">
            <h2>Mes Cours et Documents</h2>

            {error && <div className="error-message">{error}</div>}

            {courses.length === 0 ? (
                <p className="no-courses">Aucun cours n'est disponible pour le moment.</p>
            ) : (
                <div className="courses-grid">
                    {courses.map((course) => (
                        <div key={course.id} className="course-card">
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                            <div className="course-footer">
                                <span className="course-author">Professeur : {course.teacher_name}</span>
                                {course.file_url && (
                                    <a
                                        href={course.file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-download"
                                    >
                                        Télécharger le support
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}