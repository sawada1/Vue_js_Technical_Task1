<script setup lang="ts">
interface Props {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  message: 'Loading...',
  size: 'md'
})


</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 px-4">
    <div class="relative mb-6">
      <div class="absolute inset-0 bg-brand-100 rounded-full blur-2xl opacity-50 animate-pulse"></div>
      <ui-loading-spinner :size="size" />
    </div>

    <p v-if="message" class="text-slate-500 text-center">
      {{ message }}
    </p>
  </div>
</template>
