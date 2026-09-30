import axios from 'axios'

// Base URL of the Django API, e.g. http://localhost:8000/api
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' },
})

export default apiClient
