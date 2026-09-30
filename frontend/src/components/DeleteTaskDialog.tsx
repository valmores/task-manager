import {
  alpha,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
} from '@mui/material'
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorBanner from './ErrorBanner'
import Spinner from './Spinner'
import { useDeleteTask } from '../hooks/useTasks'
import type { Task } from '../types/task'

interface DeleteTaskDialogProps {
  open: boolean
  onClose: () => void
  task: Task
}

function DeleteTaskDialog({ open, onClose, task }: DeleteTaskDialogProps) {
  const deleteTask = useDeleteTask()

  const handleClose = () => {
    deleteTask.reset()
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      slotProps={{ paper: { 'aria-label': 'Delete task' } }}
    >
      <DialogContent>
        <Stack sx={{ pt: 1, alignItems: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 60,
              height: 60,
              borderRadius: '50%',
              color: 'error.main',
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.2),
            }}
          >
            <WarningAmberIcon fontSize="large" />
          </Box>
          {deleteTask.isError && (
            <ErrorBanner message={deleteTask.error.message} onDismiss={deleteTask.reset} />
          )}
          <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }}>
            Delete this task?
          </Typography>
          <Box
            sx={{
              maxWidth: '100%',
              px: 2,
              py: 1,
              borderRadius: 1,
              bgcolor: 'action.hover',
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, textAlign: 'center', wordBreak: 'break-word' }}
            >
              {task.title}
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} disabled={deleteTask.isPending}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => deleteTask.mutate(task.id, { onSuccess: handleClose })}
          disabled={deleteTask.isPending}
        >
          {deleteTask.isPending ? <Spinner label="Deleting" size={15} /> : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteTaskDialog
