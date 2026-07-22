import { defineStore } from 'pinia'
import type { Task, TaskFilters, UpdateTaskPayload , CreateTaskPayload } from '../types/task.types'
import { useRepositories } from '~/repositories'

export const useTaskStore = defineStore('task', () => {
  // State
  const { taskRepository } = useRepositories()
  const notifier = useNotifier()
  const tasks = ref<Task[]>([])
  const currentTask = ref<Task | null>(null)
  const selectedTask = ref<Task | null>(null)
  const filters = ref<TaskFilters>({
    status: 'All',
  })
  const searchQuery = ref<string>('')
  const loading = ref<boolean>(true)
  const error = ref<string | null>(null)
  const taskCount = computed<number>(() => tasks.value.length)

  // Getters
  const filteredTasks = computed<Task[]>(() => {
    let result = [...tasks.value]

    // Apply status filter
    if (filters.value.status !== 'All') {
      result = result.filter(task => task.status === filters.value.status)
    }

    // Apply search filter
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(task =>
        task.title.toLowerCase().includes(query)
      )
    }

    return result
  })

  // Actions
  async function fetchTasks(refetch:boolean = false) {
    error.value = null
    if(tasks.value.length > 0 && !refetch) {
      return
    }
    try {
      const apiTasks = await taskRepository.getAll()
      tasks.value = apiTasks
    } catch (err) {
      error.value = 'Failed to fetch tasks'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchTask(id: number) {
    error.value = null
    try {
      const task = await taskRepository.getById(id)
      currentTask.value = task
      return task
    } catch (err) {
      error.value = 'Failed to fetch task'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createTask(payload: CreateTaskPayload) {
    loading.value = true
    error.value = null
    try {
      const newTask = await taskRepository.create(payload)
      tasks.value.push(newTask)
      notifier.success('Task created successfully')
    } catch (err) {
      error.value = 'Failed to create task'
      notifier.error('Failed to create task')
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateTask(id: number, payload: UpdateTaskPayload) {
    loading.value = true
    error.value = null
    try {
      const updatedTask = await taskRepository.update(id, payload)
      tasks.value = tasks.value.map(t => t.id === id ? updatedTask : t);
      currentTask.value = updatedTask
      notifier.success('Task updated successfully')
    } catch (err) {
      error.value = 'Failed to update task'
      notifier.error('Failed to update task')
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteTask(id: number) {
    loading.value = true
    error.value = null
    try {
      await taskRepository.delete(id)
      tasks.value = tasks.value.filter(task => task.id !== id)
      notifier.success('Task deleted successfully')
    } catch (err) {
      error.value = 'Failed to delete task'
      notifier.error('Failed to delete task')
      throw err
    } finally {
      loading.value = false
    }
  }

  function setFilters(newFilters: Partial<TaskFilters>) {
    filters.value = { ...filters.value, ...newFilters }
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }



  return {
    // State
    tasks,
    selectedTask,
    filters,
    searchQuery,
    loading,
    error,
    currentTask,

    // Getters
    filteredTasks,
    taskCount,

    // Actions
    fetchTasks,
    fetchTask,
    createTask,
    updateTask,
    deleteTask,
    setFilters,
    setSearchQuery,
  }
})
