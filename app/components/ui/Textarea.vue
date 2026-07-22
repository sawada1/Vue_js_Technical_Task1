<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  label: string;
  placeholder: string;
  error: string;
  rows: number;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "clear-error"): void;
}>();

const onInput = (event: Event) => {
  const value = (event.target as HTMLTextAreaElement).value;

  emit("update:modelValue", value);
  emit("clear-error");
};
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-slate-700 mb-1"
      >{{ label }} *</label
    >
    <textarea
      :value="modelValue"
      @input="onInput"
      :rows="rows"
      class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
      :class="{ 'border-red-500 focus:ring-red-500': error }"
      :placeholder="placeholder"
    ></textarea>
    <p v-if="error" class="mt-1 text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>
