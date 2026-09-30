import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Pagination } from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment'
import type { Task } from '../types/task'
import TaskCard from './TaskCard'

const TASKS_PER_PAGE = 7

interface TaskListProps {
  tasks: Task[]
}

function TaskList({ tasks }: TaskListProps) {
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(tasks.length / TASKS_PER_PAGE)
  const paginatedTasks = tasks.slice(
    (page - 1) * TASKS_PER_PAGE,
    page * TASKS_PER_PAGE,
  )

  // Reset to page 1 when tasks change (e.g. filtering)
  useEffect(() => {
    setPage(1)
  }, [tasks])

  if (tasks.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>
        <AssignmentIcon sx={{ fontSize: 48, mb: 1 }} />
        <Typography>No tasks yet.</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Stack spacing={1.5} sx={{ flex: 1 }}>
        {paginatedTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Stack>

      <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'center', pt: 2 }}>
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_e, value) => setPage(value)}
            color="primary"
            shape="rounded"
          />
        )}
      </Box>
    </Box>
  )
}

export default TaskList
