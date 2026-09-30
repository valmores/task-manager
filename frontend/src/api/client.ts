import axios from 'axios'
import { getErrorMessage } from './errors'

// Base URL of the Django API, e.g. http://localhost:8000/api
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' },
})

// Failed requests reject with a plain Error carrying a readable message,
// so the UI can show `error.message` without knowing about Axios.
apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(new Error(getErrorMessage(error))),
)

export default apiClient
