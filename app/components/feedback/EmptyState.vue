<script setup lang="ts">
interface Props {
  title?: string
  message?: string
  icon?: string
  actionText?: string
  showAction?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'No data found',
  message: 'There are no items to display at the moment.',
  icon: 'inbox',
  actionText: 'Get started',
  showAction: false
})

const emit = defineEmits<{
  action: []
}>()

const handleAction = () => {
  emit('action')
}

const icons: Record<string, string> = {
  inbox: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />',
  search: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />',
  task: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />',
  folder: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />',
  calendar: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />'
}
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 px-4">
    <div class="relative mb-6">
      <div class="absolute inset-0 bg-brand-100 rounded-full blur-2xl opacity-50"></div>
      <div class="relative w-24 h-24 bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl flex items-center justify-center shadow-soft border border-brand-200">
        <svg class="w-12 h-12 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="icons[icon] || icons.inbox"></svg>
      </div>
    </div>

    <h3 class="text-xl font-semibold text-slate-800 mb-2 text-center">
      {{ title }}
    </h3>
    <p class="text-slate-500 text-center max-w-sm mb-6">
      {{ message }}
    </p>

    <button
      v-if="showAction"
      @click="handleAction"
      class="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      {{ actionText }}
    </button>
  </div>
</template>
