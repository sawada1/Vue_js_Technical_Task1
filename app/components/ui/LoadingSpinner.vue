

<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16'
}
</script>

<template>
  <div class="relative flex items-center justify-center">
    <div :class="[sizeClasses[size], 'border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin']"></div>
  </div>
</template>
