    import { Link, useNavigate } from "react-router-dom";
    import { useAuth } from "../contexts/AuthContext";

    function AdminNavbar() {

        const navigate = useNavigate();
        const { user, logout } = useAuth();

        const handleLogout = () => {
            logout();
            navigate("/login");
        };

        return (
            <header className="dashboard-header">

                <div className="logo">
                    <h1>ExamHub</h1>
                </div>

                <nav className="navbar">

                    <Link to="/admin">
                        Home
                    </Link>

                    <Link to="/admin/students">
                        Students
                    </Link>

                    <Link to="/admin/courses">
                        Courses
                    </Link>

                    <Link to="/admin/exams">
                        Exams
                    </Link>

                    <span>
                        {user?.firstName || user?.email}
                    </span>

                    <button onClick={handleLogout}>
                        Log out
                    </button>

                </nav>

            </header>
        );
    }

    export default AdminNavbar;