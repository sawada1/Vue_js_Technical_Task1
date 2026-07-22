<script setup lang="ts">
import { ref } from 'vue'
import type { Task , UpdateTaskPayload } from '~/types/task.types'
import { useTaskStore } from '~/stores/task.store'
import { useTaskHelpers } from '~/composables/useTaskHelpers'

const taskStore = useTaskStore()
const { formatDate, statusClass } = useTaskHelpers()

const props = defineProps<{
  task: Task
}>()

const showDeleteModal = ref(false)

function confirmDelete() {
  taskStore.deleteTask(props.task.id)
  showDeleteModal.value = false
}

function cancelDelete() {
  showDeleteModal.value = false
}

const showEditForm = ref(false)
async function handleEditTask(payload: UpdateTaskPayload) {
  await taskStore.updateTask(props.task.id, payload)
  showEditForm.value = false
  await taskStore.fetchTasks(true)  
}
</script>

<template>
  <tr class="border-t last:border-b hover:bg-slate-50">
    <td class="max-w-[80px] truncate px-4 py-3 text-sm text-slate-700">
      {{ task.id }}
    </td>
    <td
      class="max-w-[220px] truncate px-4 py-3 text-sm font-medium text-slate-900"
    >
      {{ task.title }}
    </td>
    <td class="px-4 mb-2 text-sm text-slate-600 line-clamp-2">
      {{ task.description || "-" }}
    </td>
    <td class="px-4 py-3 text-sm">
      <span
        class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold text-white"
        :class="statusClass(task.status)"
        >{{ task.status }}</span
      >
    </td>
    <td class="px-4 py-3 text-sm text-slate-500">
      {{ formatDate(task.createdAt) }}
    </td>
    <td class="px-4 py-3 text-sm flex gap-2">
      <button
        @click="showDeleteModal = true"
        class="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-500"
      >
        Delete
      </button>
      <button
        @click="showEditForm = true"
        class="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500"
      >
        Edit
      </button>
      <NuxtLink
        :to="`/task/${task.id}`"
        class="rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-500"
      >
        View
      </NuxtLink>
    </td>
  </tr>

  <teleport to="body">
  <feedback-confirm-modal
    :show="showDeleteModal"
    title="Delete Task"
    :message="`Are you sure you want to delete '${task.title}' ?`"
    confirm-text="Delete"
    cancel-text="Cancel"
    @confirm="confirmDelete"
    @cancel="cancelDelete"
  />
  
  <task-form
    v-if="showEditForm"
    :task="task"
    mode="edit"
    @submit="handleEditTask"
    @cancel="showEditForm = false"
  />
</teleport>
</template>
