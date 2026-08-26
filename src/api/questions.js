
import { client } from './client';

export const getQuestionsByExam = (examId) => client.get(`/exams/${examId}/questions`);