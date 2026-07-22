import type { CreateTaskPayload , TaskStatus } from '~/types/task.types'

export function useTaskHelpers() {
  function formatDate(date?: string) {
    if (!date) return '-'

  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'short'
  }).format(new Date(date))
  }

  function statusClass(status: string) {
    if (!status) return 'bg-slate-400'
    const s = status.toLowerCase()
    if (s.includes('pending')) return 'bg-yellow-500'
    if (s.includes('in progress') || s.includes('in_progress') || s.includes('progress')) return 'bg-blue-500'
    if (s.includes('done') || s.includes('completed') || s.includes('complete')) return 'bg-green-600'
    if (s.includes('error') || s.includes('fail')) return 'bg-red-500'
    return 'bg-slate-500'
  }

  function handleSubmitForm(
    mode: 'create' | 'edit',
    formData: { title: string; description: string; status: TaskStatus; createdAt: string },
    validate: () => boolean,
    onSubmit: (payload: CreateTaskPayload) => void
  ) {
    if (!validate()) {
      return false
    }

    onSubmit({
      title: formData.title,
      description: formData.description,
      status: formData.status,
      createdAt: formData.createdAt || null
    })

    return true
  }

  return {
    formatDate,
    statusClass,
    handleSubmitForm
  }
}
