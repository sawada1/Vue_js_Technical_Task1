import { describe, expect, it, vi } from 'vitest'
import { TaskRepository } from '~/repositories/modules/tasks'

describe('TaskRepository', () => {
  it('calls api with the right endpoint for getAll', async () => {
    const fetchMock = vi.fn().mockResolvedValue([{ id: '1', title: 'Repo task' }])
    const repo = new TaskRepository(fetchMock as any, '/tasks')

    const result = await repo.getAll()

    expect(fetchMock).toHaveBeenCalledWith('/tasks')
    expect(result).toEqual([{ id: '1', title: 'Repo task' }])
  })

  it('calls api with the right endpoint for getById', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ id: '1', title: 'Repo task' })
    const repo = new TaskRepository(fetchMock as any, '/tasks')

    const result = await repo.getById(1)

    expect(fetchMock).toHaveBeenCalledWith('/tasks/1')
    expect(result).toEqual({ id: '1', title: 'Repo task' })
  })

  it('calls api with POST and body for create', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ id: '2', title: 'Created task' })
    const repo = new TaskRepository(fetchMock as any, '/tasks')

    const payload = { title: 'New task' }
    const result = await repo.create(payload)

    expect(fetchMock).toHaveBeenCalledWith('/tasks', {
      method: 'POST',
      body: payload
    })
    expect(result).toEqual({ id: '2', title: 'Created task' })
  })

  it('calls api with PUT and body for update', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ id: '1', title: 'Updated task' })
    const repo = new TaskRepository(fetchMock as any, '/tasks')

    const payload = { title: 'Updated task' }
    const result = await repo.update(1, payload)

    expect(fetchMock).toHaveBeenCalledWith('/tasks/1', {
      method: 'PUT',
      body: payload
    })
    expect(result).toEqual({ id: '1', title: 'Updated task' })
  })

  it('calls api with DELETE for delete', async () => {
    const fetchMock = vi.fn().mockResolvedValue(undefined)
    const repo = new TaskRepository(fetchMock as any, '/tasks')

    const result = await repo.delete(1)

    expect(fetchMock).toHaveBeenCalledWith('/tasks/1', {
      method: 'DELETE'
    })
    expect(result).toBeUndefined()
  })
})
