import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getExams } from "../../api/exams";
import { getCourses } from "../../api/courses";
import "../../App.css";

export default function ExamsManagement() {
    const navigate = useNavigate();
    const [exams, setExams] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    // États pour le formulaire de création d'un examen
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [courseId, setCourseId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        Promise.all([
            getExams().catch(() => []),
            getCourses().catch(() => [])
        ])
            .then(([examsData, coursesData]) => {
                setExams(examsData || []);
                setCourses(coursesData || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erreur lors du chargement des données", err);
                setLoading(false);
            });
    };

    // Gérer la création de l'examen
    const handleCreateExam = (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        fetch("http://localhost:3000/api/exams", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                title,
                description,
                courseId,
                dateDebut: startDate,
                dateFin: endDate
            })
        })
            .then(async (res) => {
                if (!res.ok) {
                    const errData = await res.json();
                    throw new Error(errData.message || "Erreur lors de la création de l'examen");
                }
                return res.json();
            })
            .then(() => {
                setSuccess("Examen créé avec succès !");
                setTitle("");
                setDescription("");
                setCourseId("");
                setStartDate("");
                setEndDate("");
                fetchData();
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="dashboard">
            {/* En-tête admin */}
            <header className="dashboard-header">
                <div className="logo">
                    <h1>Exam Hub <span className="admin-badge-tag">Admin</span></h1>
                </div>

                <nav className="navbar">
                    <Link to="/admin">Tableau de bord</Link>
                    <Link to="/admin/students">Étudiants</Link>
                    <Link to="/admin/courses">Cours</Link>
                    <Link to="/admin/exams" className="active">Examens</Link>
                </nav>

                <div className="header-right">
                    <button onClick={handleLogout} className="logout-button">Déconnexion</button>
                </div>
            </header>

            <main className="dashboard-content">
                <div className="section-header">
                    <h2>Gestion des Examens 📝</h2>
                    <p>Planifiez les examens, définissez leur durée de disponibilité et rattachez-les aux cours.</p>
                </div>

                {/* Formulaire de création d'un examen */}
                <div className="form-card">
                    <h3>Créer un nouvel examen</h3>
                    {error && <div className="alert error">{error}</div>}
                    {success && <div className="alert success">{success}</div>}

                    <form onSubmit={handleCreateExam} className="inline-form">
                        <div className="form-group">
                            <label>Titre de l'examen</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Ex: Examen Partiel PROG2"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Cours associé</label>
                            <select
                                value={courseId}
                                onChange={(e) => setCourseId(e.target.value)}
                                required
                                className="form-select"
                            >
                                <option value="">Sélectionner un cours</option>
                                {courses.map((course) => (
                                    <option key={course.id || course.code} value={course.id || course.code}>
                                        {course.code} - {course.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Date et heure de début</label>
                            <input
                                type="datetime-local"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Date et heure de fin</label>
                            <input
                                type="datetime-local"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Description / Consignes</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Consignes de l'examen..."
                                rows="2"
                                required
                            />
                        </div>

                        <button type="submit" className="btn-primary">Créer l'examen</button>
                    </form>
                </div>

                {/* Tableau de la liste des examens */}
                <div className="table-container">
                    <h3>Liste des examens planifiés</h3>
                    {loading ? (
                        <p className="loading-text">Chargement des examens...</p>
                    ) : exams.length === 0 ? (
                        <p className="empty-text">Aucun examen disponible pour le moment.</p>
                    ) : (
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th>Titre</th>
                                    <th>Description</th>
                                    <th>Début</th>
                                    <th>Fin</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {exams.map((exam) => (
                                    <tr key={exam.id}>
                                        <td><strong>{exam.title}</strong></td>
                                        <td>{exam.description}</td>
                                        <td>{new Date(exam.dateDebut || exam.startDate).toLocaleString()}</td>
                                        <td>{new Date(exam.dateFin || exam.endDate).toLocaleString()}</td>
                                        <td>
                                            <Link to={`/admin/exams/${exam.id}/questions`} className="btn-action btn-secondary-action">
                                                Questions
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
        </div>
    );
}