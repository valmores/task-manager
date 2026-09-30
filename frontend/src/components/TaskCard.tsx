import { useState } from 'react'
import { Box, Checkbox, IconButton, Paper, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { useToggleTask } from '../hooks/useTasks'
import DeleteTaskDialog from './DeleteTaskDialog'
import TaskForm from './TaskForm'
import type { Task } from '../types/task'

interface TaskCardProps {
  task: Task
}

function TaskCard({ task }: TaskCardProps) {
  const { id, title, description, completed, created_at } = task
  const toggleTask = useToggleTask()
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <Paper
      variant="outlined"
      sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, px: 1, py: 1.5 }}
    >
      <Checkbox
        checked={completed}
        color="success"
        onChange={() => toggleTask.mutate(id)}
        disabled={toggleTask.isPending}
        slotProps={{ input: { 'aria-label': `Mark "${title}" as completed` } }}
        sx={{ p: 0.5 }}
      />
      <Box sx={{ flex: 1, minWidth: 0, pt: 0.25 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            lineHeight: 1.4,
            textDecoration: completed ? 'line-through' : 'none',
            color: completed ? 'text.disabled' : 'text.primary',
          }}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: '0.8125rem', mt: 0.25, mb: 0.5 }}
          >
            {description}
          </Typography>
        )}
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.disabled' }}
        >
          <CalendarTodayIcon sx={{ fontSize: 14 }} />
          <Typography variant="caption">
            {new Date(created_at).toLocaleDateString()}
          </Typography>
        </Box>
        {toggleTask.isError && (
          <Typography variant="caption" color="error" sx={{ display: 'block', mt: 0.5 }}>
            {toggleTask.error.message}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex' }}>
        <IconButton
          size="small"
          onClick={() => setEditOpen(true)}
          aria-label={`Edit "${title}"`}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={() => setDeleteOpen(true)}
          aria-label={`Delete "${title}"`}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
      <TaskForm open={editOpen} onClose={() => setEditOpen(false)} task={task} />
      <DeleteTaskDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        task={task}
      />
    </Paper>
  )
}

export default TaskCard
