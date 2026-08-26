import { apiFetch } from "./client";

export async function getStudents() {
    return apiFetch("/students");
}

export async function getStudent(id) {
    return apiFetch(`/students/${id}`);
}

export async function createStudent(student) {
    return apiFetch("/students", {
        method: "POST",
        body: student,
    });
}

export async function updateStudent(id, student) {
    return apiFetch(`/students/${id}`, {
        method: "PUT",
        body: student,
    });
}

export async function resetStudentPassword(id, password) {
    return apiFetch(`/students/${id}/reset-password`, {
        method: "POST",
        body: { password },
    });
}

export async function disableStudent(id) {
    return apiFetch(`/students/${id}/disable`, {
        method: "PATCH",
    });
}