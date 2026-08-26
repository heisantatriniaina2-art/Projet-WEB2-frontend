import { useEffect, useState } from "react";
import { apiFetch } from "../../api/client";
import { useAuth } from "../../contexts/AuthContext";

export default function Results() {
    const { token } = useAuth();

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadResults = async () => {
            try {
                const data = await apiFetch("/my/results", {
                    token
                });

                setResults(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadResults();
    }, [token]);

    if (loading) {
        return <p>Chargement des résultats...</p>;
    }

    return (
        <div>
            <h1>Mes résultats</h1>

            {error && (
                <p role="alert">
                    {error}
                </p>
            )}

            {!error && results.length === 0 && (
                <p>
                    Vous n'avez encore aucun résultat.
                </p>
            )}

            {results.length > 0 && (
                <ul>
                    {results.map((result) => (
                        <li key={result.id}>

                            <h2>{result.examTitle}</h2>

                            <p>
                                Score : {result.score}
                            </p>

                            <p>
                                Date :{" "}
                                {new Date(
                                    result.submittedAt
                                ).toLocaleString()}
                            </p>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}