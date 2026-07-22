<script setup lang="ts">
import { ref, computed } from "vue";
import type { CreateTaskPayload, Task } from "~/types/task.types";

interface Props {
  task?: Task | null;
  mode?: "create" | "edit";
}

const props = withDefaults(defineProps<Props>(), {
  task: null,
  mode: "create",
});

const emit = defineEmits<{
  submit: [payload: CreateTaskPayload];
  cancel: [];
}>();

const formData = ref({
  title: props.task?.title || "",
  description: props.task?.description || "",
  status: props.task?.status || "pending",
  dueDate: props.task?.dueDate || "",
});

const { errors, validate, clearError } = useValidation(formData);

const isSubmitting = ref(false);

const handleSubmit = (e: Event) => {
  e.preventDefault();
  if (validate()) {
    isSubmitting.value = true;
    const payload: CreateTaskPayload = {
      title: formData.value.title,
      description: formData.value.description,
      status: formData.value.status,
      dueDate: formData.value.dueDate || null,
    };
    emit("submit", payload);
  }
  isSubmitting.value = false;
};

const handleCancel = () => {
  emit("cancel");
};
</script>

<template>
  <div
    @click="handleCancel"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
  >
    <div
      @click.stop
      class="bg-white rounded-2xl shadow-soft max-w-lg w-full max-h-[90vh] overflow-y-auto"
    >
      <div class="p-6">
        <div class="mb-6">
          <h2 class="text-xl font-bold text-slate-900">
            {{ mode === "create" ? "Create New Task" : "Edit Task" }}
          </h2>
          <p class="mt-1 text-sm text-slate-600">
            {{
              mode === "create"
                ? "Fill in the details below to create a new task."
                : "Update the task details."
            }}
          </p>
        </div>

        <form @submit="handleSubmit" class="space-y-4">
          <ui-input
            v-model="formData.title"
            @input="clearError('title')"
            type="text"
            label="Title"
            placeholder="Enter task title"
            :error="errors.title || ''"
          />
          <ui-textarea
            v-model="formData.description"
            @input="clearError('description')"
            :rows="3"
            label="Description"
            placeholder="Enter task description"
            :error="errors.description || ''"
          />
          <ui-select
            v-model="formData.status"
            @input="clearError('status')"
            label="Status"
            :error="errors.status || ''"
          />
          <ui-input
            v-model="formData.dueDate"
            @input="clearError('dueDate')"
            type="date"
            label="Due Date"
            placeholder="Enter task date"
            :error="errors.dueDate || ''"
          />

          <div class="flex gap-3 pt-4">
            <button
              type="button"
              :disabled="isSubmitting"
              @click="handleCancel"
              class="flex items-center justify-center gap-2 flex-1 px-4 relative py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex items-center justify-center gap-2 flex-1 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-500 transition-colors"
            >
              {{ mode === "create" ? "Create Task" : "Update Task" }}
              <ui-loading-spinner v-if="isSubmitting" size="sm" />
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
