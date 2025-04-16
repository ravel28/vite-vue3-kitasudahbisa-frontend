<script setup>
  import { useRoute } from 'vue-router'

  const route = useRoute()

  console.log(route)

  // const pageTitle = route.meta.title
  const pageTitle = "Welcome to kita sudah bisa"
</script>
<template>
  <div class="">
    <h3 class="text-3xl font-extrabold">{{ pageTitle }}</h3>
  </div>
</template>