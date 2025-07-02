// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  // A URL base da sua API backend
  baseURL: 'http://localhost:3000/api', 
});

export default api;