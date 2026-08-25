
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import LoginPage from './pages/login/LoginPage';
import StudentLayout from './pages/student/StudentLayout';
import ExamList from './pages/student/ExamList';
import ExamTake from './pages/student/ExamTake';
import ExamSoubmission from './pages/student/ExamSoubmission';
import ResultHistory from './pages/student/ResultHistory';

export default function App() {
  const { token, logout } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Page de connexion (redirige vers /student si déjà connecté) */}
        <Route
          path="/"
          element={!token ? <LoginPage /> : <Navigate to="/student" replace />}
        />

        {/* Espace Étudiant (protégé par token) */}
        <Route
          path="/student"
          element={token ? <StudentLayout onLogout={logout} /> : <Navigate to="/" replace />}
        >
          {/* Accueil de l'espace étudiant (ExamHub) */}
          <Route index element={<ExamList />} />

          {/* Passer un examen spécifique */}
          <Route path="exams/:id" element={<ExamTake />} />

          {/* Résultat d'un examen soumis */}
          <Route path="exams/:id/result" element={<ExamSoubmission />} />

          {/* Mes résultats / Historique */}
          <Route path="results" element={<ResultHistory />} />
        </Route>

        {/* Redirection par défaut si l'URL n'existe pas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}