import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import ErrorBanner from './components/ErrorBanner'
import Spinner from './components/Spinner'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { useTasks } from './hooks/useTasks'

type StatusFilter = 'all' | 'active' | 'completed'

function App() {
  const { data: tasks, isPending, isError, error } = useTasks()
  const [formOpen, setFormOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')

  const filteredTasks = tasks
    ? tasks.filter((task) => {
      const q = search.toLowerCase()
      const matchesSearch =
        task.title.toLowerCase().includes(q) ||
        (task.description ?? '').toLowerCase().includes(q)
      const matchesStatus =
        status === 'all' ||
        (status === 'completed' && task.completed) ||
        (status === 'active' && !task.completed)
      return matchesSearch && matchesStatus
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

      <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
        <TextField
          size="small"
          placeholder="Search tasks…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1 }}
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
        <Select
          size="small"
          value={status}
          onChange={(e) => setStatus(e.target.value as StatusFilter)}
          inputProps={{ 'aria-label': 'Task status filter' }}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </Box>

      {isPending && (
        <Box sx={{ py: 4 }}>
          <Spinner label="Loading tasks..." />
        </Box>
      )}
      {isError && <ErrorBanner message={error.message} />}
      {filteredTasks && (
        <Box sx={{ height: 'calc(100vh - 220px)', minHeight: 300 }}>
          <TaskList tasks={filteredTasks} />
        </Box>
      )}

      <TaskForm open={formOpen} onClose={() => setFormOpen(false)} />
    </Container>
  )
}

export default App
