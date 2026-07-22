<script setup lang="ts">
import { useTaskStore } from '~/stores/task.store'
import { ref, watch } from 'vue'

const taskStore = useTaskStore()
const searchQuery = ref('')
const statusFilter = ref('All')

watch(searchQuery, (value) => {
  taskStore.setSearchQuery(value)
})

watch(statusFilter, (value) => {
  taskStore.setFilters({ status: value as any })
})
</script>

<template>
     <div class="mb-6 flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by title..."
              class="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>
        </div>
        <div class="sm:w-48">
          <select
          aria-label="Status"
            v-model="statusFilter"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>
</template>