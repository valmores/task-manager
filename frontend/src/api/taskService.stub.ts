import { stubTasks } from '../data/stubTasks'
import type { Task, TaskInput } from '../types/task'

const DELAY_MS = 500

// Set to true to make every call fail, to test the error UI.
const SIMULATE_ERROR = false

let tasks: Task[] = stubTasks.map((task) => ({ ...task }))
let nextId = Math.max(...tasks.map((task) => task.id)) + 1

const respond = <T>(getValue: () => T) =>
  new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      if (SIMULATE_ERROR) {
        reject(new Error('Simulated network error'))
        return
      }
      try {
        resolve(getValue())
      } catch (error) {
        reject(error)
      }
    }, DELAY_MS)
  })

const findTask = (id: number) => {
  const task = tasks.find((item) => item.id === id)
  if (!task) throw new Error('Task not found')
  return task
}

// GET /tasks/
export const getTasks = (): Promise<Task[]> =>
  respond(() => tasks.map((task) => ({ ...task })))

// POST /tasks/
export const createTask = ({ title, description }: TaskInput) =>
  respond(() => {
    const task: Task = {
      id: nextId++,
      title,
      description: description || null,
      completed: false,
      created_at: new Date().toISOString(),
    }
    tasks = [task, ...tasks]
    return { ...task }
  })

// PUT /tasks/{id}/ — title and description only
export const updateTask = (id: number, { title, description }: TaskInput) =>
  respond(() => {
    const task = findTask(id)
    task.title = title
    task.description = description || null
    return { ...task }
  })

// PATCH /tasks/{id}/ — flips the completed flag
export const toggleTask = (id: number) =>
  respond(() => {
    const task = findTask(id)
    task.completed = !task.completed
    return { ...task }
  })

// DELETE /tasks/{id}/
export const deleteTask = (id: number) =>
  respond(() => {
    findTask(id)
    tasks = tasks.filter((task) => task.id !== id)
  })
