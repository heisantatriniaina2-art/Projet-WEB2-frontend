import { Link, useNavigate } from "react-router-dom";

export default function StudentNavbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <header className="student-navbar">
            <div className="student-logo">
                <h1>ExamHub</h1>
            </div>

            <nav>
                <Link to="/student">
                    Home
                </Link>

                <Link to="/student/exams">
                    Mes exams
                </Link>

                <Link to="/student/results">
                    My results
                </Link>

                <button onClick={handleLogout}>
                    Log out
                </button>
            </nav>
        </header>
    );
}