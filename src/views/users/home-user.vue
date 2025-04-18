<script setup>
import { useRoute } from 'vue-router'

// declaration variable of meta
const route = useRoute()
const pageTitle = route.meta.title
</script>
<template>
  <div class="py-4 m-1">
    <h3 class="text-xl font-bold">{{ pageTitle }}</h3>
  </div>
  <div class="main-data bg-white shadow-2xl m-1 p-1 py-3 rounded-lg">
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem quae similique dolores optio quod numquam ab
      minus quaerat voluptatibus odit dicta, provident placeat ea, incidunt praesentium dolore tenetur nulla expedita!
    </p>
  </div>
</template>