<style>
@media (max-width: 999px) {
    .container {
        width: 80%;
    }
}
</style>

<template>  
    <div class="body w-screen flex justify-center items-center h-screen bg-linear-to-r/hsl from-indigo-500 to-teal-400 m-0">
        <div class="container grid grid-cols-1 lg:grid-cols-2 gap-2 bg-white rounded-lg w-6xl shadow-xl">
            <div class="form-login p-15">
                <form class="space-y-6 lg:w-lg w-full" action="#">
                    <h5 class="text-xl font-medium text-gray-900">Sign in to absensi</h5>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                        <input type="email" name="email" id="email" class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@gmail.com" required />
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3">Login</button>
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-500">
                        Apakah anda lupa password ? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Hubungi Admin</a>
                    </div>
                </form>                
            </div>
            <div class="catalog p-6 hidden lg:flex items-center justify-center">
                <div class="catalog-info">
                    <h1 class="mb-4 font-extrabold tracking-tight text-gray-500 md:text-3xl lg:text-3xl text-center">Kita Sudah Bisa 🧑‍💻</h1>
                    <!-- <p class="dark:text-white text-sm">Website ini diciptakan hanya utnuk karyawan perusahaan untuk melakukan absensi agar laporan dapat dengan mudah di data oleh kami</p> -->
                </div>
            </div>
        </div>
    </div>
</template>