<script setup lang="ts">
interface Props {
  title?: string
  message?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Something went wrong',
  message: 'An error occurred while loading your data. Please try again.',
})
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 px-4">
    <div class="relative mb-6">
      <div class="absolute inset-0 bg-red-100 rounded-full blur-2xl opacity-50"></div>
      <div class="relative w-24 h-24 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center shadow-soft border border-red-200">
        <svg class="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
    </div>

    <h3 class="text-xl font-semibold text-slate-800 mb-2 text-center">
      {{ title }}
    </h3>
    <p class="text-slate-500 text-center max-w-sm mb-6">
      {{ message }}
    </p>
  </div>
</template>
