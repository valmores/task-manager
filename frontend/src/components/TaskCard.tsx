import { Box, Checkbox, Paper, Typography } from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import type { Task } from '../types/task'

interface TaskCardProps {
  task: Task
}

function TaskCard({ task }: TaskCardProps) {
  const { title, description, completed, created_at } = task

  return (
    <Paper
      variant="outlined"
      sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, px: 1, py: 1.5 }}
    >
      <Checkbox checked={completed} disabled sx={{ p: 0.5 }} />
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
      </Box>
    </Paper>
  )
}

export default TaskCard
