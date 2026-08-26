import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../../api/client";
import { useAuth } from "../../contexts/AuthContext";

export default function Exams() {
    const { token } = useAuth();

    const [exams, setExams] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadExams = async () => {
            try {
                const data = await apiFetch("/my/exams", {
                    token
                });

                setExams(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadExams();
    }, [token]);

    if (loading) {
        return <p>Chargement des examens...</p>;
    }

    return (
        <div>
            <h1>Examens disponibles</h1>

            {error && (
                <p role="alert">
                    {error}
                </p>
            )}

            {!error && exams.length === 0 && (
                <p>
                    Aucun examen disponible pour le moment.
                </p>
            )}

            {exams.length > 0 && (
                <ul>
                    {exams.map((exam) => (
                        <li key={exam.id}>

                            <h2>{exam.title}</h2>

                            <p>
                                {exam.description}
                            </p>

                            <p>
                                Cours : {exam.courseName}
                            </p>

                            <p>
                                Disponible jusqu'au :{" "}
                                {new Date(
                                    exam.endsAt
                                ).toLocaleString()}
                            </p>

                            <Link
                                to={`/student/exams/${exam.id}`}
                            >
                                Passer l'examen
                            </Link>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}