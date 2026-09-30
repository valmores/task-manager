import { useState } from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ErrorBanner from './components/ErrorBanner'
import Spinner from './components/Spinner'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { useTasks } from './hooks/useTasks'

function App() {
  const { data: tasks, isPending, isError, error } = useTasks()
  const [formOpen, setFormOpen] = useState(false)

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          Task Manager
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setFormOpen(true)}>
          Add task
        </Button>
      </Box>

      {isPending && (
        <Box sx={{ py: 4 }}>
          <Spinner label="Loading tasks..." />
        </Box>
      )}
      {isError && <ErrorBanner message={error.message} />}
      {tasks && <TaskList tasks={tasks} />}

      <TaskForm open={formOpen} onClose={() => setFormOpen(false)} />
    </Container>
  )
}

export default App
