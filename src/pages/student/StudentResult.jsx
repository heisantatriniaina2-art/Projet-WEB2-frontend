import React, { useState, useEffect } from 'react';
import './StudentResult.css';

export default function StudentResults() {
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:3000/api/my/results', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(async (res) => {
                if (!res.ok) {
                    const errData = await res.json();
                    throw new Error(errData.message || 'Erreur lors du chargement des résultats');
                }
                return res.json();
            })
            .then((data) => {
                setResults(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="loading">Chargement de tes résultats...</div>;
    }

    return (
        <div className="student-results-container">
            <h2>Mes Résultats</h2>

            {error && <div className="error-message">{error}</div>}

            {results.length === 0 ? (
                <p className="no-results">Aucun résultat disponible pour le moment.</p>
            ) : (
                <div className="results-table-wrapper">
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>Examen</th>
                                <th>Note obtenue</th>
                                <th>Statut</th>
                                <th>Date de correction</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result) => (
                                <tr key={result.id}>
                                    <td>{result.exam_title}</td>
                                    <td><strong>{result.score} / {result.total}</strong></td>
                                    <td>
                                        <span className={`badge ${result.passed ? 'success' : 'fail'}`}>
                                            {result.passed ? 'Validé' : 'Non validé'}
                                        </span>
                                    </td>
                                    <td>{new Date(result.graded_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}