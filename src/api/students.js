import { client } from './client';

export const getStudents = () => client.get('/students');