import { Alert } from '@mui/material'

interface ErrorBannerProps {
  message: string
  onDismiss?: () => void
}

function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <Alert severity="error" onClose={onDismiss}>
      {message}
    </Alert>
  )
}

export default ErrorBanner
