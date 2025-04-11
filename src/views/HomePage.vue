<style>
</style>

<template>  
    <div class="body w-screen flex justify-center items-center h-screen bg-linear-to-r/hsl from-indigo-500 to-teal-400">
        <div class="container grid grid-cols-2 bg-black gap-2 rounded-md w-7xl">
            <div class="form-login p-15">
                <form class="space-y-6 w-md" action="#">
                    <h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@gmail.com" required />
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3">Login to your account</button>
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Apakah anda lupa password ? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Hubungi Admin</a>
                    </div>
                </form>                
            </div>
            <div class="catalog p-6 flex items-center justify-center">
                <h1 class="mb-4 font-extrabold tracking-tight text-gray-900 md:text-4xl lg:text-4xl text-center">Kita Sudah Bisa</h1>
            </div>
        </div>
    </div>
</template>