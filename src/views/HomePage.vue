<script setup>
import { ref } from 'vue';
import axios from 'axios';

const formLogin = ref({
    user: '',
    password: ''
})

const emit = defineEmits(['submit'])

const login = async () => {
    console.table(formLogin.value);
    try {
        const response = await axios.post(import.meta.env.VITE_API_BASE_URL + '/users/login', formLogin.value)
    } catch (error) {
        console.error('Login failed:', error)
    }
    emit('submit', { ...formLogin.value })
}
</script>

<template>
    <div
        class="body w-screen flex justify-center items-center h-screen bg-linear-to-r/hsl from-indigo-500 to-teal-400 m-0">
        <div class="container block bg-white rounded-lg w-lg shadow-2xl">
            <div class="form-login p-15">
                <form class="space-y-6 w-full" action="#" @submit.prevent="login">
                    <!-- <h5 class="text-xl font-medium text-gray-900">Sign in to absensi</h5> -->
                    <h5 class="text-xl dancing-script-regular text-gray-900">KitaSudahBisa.com</h5>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                        <input type="email" name="email" id="email"
                            class="border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                            placeholder="name@gmail.com" required v-model="formLogin.user" />
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••"
                            class="border border-gray-300 text-sm rounded-lg block w-full p-2.5" required
                            v-model="formLogin.password" />
                    </div>
                    <button type="submit"
                        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3">Login</button>
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-500">
                        Apakah anda lupa password ? <a href="#"
                            class="text-blue-700 hover:underline dark:text-blue-500">Hubungi Admin</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
@media (max-width: 800px) {
    .container {
        width: 80%;
    }
}

.dancing-script-regular {
    font-family: "Dancing Script", cursive;
    font-weight: 400;
    font-optical-sizing: auto;
    font-style: normal;
    font-size: 30px;
}
</style>