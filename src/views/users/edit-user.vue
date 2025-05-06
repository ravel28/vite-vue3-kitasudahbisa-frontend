<script setup>
import { onMounted, ref, computed, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import vSelect from "vue-select"
import "vue-select/dist/vue-select.css"
import axios from 'axios'

// declaration variable of import injection
const readerPath = useRoute()
const changeRoute = useRouter()
const { appContext } = getCurrentInstance()
const swal = appContext.config.globalProperties.$swal

// declaration varible to this page
const divisions = ref([])
const divisionUserSelect = ref([])
const detailUsers = ref([])
const take = 10

// declaration varible reader path
const userId = readerPath.params.id
const isCreate = userId ? false : true

// declaration variable to 
const idUser = !isCreate ? computed(() => detailUsers.value?.id) : null
const userName = !isCreate ? computed(() => detailUsers.value?.name) : null
const email = !isCreate ? computed(() => detailUsers.value?.email) : null
const motto = !isCreate ? computed(() => detailUsers.value?.motto) : null
const divisiUser = !isCreate ? computed(() => detailUsers.value?.division) : null
let divisionId = !isCreate ? computed(() => detailUsers.value?.division_id) : null

let divisi = {
    id: divisionId,
    label: divisiUser
}

// API base URL
const api = import.meta.env.VITE_API_BASE_URL

const showAlert = () => {
    const { appContext } = getCurrentInstance()
    const swal = appContext.config.globalProperties.$swal

    swal.fire({
        title: 'Sukses!',
        text: 'Ini SweetAlert2 dari global instance!',
        icon: 'success'
    })
}

// lifecycle
onMounted(async () => {
    try {
        const responseGetDivisi = await axios.get(`${api}/divisions/${take}`)

        divisions.value = responseGetDivisi.data.data.item.map(div => ({
            label: div.division,
            value: div.id
        }))

        divisionUserSelect.value = divisi


        const getDetailUser = await axios.get(api + '/users/finding/' + userId)
        detailUsers.value = getDetailUser.data.data.item
    } catch (error) {
        console.error('API error:', error)
    }
})



function selectedDinas(selectedDinas) {
    divisi = selectedDinas.value
    const selectData = divisions.value.find((div) => div.value === selectedDinas.value)
    divisi = {
        label: selectData.label,
        value: selectData.value,
    }
}

async function deleteDatauser(idUser) {
    const result = await swal.fire({
        title: 'Yakin mau hapus?',
        text: 'Data ini tidak bisa dikembalikan!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
    })

    if (result.isConfirmed) {
        try {
            await axios.delete(`${api}/users/delete/${idUser}`)
            await swal.fire('Berhasil!', 'Data berhasil dihapus.', 'success')
            router.push('/users')
        } catch (error) {
            swal.fire('Error', 'Terjadi kesalahan saat menghapus data.', 'error')
        }
    } else {
        swal.fire('Dibatalkan', 'Data tidak jadi dihapus.', 'info')
    }
}

</script>

<template>
    <div class="main-data bg-white shadow-2xl m-1 p-2 py-3 rounded-lg h-full mb-4">
        <div class="profil-user block w-full h-14">
            <div class="header-profil-user flex justify-between items-center">
                <div class="username-header-profil-user flex items-center h-full">
                    <div
                        class="icon-header-profil-user w-8 h-full border-1 border-gray-300 rounded-sm flex items-center justify-center text-gray-400 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </div>
                    <div class="username-header-profil-user hidden lg:block h-full">
                        <p class="p-2 px-3">{{ userName }}</p>
                    </div>
                </div>
                <div class="delete-account-header-profil-user  h-full">
                    <button class="bg-red-400 text-white p-2 rounded-lg flex items-center cursor-pointer"
                        @click="deleteDatauser(idUser)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>

                        <p class="px-2">Delete Account</p>
                    </button>
                </div>
            </div>
            <div class="body-profil-user h-auto p-3 2xl:flex block">
                <div class="foto-body-profil-user 2xl:w-md w-full">
                    <div
                        class="picture-foto-body-user w-full h-100 flex justify-center items-center text-blue-300 p-2 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-30">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </div>
                    <div class="button-action-foto-body w-full">
                        <button class="border-1 border-gray-300 rounded-sm text-center block w-full p-2 cursor-pointer">
                            Ganti Foto
                        </button>
                    </div>
                    <div class="auth-action-foto-body w-full mt-4">
                        <form action="" class="w-full block">
                            <div class="relative mb-3 w-full min-h-10 ">
                                <div class="icon-input absolute left-0 py-2 px-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                </div>
                                <div class="text-input w-full h-10 ">
                                    <input type="text" placeholder="Your Username"
                                        class="block w-full ps-8 p-2 focus:outline-0 border-1 border-gray-300"
                                        :value="userName ?? ''">
                                </div>
                            </div>
                            <div class="relative mb-5 w-full min-h-10 hidden ">
                                <div class="icon-input absolute left-0 py-2 px-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                                    </svg>
                                </div>
                                <div class="text-input w-full h-10 ">
                                    <input type="text" placeholder="Your Password"
                                        class="block w-full ps-8 p-2 focus:outline-0 border-1 border-gray-300">
                                </div>
                            </div>
                            <div class="relative mb-3 w-full min-h-10">
                                <button type="submit"
                                    class="p-2 flex bg-blue-300 rounded-sm w-full justify-center text-gray-700 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M4.867 19.125h.008v.008h-.008v-.008Z" />
                                    </svg>
                                    <p class="ps-2">Ubah Akun</p>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="info-body-profil-user w-full p-2 mt-8 2xl:mt-0">
                    <form action="">
                        <div class="grid mb-6 md:grid-cols-2 gap-8">
                            <div>
                                <label for="" class="block mb-2">Divisi</label>
                                <div class="select relative block">
                                    <v-select :options="divisions" placeholder="-- Pilih divisi --"
                                        v-model="divisionUserSelect" @update:modelValue="selectedDinas" />
                                </div>

                            </div>
                            <div>
                                <label for="" class="block mb-2">Email</label>
                                <input type="email"
                                    class="w-full p-2 border-gray-400 border-1 focus:outline-0 rounded-sm"
                                    placeholder="yaya09@gmail.com" :value="email ?? ''">
                            </div>
                        </div>

                        <div class="grid mb-6 gap-8">
                            <div>
                                <label for="" class="block mb-2">Nama Lengkap</label>
                                <div class="select relative block">
                                    <input type="text"
                                        class="w-full p-2 border-gray-400 border-1 focus:outline-0 rounded-sm"
                                        placeholder="Jajang  Maulana" :value="userName ?? ''">
                                </div>
                            </div>
                        </div>
                        <div class="grid mb-6 gap-8">
                            <div>
                                <label for="" class="block mb-2">Motto</label>
                                <div class="select relative block">
                                    <input type="text"
                                        class="w-full p-2 border-gray-400 border-1 focus:outline-0 rounded-sm"
                                        placeholder="Terus kedepan" :value="motto ?? ''">
                                </div>
                            </div>
                        </div>

                        <div class="grid mb-6 gap-8">
                            <div>
                                <div class="select relative block">
                                    <button
                                        class="bg-blue-600 text-white flex w-full justify-center p-2 rounded-lg cursor-pointer">
                                        <p class="px-2">Update Data</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>