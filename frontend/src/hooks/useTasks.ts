import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createTask,
  deleteTask,
  getTasks,
  toggleTask,
  updateTask,
} from '../api/taskService'
import type { TaskInput } from '../types/task'

const TASKS_KEY = ['tasks']

export function useTasks() {
  return useQuery({ queryKey: TASKS_KEY, queryFn: getTasks })
}

// Runs a mutation, then refetches the task list so the UI stays in sync.
function useTaskMutation<TVariables, TData>(
  mutationFn: (variables: TVariables) => Promise<TData>,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TASKS_KEY }),
  })
}

export const useCreateTask = () => useTaskMutation(createTask)

export const useUpdateTask = () =>
  useTaskMutation(({ id, ...data }: { id: number } & TaskInput) =>
    updateTask(id, data),
  )

export const useToggleTask = () => useTaskMutation(toggleTask)

export const useDeleteTask = () => useTaskMutation(deleteTask)
