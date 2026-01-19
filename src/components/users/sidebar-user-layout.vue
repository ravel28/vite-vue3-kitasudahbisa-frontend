<script setup>
import { watchEffect, computed, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { appContext } = getCurrentInstance();
const route = useRoute();
const router = useRouter();
const swal = appContext.config.globalProperties.$swal;

const isActive = (path) => {
    return route.path === path;
};

const title = computed(() => route.meta.title);

watchEffect(() => {
    document.title = title.value;
});

async function signOut() {
    const result = await swal.fire({
        title: 'Yakin keluar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya !',
        cancelButtonText: 'Tidak'
    })

    if (result.isConfirmed) {
        try {
            await swal.fire('Berhasil', 'Sampai jumpa dilain waktu', 'success')
            router.push('/')
        } catch (error) {
            swal.fire('Error', 'Terjadi kesalahan', 'error')
        }
    } else {
        swal.fire('Dibatalkan', 'Semangat bekerja', 'info')
    }
}

</script>

<template>
    <title>{{ title }}</title>
    <div class="side-bar-user text-sm">
        <ul class="">
            <li class="font-bold text-2xl flex items-center">
                <h1 class="dancing-script-regular text-2xl p-2 py-6">KitaSudahBisa.com</h1>
            </li>
            <li
                :class="[isActive('/dashboard') ? 'bg-blue-500 text-white rounded-lg' : 'text-gray-700 hover:bg-gray-300 hover:rounded-lg']">
                <router-link to="/dashboard" class='flex p-4 items-center'>
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

                    <p class='mx-2'>Users</p>
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
                    <p class='mx-2'>Divisions</p>
                </router-link>
            </li>
            <li
                :class="[isActive('/positions/list') ? 'bg-blue-500 text-white rounded-lg' : 'text-gray-700 hover:bg-gray-300 hover:rounded-lg']">
                <router-link to="/positions/list" class='flex p-4 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                    </svg>

                    <p class='mx-2'>Positions</p>
                </router-link>
            </li>
            <li class='text-gray-700 hover:bg-gray-300 hover:rounded-lg' @click="signOut()">
                <a class='flex p-4 items-center cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="size-6">
                        <path
                            d="M352 64C352 46.3 337.7 32 320 32C302.3 32 288 46.3 288 64L288 320C288 337.7 302.3 352 320 352C337.7 352 352 337.7 352 320L352 64zM210.3 162.4C224.8 152.3 228.3 132.3 218.2 117.8C208.1 103.3 188.1 99.8 173.6 109.9C107.4 156.1 64 233 64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320C576 233 532.6 156.1 466.3 109.9C451.8 99.8 431.9 103.3 421.7 117.8C411.5 132.3 415.1 152.2 429.6 162.4C479.4 197.2 511.9 254.8 511.9 320C511.9 426 425.9 512 319.9 512C213.9 512 128 426 128 320C128 254.8 160.5 197.1 210.3 162.4z" />
                    </svg>

                    <p class='mx-2'>Sign Out</p>
                </a>
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
