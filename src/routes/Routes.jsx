import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/student/Dashboars";
import Exams from "../pages/student/Exams";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Dashboard />} />

                <Route
                    path="/student"
                    element={<Dashboard />}
                />

                <Route
                    path="/student/exams"
                    element={<Exams />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;