import { Box, Stack, Typography } from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment'
import type { Task } from '../types/task'
import TaskCard from './TaskCard'

interface TaskListProps {
  tasks: Task[]
}

function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>
        <AssignmentIcon sx={{ fontSize: 48, mb: 1 }} />
        <Typography>No tasks yet.</Typography>
      </Box>
    )
  }

  return (
    <Stack spacing={1.5}>
      {tasks?.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Stack>
  )
}

export default TaskList
