// Shape returned by the Django API.
export interface Task {
  id: number
  title: string
  description: string | null
  completed: boolean
  created_at: string
}

// Fields the user can set when creating or editing a task.
export interface TaskInput {
  title: string
  description?: string
}
