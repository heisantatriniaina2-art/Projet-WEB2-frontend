const API_URL = "http://localhost:3001/api";

export const getAvailableExams = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/my/exams`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Impossible de récupérer les examens");
    }

    return data;
};