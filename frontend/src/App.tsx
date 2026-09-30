import { Container, Typography } from '@mui/material'
import ErrorBanner from './components/ErrorBanner'
import Spinner from './components/Spinner'
import TaskList from './components/TaskList'
import { useTasks } from './hooks/useTasks'

function App() {
  const { data: tasks, isPending, isError, error } = useTasks()

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Task Manager
      </Typography>

      {isPending && <Spinner label="Loading tasks..." />}
      {isError && <ErrorBanner message={error.message} />}
      {tasks && <TaskList tasks={tasks} />}
    </Container>
  )
}

export default App
