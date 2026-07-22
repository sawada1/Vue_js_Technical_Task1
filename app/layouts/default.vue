
<template>
  <div class="min-h-screen flex flex-col">
    <layoutAppHeader />
    
    <main class="flex-1">
      <slot />
    </main>
    
    <layoutAppFooter />
  </div>
</template>
