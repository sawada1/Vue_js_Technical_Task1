export class Factory<T> {
  constructor(
    protected api: typeof $fetch,
    protected endpoint: string
  ) {}

  getAll(): Promise<T[]> {
    return this.api<T[]>(this.endpoint)
  }

  getById(id: number): Promise<T> {
    return this.api<T>(`${this.endpoint}/${id}`)
  }

  create(payload: Partial<T>): Promise<T> {
    return this.api<T>(this.endpoint, {
      method: 'POST',
      body: payload
    })
  }

  update(id: number, payload: Partial<T>): Promise<T> {
    return this.api<T>(`${this.endpoint}/${id}`, {
      method: 'PUT',
      body: payload
    })
  }

  delete(id: number): Promise<void> {
    return this.api<void>(`${this.endpoint}/${id}`, {
      method: 'DELETE'
    })
  }
}