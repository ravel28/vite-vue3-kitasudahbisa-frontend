<script setup>
  import HeaderUserLayout from '@/components/users/header-user-layout.vue'
  import SidebarUserLayout from '@/components/users/sidebar-user-layout.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col ">

    <!-- Header -->
    <div class="sm:hidden">
      <HeaderUserLayout />
    </div>

    <!-- Main layout -->
    <div class="flex min-h-screen">
      <aside class="w-sm">
        <SidebarUserLayout />
      </aside>

      <main class="w-full p-4 bg-blue-100 px-7">
        <router-view />
      </main>
    </div>
  </div>
</template>
