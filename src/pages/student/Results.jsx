import { Link, useLocation } from "react-router-dom";

export default function Results() {
    const location = useLocation();

    const result = location.state?.result;

    if (!result) {
        return (
            <div className="results-page">

                <header className="dashboard-header">
                    <div className="logo">
                        <h1>Exam Hub</h1>
                    </div>

                    <nav className="navbar">
                        <Link to="/student">
                            Tableau de bord
                        </Link>

                        <Link to="/student/exams">
                            Examens
                        </Link>

                        <Link
                            to="/student/results"
                            className="active"
                        >
                            Résultats
                        </Link>
                    </nav>
                </header>

                <main className="results-content">
                    <h2>Aucun résultat</h2>

                    <p>
                        Vous n'avez pas encore terminé d'examen.
                    </p>

                    <Link to="/student/exams">
                        Voir les examens
                    </Link>
                </main>

            </div>
        );
    }

    return (
        <div className="results-page">

            <header className="dashboard-header">
                <div className="logo">
                    <h1>Exam Hub</h1>
                </div>

                <nav className="navbar">
                    <Link to="/student">
                        Tableau de bord
                    </Link>

                    <Link to="/student/exams">
                        Examens
                    </Link>

                    <Link
                        to="/student/results"
                        className="active"
                    >
                        Résultats
                    </Link>
                </nav>
            </header>

            <main className="results-content">

                <h2>Résultat de l'examen</h2>

                <div className="result-card">

                    <h3>
                        {result.exam_title || "Examen terminé"}
                    </h3>

                    <div className="score">
                        <span>Votre note</span>

                        <strong>
                            {result.score ?? 0}
                        </strong>
                    </div>

                    {result.total_points !== undefined && (
                        <p>
                            Sur un total de{" "}
                            <strong>
                                {result.total_points}
                            </strong>{" "}
                            point(s)
                        </p>
                    )}

                    {result.percentage !== undefined && (
                        <p>
                            Pourcentage :{" "}
                            <strong>
                                {result.percentage}%
                            </strong>
                        </p>
                    )}

                    <Link
                        to="/student/exams"
                        className="back-exams-button"
                    >
                        Retour aux examens
                    </Link>

                </div>

            </main>

        </div>
    );
}