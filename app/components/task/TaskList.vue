
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '~/stores/task.store'
import type { CreateTaskPayload } from '~/types/task.types'
const taskStore = useTaskStore()
const {loading, error, filteredTasks, taskCount } = storeToRefs(taskStore)
const showForm = ref(false)

onMounted(() => {
  fetchTasks()
})

async function fetchTasks() {
  await taskStore.fetchTasks()
}

async function handleCreateTask(payload: CreateTaskPayload) {
  await taskStore.createTask(payload)
  showForm.value = false
  await fetchTasks()
}
</script>

<template>
    <section class=" rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
      <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div class="flex items-center gap-3">
            <p class="mb-1 text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">Tasks</p>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-800">
              {{ taskCount }}
            </span>
          </div>
          <h1 class="text-2xl font-bold text-slate-900">Tasks table (API test)</h1>
          <p class="mt-1 text-sm text-slate-600">Data fetched from mock API endpoint <span class="font-medium">/tasks</span>.</p>
        </div>
        <div class="flex gap-2">
          <button @click="showForm = true" class="rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-500 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Task
          </button>
        </div>
      </div>
       
      <!-- Filter Section -->
      <TaskFilter />

      <div v-if="loading">
        <feedback-loading-state />
      </div>
      <div v-else-if="error">
        <feedback-error-state  :message="error"/>
      </div>
      <div v-else class="overflow-x-auto">
        <table class="w-full table-auto">
          <caption class="sr-only">Tasks table</caption>
          <thead class="bg-slate-50 text-left text-sm font-medium text-slate-700">
            <task-table-header :data="['ID', 'Title', 'Description', 'Status', 'Created At', 'Action']" />
          </thead>
          <tbody>
            <task-item
              v-for="task in filteredTasks"
              :key="task.id"
              :task="task"
            />
          </tbody>
        </table>
        <div v-if="filteredTasks.length === 0" class="mt-6 text-center text-sm text-slate-500">
        <feedback-empty-state />
        </div>
      </div>

      <TaskForm
        v-if="showForm"
        mode="create"
        @submit="handleCreateTask"
        @cancel="showForm = false"
      />
    </section>
</template>

