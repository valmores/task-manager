import { Container, Typography } from '@mui/material'

function App() {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Task Manager
      </Typography>
    </Container>
  )
}

export default App
