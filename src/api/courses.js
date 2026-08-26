import { apiFetch } from "./client";

export async function getCourses() {
    return apiFetch("/courses");
}

export async function createCourse(course) {
    return apiFetch("/courses", {
        method: "POST",
        body: course,
    });
}

export async function updateCourse(id, course) {
    return apiFetch(`/courses/${id}`, {
        method: "PUT",
        body: course,
    });
}

export async function deleteCourse(id) {
    return apiFetch(`/courses/${id}`, {
        method: "DELETE",
    });
}