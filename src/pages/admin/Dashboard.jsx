import { Link } from "react-router-dom"

function Dashboard() {
    return (
        <div>
            <h1>examHub</h1>

            <h2>Tableau de bord</h2>

            <div>
                <h3>Étudiants</h3>
                <p>25</p>
            </div>

            <div>
                <h3>Cours</h3>
                <p>5</p>
            </div>

            <div>
                <h3>Examens</h3>
                <p>8</p>
            </div>

            <h2>Liens rapides</h2>

            <div>
                <Link to="/admin/students">
                    Gérer les étudiants
                </Link>
            </div>

            <div>
                <Link to="/admin/courses">
                    Gérer les cours
                </Link>
            </div>

            <div>
                <Link to="/admin/exams">
                    Gérer les examens
                </Link>
            </div>
        </div>
    )
}

export default Dashboard