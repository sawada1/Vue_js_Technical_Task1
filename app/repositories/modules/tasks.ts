import { Factory } from '../factory'
import type { Task } from '~/types/task.types'

export class TaskRepository extends Factory<Task> {
  // these function are not used in the app just for example
  
  search(title: string) {
    return this.api<Task[]>(this.endpoint, {
      query: {
        title
      }
    })
  }

  filter(status: string) {
    return this.api<Task[]>(this.endpoint, {
      query: {
        status
      }
    })
  }

}