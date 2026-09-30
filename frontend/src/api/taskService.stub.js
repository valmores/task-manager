import { stubTasks } from '../data/stubTasks'

const DELAY_MS = 500

// Set to true to make every call fail, to test the error UI.
const SIMULATE_ERROR = false

let tasks = stubTasks.map((task) => ({ ...task }))
let nextId = Math.max(...tasks.map((task) => task.id)) + 1

const respond = (getValue) =>
  new Promise((resolve, reject) => {
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

const findTask = (id) => {
  const task = tasks.find((item) => item.id === Number(id))
  if (!task) throw new Error('Task not found')
  return task
}

// GET /tasks/
export const getTasks = () => respond(() => tasks.map((task) => ({ ...task })))

// POST /tasks/
export const createTask = ({ title, description }) =>
  respond(() => {
    const task = {
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
export const updateTask = (id, { title, description }) =>
  respond(() => {
    const task = findTask(id)
    task.title = title
    task.description = description || null
    return { ...task }
  })

// PATCH /tasks/{id}/ — flips the completed flag
export const toggleTask = (id) =>
  respond(() => {
    const task = findTask(id)
    task.completed = !task.completed
    return { ...task }
  })

// DELETE /tasks/{id}/
export const deleteTask = (id) =>
  respond(() => {
    findTask(id)
    tasks = tasks.filter((task) => task.id !== Number(id))
  })
