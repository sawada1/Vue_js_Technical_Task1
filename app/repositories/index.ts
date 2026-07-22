import { TaskRepository } from './modules/tasks'

export const useRepositories = () => {
  const { $api } = useNuxtApp()

  return {
    taskRepository: new TaskRepository($api, '/tasks')
  }
}