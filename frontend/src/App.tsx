import { useState } from 'react'
import { Box, Button, Container, InputAdornment, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import ErrorBanner from './components/ErrorBanner'
import Spinner from './components/Spinner'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { useTasks } from './hooks/useTasks'

function App() {
  const { data: tasks, isPending, isError, error } = useTasks()
  const [formOpen, setFormOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filteredTasks = tasks
    ? tasks.filter((task) => {
        const q = search.toLowerCase()
        return (
          task.title.toLowerCase().includes(q) ||
          (task.description ?? '').toLowerCase().includes(q)
        )
      })
    : undefined

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

      <TextField
        fullWidth
        size="small"
        placeholder="Search tasks…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />

      {isPending && (
        <Box sx={{ py: 4 }}>
          <Spinner label="Loading tasks..." />
        </Box>
      )}
      {isError && <ErrorBanner message={error.message} />}
      {filteredTasks && (
        <Box sx={{ height: 'calc(100vh - 230px)', minHeight: 300 }}>
          <TaskList tasks={filteredTasks} />
        </Box>
      )}

      <TaskForm open={formOpen} onClose={() => setFormOpen(false)} />
    </Container>
  )
}

export default App
