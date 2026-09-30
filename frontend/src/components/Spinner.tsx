import { Box, CircularProgress, Typography } from '@mui/material'

interface SpinnerProps {
  label?: string
  size?: number
}

function Spinner({ label, size = 24 }: SpinnerProps) {
  return (
    <Box
      role="status"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
      }}
    >
      <CircularProgress size={size} />
      {label && <Typography color="text.secondary">{label}</Typography>}
    </Box>
  )
}

export default Spinner
