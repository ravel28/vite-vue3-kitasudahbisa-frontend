<script setup>
  import { useRoute } from 'vue-router'

  // declaration variable of meta
  const route = useRoute()
  const pageTitle = route.meta.title
</script>
<template>
  <div class="py-4">
    <h3 class="text-xl font-bold">{{ pageTitle }}</h3>
  </div>
</template>