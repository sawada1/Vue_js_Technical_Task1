
<script setup lang="ts">
useHead({
  title: 'Task Manager',
  meta: [
    { name: 'description', content: 'A simple task manager application' },
    { property: 'og:title', content: 'Task Manager | TaskFlow' },
    { property: 'og:description', content: 'A simple task manager application' },
    { property: 'twitter:card', content: 'summary_large_image' }
  ]
})
</script>

<template >
  <main class="container mx-auto min-h-screen bg-slate-50 px-6 py-10">
    <TaskList />
  </main>
</template>
