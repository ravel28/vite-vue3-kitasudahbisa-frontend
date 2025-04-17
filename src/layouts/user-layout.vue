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
    <div class="flex flex-1">
      <aside class="w-1/6">
        <SidebarUserLayout />
      </aside>

      <main class="w-6/6 p-4 bg-blue-100 px-7">
        <router-view />
      </main>
    </div>
  </div>
</template>
