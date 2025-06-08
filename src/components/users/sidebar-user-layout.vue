<script setup>
import { watchEffect, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isActive = (path) => {
    return route.path === path;
};

const title = computed(() => route.meta.title);

watchEffect(() => {
    document.title = title.value;

});

</script>

<template>
    <title>{{ title }}</title>
    <div class="side-bar-user text-sm">
        <ul class="">
            <li class="font-bold text-2xl flex items-center">
                <h1 class="dancing-script-regular text-2xl p-2 py-6">KitaSudahBisa.com</h1>
            </li>
            <li
                :class="[isActive('/users') ? 'bg-blue-500 text-white rounded-lg' : 'text-gray-700 hover:bg-gray-300 hover:rounded-lg']">
                <router-link to="/users" class='flex p-4 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <p class='mx-2'>Home</p>
                </router-link>
            </li>
            <li
                :class="[isActive('/users/list') ? 'bg-blue-500 text-white rounded-lg' : 'text-gray-700 hover:bg-gray-300 hover:rounded-lg']">
                <router-link to="/users/list" class='flex p-4 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>

                    <p class='mx-2'>User</p>
                </router-link>
            </li>
            <li
                :class="[isActive('/divisi/list') ? 'bg-blue-500 text-white rounded-lg' : 'text-gray-700 hover:bg-gray-300 hover:rounded-lg']">
                <router-link to="/divisi/list" class='flex p-4 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                    </svg>
                    <p class='mx-2'>Division</p>
                </router-link>
            </li>
        </ul>
    </div>
    <div class="footer-user fixed left-1 bottom-0 text-[9px] text-gray-400">
        <p>&copy; KitaSudahBisaVuejs2025</p>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');

/* Kelas untuk font dengan berat 400 (regular) */
.dancing-script-regular {
    font-family: "Dancing Script", cursive;
    font-weight: 400;
    font-optical-sizing: auto;
    font-style: normal;
    font-size: 25px;
}
</style>
