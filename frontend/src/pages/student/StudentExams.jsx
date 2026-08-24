import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentExams.css'; // Ou ton fichier CSS habituel

export default function StudentExams() {
    const [exams, setExams] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch('http://localhost:3000/api/my/exams', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(async (res) => {
                if (!res.ok) {
                    const errData = await res.json();
                    throw new Error(errData.message || 'Erreur lors du chargement des examens');
                }
                return res.json();
            })
            .then((data) => {
                setExams(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="loading">Chargement des examens disponibles...</div>;
    }

    return (
        <div className="student-exams-container">
            <h2>Examens disponibles</h2>

            {error && <div className="error-message">{error}</div>}

            {exams.length === 0 ? (
                <p className="no-exams">Aucun examen n'est disponible pour le moment.</p>
            ) : (
                <div className="exams-grid">
                    {exams.map((exam) => (
                        <div key={exam.id} className="exam-card">
                            <h3>{exam.title}</h3>
                            <p>{exam.description}</p>
                            <div className="exam-dates">
                                <p><strong>Début :</strong> {new Date(exam.start_time).toLocaleString()}</p>
                                <p><strong>Fin :</strong> {new Date(exam.end_time).toLocaleString()}</p>
                            </div>
                            <button
                                className="btn-take-exam"
                                onClick={() => navigate(`/student/exams/${exam.id}`)}
                            >
                                Passer l'examen
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}