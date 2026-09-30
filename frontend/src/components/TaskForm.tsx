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
import { useCreateTask } from '../hooks/useTasks'
import Spinner from './Spinner'

interface TaskFormProps {
  open: boolean
  onClose: () => void
}

function TaskForm({ open, onClose }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [titleTouched, setTitleTouched] = useState(false)
  const createTask = useCreateTask()
  const titleError = titleTouched && !title.trim()

  const handleClose = () => {
    setTitle('')
    setDescription('')
    setTitleTouched(false)
    createTask.reset()
    onClose()
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      setTitleTouched(true)
      return
    }

    createTask.mutate(
      { title: trimmedTitle, description: description.trim() },
      { onSuccess: handleClose },
    )
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <form onSubmit={handleSubmit} noValidate>
        <DialogTitle
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            textAlign: 'center',
          }}
        >
          New task
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 3 }}>
            {createTask.isError && (
              <ErrorBanner message={createTask.error.message} onDismiss={createTask.reset} />
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
          <Button onClick={handleClose} disabled={createTask.isPending}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!title.trim() || createTask.isPending}
          >
            {createTask.isPending ? <Spinner label="Saving" size={15} /> : 'Add task'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default TaskForm
