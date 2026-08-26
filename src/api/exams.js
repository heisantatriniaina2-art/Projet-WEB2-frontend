import { client } from './client';

export const getExams = () => client.get('/exams');
export const getExamResults = (id) => client.get(`/exams/${id}/results`);