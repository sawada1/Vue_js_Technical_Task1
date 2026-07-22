<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  label: string;
  error: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "clear-error"): void;
}>();
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-slate-700 mb-1"
      >{{ label }} *</label
    >
    <select
      :value="modelValue"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
      :class="{ 'border-red-500 focus:ring-red-500': error }"
    >
      <option value="Pending">Pending</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>
    <p v-if="error" class="mt-1 text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>
