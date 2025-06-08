<script setup>
import dashboardBackground from '@/assets/backgrounds/office.jpg'
</script>

<template>
    <div class="dashboard min-h-100 bg-white shadow-2xl m-1 p-2 py-3 rounded-lg">
        <div class="header-dahsboard w-full">
            <div class="card-header-dashboard p-5">
                <div class="header-card">
                    <img :src="dashboardBackground" class="w-full h-140" alt="">
                </div>
                <div class="body-card-header-dashboard py-4 text-center">
                    <h1 class="font-bold text-3xl py-3">Selamat datang</h1>
                    <p class="mt-4 text-gray-400">
                        Selamat datang di Dashboard Office, pusat kendali yang dirancang untuk memudahkan Anda dalam
                        memantau aktivitas, mengelola tugas harian, dan mengakses informasi penting secara efisien.
                        Dengan tampilan yang bersih dan profesional, dashboard ini menyatukan data kerja, jadwal rapat,
                        dan laporan kinerja dalam satu tempat, membantu Anda tetap fokus, produktif, dan terorganisir
                        setiap hari.
                    </p>
                </div>
            </div>
        </div>
        <div class="body-dahboard w-full">

        </div>
    </div>
</template>