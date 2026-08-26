import { Routes, Route, Navigate } from "react-router-dom";

// Login
import Login from "../pages/Login";

// Student
import StudentDashboard from "../pages/student/Dashboard";
import StudentExams from "../pages/student/Exams";
import ExamTake from "../pages/student/ExamTake";
import StudentResults from "../pages/student/Results";

// Admin
import AdminDashboard from "../pages/admin/Dashboard";
import Students from "../pages/admin/Students";
import Courses from "../pages/admin/Courses";
import AdminExams from "../pages/admin/Exams";
import Questions from "../pages/admin/Questions";

export default function AppRoutes() {
    return (
        <Routes>

            {/* Accueil */}
            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            {/* Login */}
            <Route
                path="/login"
                element={<Login />}
            />

            {/* ================= STUDENT ================= */}

            <Route
                path="/student"
                element={<StudentDashboard />}
            />

            <Route
                path="/student/exams"
                element={<StudentExams />}
            />

            <Route
                path="/student/exams/:id/take"
                element={<ExamTake />}
            />

            <Route
                path="/student/results"
                element={<StudentResults />}
            />

            {/* ================= ADMIN ================= */}

            <Route
                path="/admin"
                element={<AdminDashboard />}
            />

            <Route
                path="/admin/students"
                element={<Students />}
            />

            <Route
                path="/admin/courses"
                element={<Courses />}
            />

            <Route
                path="/admin/exams"
                element={<AdminExams />}
            />

            <Route
                path="/admin/exams/:id/questions"
                element={<Questions />}
            />

        </Routes>
    );
}