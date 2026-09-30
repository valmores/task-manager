import { Box, CircularProgress, Typography } from '@mui/material'

interface SpinnerProps {
  label?: string
}

function Spinner({ label = 'Loading...' }: SpinnerProps) {
  return (
    <Box
      role="status"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        py: 4,
      }}
    >
      <CircularProgress size={24} />
      <Typography color="text.secondary">{label}</Typography>
    </Box>
  )
}

export default Spinner
