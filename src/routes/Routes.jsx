import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";

import StudentDashboard from "../pages/student/Dashboard";
import StudentExams from "../pages/student/Exams";
import ExamTake from "../pages/student/ExamTake";
import StudentResults from "../pages/student/Results";

export default function AppRoutes() {
  return (
    <Routes>
      {}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {}
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/student/exams" element={<StudentExams />} />
      <Route path="/student/exams/:id/take" element={<ExamTake />} />
      <Route path="/student/results" element={<StudentResults />} />
    </Routes>
  );
}