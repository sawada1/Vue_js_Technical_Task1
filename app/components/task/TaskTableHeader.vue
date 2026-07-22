<script setup lang="ts">
const props = withDefaults(defineProps<{
  data: string[]
}>(), {
  data: () => ['ID', 'Title', 'Description', 'Status', 'Created', 'Actions']
})
</script>

<template>
  <tr>
    <th v-for="header in props.data" :key="header" class="px-4 py-3">{{ header }}</th>
  </tr>
</template>
