<script setup>
import HeaderUserLayout from '@/components/users/header-user-layout.vue'
import SidebarUserLayout from '@/components/users/sidebar-user-layout.vue'
</script>

<template>
  <div class="min-h-screen block relative">

    <!-- Header -->
    <div class=" absolute w-full h-20 ps-59 mt-4 text-sm z-20">
      <HeaderUserLayout />
    </div>

    <!-- Main layout -->
    <div class="flex relative min-h-screen max-h-full overflow-auto">
      <aside class="w-53 fixed top-0 left-0 bg-white h-screen z-10 px-1">
        <SidebarUserLayout />
      </aside>

      <main class="relative w-full p-4 bg-blue-100 px-7 ms-53 pt-20">
        <router-view />
      </main>
    </div>
  </div>
</template>
