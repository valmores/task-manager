import apiClient from './client'
import type { Task, TaskInput } from '../types/task'

// Artificial latency added to every call so loading states stay visible.
// Set to 0 to disable.
const DELAY_MS = 1000

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// GET /tasks/
export const getTasks = async (): Promise<Task[]> => {
  await delay(DELAY_MS)
  const { data } = await apiClient.get<Task[]>('/tasks/')
  return data
}

// POST /tasks/
export const createTask = async ({ title, description }: TaskInput): Promise<Task> => {
  await delay(DELAY_MS)
  const { data } = await apiClient.post<Task>('/tasks/', {
    title,
    description: description || null,
  })
  return data
}

// PUT /tasks/{id}/ — title and description only
export const updateTask = async (
  id: number,
  { title, description }: TaskInput,
): Promise<Task> => {
  await delay(DELAY_MS)
  const { data } = await apiClient.put<Task>(`/tasks/${id}/`, {
    title,
    description: description || null,
  })
  return data
}

// PATCH /tasks/{id}/ — the API flips the completed flag, so no body is sent
export const toggleTask = async (id: number): Promise<Task> => {
  await delay(0)
  const { data } = await apiClient.patch<Task>(`/tasks/${id}/`)
  return data
}

// DELETE /tasks/{id}/
export const deleteTask = async (id: number): Promise<void> => {
  await delay(DELAY_MS)
  await apiClient.delete(`/tasks/${id}/`)
}
