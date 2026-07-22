<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useTaskStore } from "~/stores/task.store";
import { useTaskHelpers } from "~/composables/useTaskHelpers";
import type { Task } from "~/types/task";
import type { EditTaskPayload } from "~/types/task";

const route = useRoute();
const taskStore = useTaskStore();
const { formatDate, statusClass } = useTaskHelpers();
const { error, loading } = storeToRefs(taskStore);
const taskId = computed(() => route.params.id as string);
const task = computed(() => taskStore.currentTask);
const showEditForm = ref(false);

async function handleEditTask(payload: EditTaskPayload) {
  await taskStore.updateTask(task.value!.id, payload);
  showEditForm.value = false;
}
useHead({
  title: task.value?.title ?? "Task Details",
  meta: [
    {
      name: "description",
      content: task.value?.description ?? "No description provided.",
    },
  ],
});

const handleComplete = async () => {
  await taskStore.updateTask(task.value!.id, {
    status: "done",
  });
};

onMounted(async () => {
  await taskStore.fetchTask(Number(route.params.id));
});
</script>

<template>
  <main class="container mx-auto min-h-screen bg-slate-50 px-6 py-10">
    <div v-if="loading" class="flex items-center justify-center py-20">
      <feedback-loading-state />
    </div>
    <div v-else-if="error" class="flex items-center justify-center py-20">
      <feedback-error-state :title="'Error'" :message="error" />
    </div>
    <div v-else class="max-w-3xl mx-auto">
      <div class="mb-6">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-slate-600 hover:text-brand-600 transition-colors"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Tasks
        </NuxtLink>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
        <div class="mb-6">
          <div class="flex items-start justify-between gap-4 mb-4">
            <h1 class="text-3xl font-bold text-slate-900">{{ task?.title }}</h1>
            <span
              class="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-white shrink-0"
              :class="statusClass(task?.status || '')"
            >
              {{ task?.status }}
            </span>
          </div>
          <p class="text-slate-600 leading-relaxed">
            {{ task?.description || "No description provided." }}
          </p>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200"
        >
          <div>
            <p class="text-sm font-medium text-slate-500 mb-1">Task ID</p>
            <p class="text-slate-800 font-mono text-sm">{{ task?.id }}</p>
          </div>

          <div>
            <p class="text-sm font-medium text-slate-500 mb-1">Status</p>
            <p class="text-slate-800">{{ task?.status }}</p>
          </div>

          <div>
            <p class="text-sm font-medium text-slate-500 mb-1">Created</p>
            <p class="text-slate-800">{{ formatDate(task?.createdAt) }}</p>
          </div>

          <div v-if="task?.dueDate">
            <p class="text-sm font-medium text-slate-500 mb-1">Due Date</p>
            <p class="text-slate-800">{{ formatDate(task?.dueDate) }}</p>
          </div>
        </div>
        <div class="mt-8 pt-6 border-t border-slate-200 flex gap-3">
          <button
            @click="showEditForm = true"
            class="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-500 transition-colors font-medium"
          >
            Edit Task
          </button>
          <button
            @click="handleComplete"
            :disabled="task?.status === 'done'"
            class="px-4 py-2 border rounded-lg transition-colors font-medium"
            :class="[
              task?.status === 'done'
                ? 'bg-green-500 text-white border-green-500 cursor-not-allowed opacity-50'
                : 'border-slate-300 text-slate-700 hover:bg-slate-50',
            ]"
          >
            {{ task?.status === "done" ? "Completed" : "Mark as Complete" }}
          </button>
        </div>
      </div>
    </div>
  </main>

  <task-form
    v-if="showEditForm"
    :task="task"
    mode="edit"
    @submit="handleEditTask"
    @cancel="showEditForm = false"
  />
</template>
