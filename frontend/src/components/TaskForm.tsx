import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material'
import ErrorBanner from './ErrorBanner'
import { useCreateTask, useUpdateTask } from '../hooks/useTasks'
import Spinner from './Spinner'
import type { Task } from '../types/task'

interface TaskFormProps {
  open: boolean
  onClose: () => void
  // When provided, the form edits this task instead of creating a new one.
  task?: Task
}

function TaskForm({ open, onClose, task }: TaskFormProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <TaskFormContent task={task} onClose={onClose} />
    </Dialog>
  )
}

// Mounted only while the dialog is open, so its state starts fresh every time.
function TaskFormContent({ task, onClose }: Pick<TaskFormProps, 'task' | 'onClose'>) {
  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [titleTouched, setTitleTouched] = useState(false)
  const createTask = useCreateTask()
  const updateTask = useUpdateTask()

  const isEditing = task !== undefined
  const mutation = isEditing ? updateTask : createTask
  const titleError = titleTouched && !title.trim()
  const unchanged =
    isEditing &&
    title.trim() === task.title &&
    description.trim() === (task.description ?? '')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      setTitleTouched(true)
      return
    }

    const data = { title: trimmedTitle, description: description.trim() }
    if (isEditing) {
      updateTask.mutate({ id: task.id, ...data }, { onSuccess: onClose })
    } else {
      createTask.mutate(data, { onSuccess: onClose })
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <DialogTitle
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          textAlign: 'center',
        }}
      >
        {isEditing ? 'Edit task' : 'New task'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 3 }}>
          {mutation.isError && (
            <ErrorBanner message={mutation.error.message} onDismiss={mutation.reset} />
          )}
          <TextField
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            onBlur={() => setTitleTouched(true)}
            error={titleError}
            helperText={titleError ? 'Title is required' : ' '}
            autoFocus
            fullWidth
          />
          <TextField
            label="Description (optional)"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            multiline
            minRows={3}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={mutation.isPending}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={!title.trim() || unchanged || mutation.isPending}
        >
          {mutation.isPending ? (
            <Spinner label="Saving" size={15} />
          ) : isEditing ? (
            'Save'
          ) : (
            'Add task'
          )}
        </Button>
      </DialogActions>
    </form>
  )
}

export default TaskForm
