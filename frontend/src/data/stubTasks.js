// Mirrors the shape returned by the Django API, newest first.
export const stubTasks = [
  {
    id: 4,
    title: 'Write README',
    description: null,
    completed: false,
    created_at: '2026-09-30T09:45:00.000000Z',
  },
  {
    id: 3,
    title: 'Build the task list UI',
    description: 'Display tasks with loading, empty and error states.',
    completed: false,
    created_at: '2026-09-30T09:30:00.000000Z',
  },
  {
    id: 2,
    title: 'Implement Task ViewSet',
    description: 'List, create, retrieve, update, toggle and delete endpoints.',
    completed: true,
    created_at: '2026-09-29T14:10:00.000000Z',
  },
  {
    id: 1,
    title: 'Set up Django project',
    description: 'Create the tasks app and configure DRF and CORS.',
    completed: true,
    created_at: '2026-09-29T10:00:00.000000Z',
  },
]
