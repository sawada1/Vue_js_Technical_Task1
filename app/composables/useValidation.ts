export const useValidation = (formData: any) => {
  const errors = ref<Record<string, string>>({})

const clearError = (field: string) => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
}

const getMinDate = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
}

const validate = () => {
  errors.value = {}

  if (!formData.value.title.trim()) {
    errors.value.title = 'Title is required'
  }

  if (!formData.value.description.trim()) {
    errors.value.description = 'Description is required'
  }

  if (!formData.value.status) {
    errors.value.status = 'Status is required'
  }

  if (!formData.value.dueDate) {
    errors.value.dueDate = 'Due date is required'
  } else {
    const dueDate = new Date(formData.value.dueDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (dueDate <= today) {
      errors.value.dueDate = 'Due date must be in the future'
    }
  }

  return Object.keys(errors.value).length === 0
}
  return {
    errors: errors,
    validate: validate,
    getMinDate: getMinDate,
    clearError: clearError,
  }
}
