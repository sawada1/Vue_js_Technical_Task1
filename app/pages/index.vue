
<script setup lang="ts">
useHead({
  title: 'Task Manager',
  meta: [
    { name: 'description', content: 'A simple task manager application' }
  ]
})
</script>

<template>
  <main class="container mx-auto min-h-screen bg-slate-50 px-6 py-10">
    <TaskList />
  </main>
</template>
