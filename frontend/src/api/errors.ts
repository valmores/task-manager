import axios from 'axios'

// "created_at" -> "Created at"
const formatFieldName = (field: string) => {
  const words = field.replace(/_/g, ' ')
  return words.charAt(0).toUpperCase() + words.slice(1)
}

// Turns DRF field errors like { title: ["This field may not be blank."] }
// into "Title: This field may not be blank."
const formatFieldErrors = (data: Record<string, unknown>) =>
  Object.entries(data)
    .map(([field, messages]) => {
      const text = Array.isArray(messages) ? messages.join(' ') : String(messages)
      return field === 'non_field_errors' ? text : `${formatFieldName(field)}: ${text}`
    })
    .join(' ')

// Converts whatever a failed request throws into a message safe to show the user.
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return 'Unable to reach the server. Please check your connection and try again.'
    }

    const { status, data } = error.response

    if (data && typeof data === 'object' && !Array.isArray(data)) {
      // { "error": "Task not found" } or DRF's { "detail": "..." }
      const message = (data as { error?: unknown; detail?: unknown }).error ??
        (data as { detail?: unknown }).detail
      if (typeof message === 'string') return message

      const fieldErrors = formatFieldErrors(data as Record<string, unknown>)
      if (fieldErrors) return fieldErrors
    }

    if (status >= 500) return 'Something went wrong on the server. Please try again later.'
    return `Request failed with status ${status}.`
  }

  if (error instanceof Error) return error.message
  return 'Something went wrong. Please try again.'
}
