import { apiFetch } from "./client";

export async function getExams() {
    return apiFetch("/exams");
}

export async function getExam(id) {
    return apiFetch(`/exams/${id}`);
}

export async function createExam(exam) {
    return apiFetch("/exams", {
        method: "POST",
        body: exam,
    });
}

export async function updateExam(id, exam) {
    return apiFetch(`/exams/${id}`, {
        method: "PUT",
        body: exam,
    });
}

export async function deleteExam(id) {
    return apiFetch(`/exams/${id}`, {
        method: "DELETE",
    });
}