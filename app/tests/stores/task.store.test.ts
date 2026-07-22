import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useTaskStore } from '~/stores/task.store'

vi.mock('~/repositories', () => ({
  useRepositories: () => ({
    taskRepository: {
      getAll: vi.fn().mockResolvedValue([
        {
          id: '1',
          title: 'Test task',
          description: 'A task for testing',
          status: 'Pending',
          dueDate: null,
          createdAt: '2026-01-01T00:00:00Z',
          updatedAt: '2026-01-01T00:00:00Z'
        }
      ]),
      getById: vi.fn().mockResolvedValue({
        id: '1',
        title: 'Test task',
        description: 'A task for testing',
        status: 'Pending',
        dueDate: null,
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: '2026-01-01T00:00:00Z'
      }),
      create: vi.fn().mockResolvedValue({
        id: '2',
        title: 'New task',
        description: 'Created by test',
        status: 'Pending',
        dueDate: null,
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: '2026-01-01T00:00:00Z'
      }),
      update: vi.fn().mockResolvedValue({
        id: '1',
        title: 'Test task updated',
        description: 'Updated by test',
        status: 'Done',
        dueDate: null,
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: '2026-01-01T00:00:00Z'
      }),
      delete: vi.fn().mockResolvedValue(undefined)
    }
  })
}))

vi.mock('~/composables/useNotifier', () => ({
  useNotifier: () => ({
    success: vi.fn(),
    error: vi.fn()
  })
}))

describe('task store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('starts with default state', () => {
    const store = useTaskStore()

    expect(store.tasks).toEqual([])
    expect(store.error).toBeNull()
    expect(store.filters.status).toBe('All')
    expect(store.searchQuery).toBe('')
    expect(store.loading).toBe(true)
  })

  it('fetches tasks and updates state', async () => {
    const store = useTaskStore()

    await store.fetchTasks()

    expect(store.tasks).toHaveLength(1)
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })
})
