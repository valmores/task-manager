import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: { main: '#4f46e5' },
    background: { default: '#f4f5f7' },
  },
  typography: {
    fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
  },
  shape: { borderRadius: 8 },
})

export default theme
