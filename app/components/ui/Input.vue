<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string
    label: string
    placeholder: string
    error?: string
    type?: string
    disabled?: boolean
    required?: boolean
    id?: string
  }>(),
  {
    type: 'text',
    disabled: false,
    required: true,
    placeholder: 'Enter value',
    error: '',
    id: undefined
  }
)
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "clear-error"): void;
}>();

const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;

  emit("update:modelValue", value);
  emit("clear-error");
};

const getMinDate = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
}
</script>

<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-slate-700 mb-1"
      >{{ label }} *</label
    >
    <input
      :id="id"
      :value="modelValue"
      @input="onInput"
      :type="type"
      :min="type === 'date' ? getMinDate() : undefined"
      class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
      :class="{ 'border-red-500 focus:ring-red-500': error }"
      :placeholder="placeholder"
    />
    <p v-if="error" class="mt-1 text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>
