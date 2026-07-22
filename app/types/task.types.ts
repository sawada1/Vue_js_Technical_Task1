
export interface Task {
  id: number
  title: string
  description: string
  status: TaskStatus
  createdAt: string
  updatedAt: string
}


export type TaskStatus = 'Pending' | 'In Progress' | 'Done'


export interface CreateTaskPayload {
  title: string
  description: string
  status: TaskStatus
  createdAt: string | null
}


export interface UpdateTaskPayload {
  title?: string
  description?: string
  status?: TaskStatus
  createdAt?: string | null
}


export interface TaskFilters {
  status: TaskStatus | 'All'

}
