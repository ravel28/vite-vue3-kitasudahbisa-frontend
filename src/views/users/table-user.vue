<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import vSelect from "vue-select"
import 'vue-select/dist/vue-select.css'
import axios from 'axios'

// declaration variable of meta
const api = import.meta.env.VITE_API_BASE_URL;
const changeRoute = useRouter()
const emit = defineEmits(['submit'])
const take = 10;

// declaration varible to this page
const users = ref([])
const detailUsers = ref([])
const imagePreview = ref(null)
const divisions = ref([])
const divisionsId = ref([])
const isCreate = ref(false)
const formUser = ref({
  imagePreview: null,
  division_id: null,
  birthdate: null,
  username: null,
  name: null,
  email: null,
  motto: null,
})


// Show image before upload
function onFileChange(event) {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      formUser.value.imagePreview = e.target.result
    }
    reader.readAsDataURL(file)
  } else {
    imagePreview.value = null
  }
}

onMounted(async () => {
  try {
    getDataUsers();
    const responseGetDivisi = await axios.get(`${api}/divisions/${take}`)

    divisions.value = responseGetDivisi.data.data.item.map(div => ({
      label: div.division,
      value: div.id
    }))
  } catch (error) {
    console.error('API error:', error)
  }
})

async function getDataDetailUser(idUser) {
  const getDetailUser = await axios.get(api + '/users/finding/' + idUser)
  detailUsers.value = getDetailUser.data.data.item
  changeRoute.push(`/users/edit/${idUser}`)
}


function togleCardCreateUser(isShow) {
  isCreate.value = isShow === true ? true : false;
}

function selectedDivisiAtCreateUser(divisionLabel) {
  divisionsId.value = divisionLabel.value;
}

async function getDataUsers() {
  const response = await axios.get(api + '/users/' + take)
  users.value = response.data.data.item
}

function resetFormUser() {
  divisionsId.value = null;
  formUser.value.division_id = null;
  formUser.value.imagePreview = null;
  formUser.value.birthdate = null;
  formUser.value.username = null;
  formUser.value.name = null;
  formUser.value.email = null;
  formUser.value.motto = null;
}

function valueFormUser() {
  formUser.value.division_id = divisionsId.value;
  formUser.value.imagePreview = null;
  formUser.value.birthdate = formUser.value.birthdate;
  formUser.value.username = formUser.value.username;
  formUser.value.name = formUser.value.name;
  formUser.value.email = formUser.value.email;
  formUser.value.motto = formUser.value.motto;
}

async function createdUser() {
  try {
    valueFormUser();
    await axios.post(import.meta.env.VITE_API_BASE_URL + '/users/create/', formUser.value)
    resetFormUser();
    getDataUsers();
    emit('submit', { ...formUser.value })
  } catch (error) {
    console.error('Created user failed:', error)
    emit('submit', { error, success: false })
  }
}

</script>
<template>
  <div class="main-data bg-white shadow-2xl m-1 p-2 py-3 rounded-lg">
    <div class="tool-table flex justify-between items-center">
      <div class="tool-table-create-item mx-3" @click="togleCardCreateUser(true)">
        <button class="w-30 flex text-sm text-white p-2 bg-violet-400 rounded-2xl cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
          </svg>
          <p class="px-2">Buat Akun</p>
        </button>
      </div>
      <div class="tool-table-search w-65">
        <input type="search" class="p-2 border border-gray-300 w-full rounded-xl focus:outline-none"
          placeholder="Search 🔎" />
      </div>
    </div>
    <div class="main-table mt-5">
      <div class="tool-table">

      </div>
      <table border="1 " class="w-full m-2 text-center">
        <thead class=" border-b-1">
          <tr>
            <th class="w-15 py-4">No.</th>
            <th>Email</th>
            <th>Nama lengkap</th>
            <th>Posisi</th>
            <th class="w-60">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id" class="py-3">
            <td class="py-5">{{ index + 1 }}</td>
            <td class="py-5">{{ user.email }}</td>
            <td class="py-5">{{ user.name }}</td>
            <td class="py-5">{{ user.division_name }}</td>
            <td class="flex items-center py-5 justify-center">
              <button class="flex bg-blue-400 text-white p-2 rounded-sm cursor-pointer mx-2"
                @click="getDataDetailUser(user.id)">
                Detail
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div
    class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-7 z-20 w-300 min-h-lg bg-white rounded-2xl shadow-2xl"
    v-if="isCreate">
    <div class="header-card flex items-center justify-between py-2">
      <h1 class=" flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
        </svg>
        <p class="font-bold text-lg px-2">Buat Akun User</p>
      </h1>
      <div class="btn-close flex items-center">
        <button class=" cursor-pointer" @click="togleCardCreateUser(false)">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <form action="" @submit.prevent="createdUser">
      <div class="body-card flex my-4">
        <div class="photo w-60">
          <div class="preview-photo h-70 w-full mb-12 border-1 border-gray-300 rounded-sm ">
            <div v-if="formUser.imagePreview" class="w-full max-h-full overflow-hidden">
              <img :src="formUser.imagePreview" alt="Preview" class="h-full" />
            </div>
          </div>
          <input type="file" @change="onFileChange" accept="image/*"
            class=" w-full bg-gray-300 border-1 rounded-lg text-gray-600 p-2 cursor-pointer" />
        </div>
        <div class="form w-full px-6">
          <div class="grid mb-6 md:grid-cols-2 gap-8">
            <div>
              <label for="" class="block mb-2">Divisi</label>
              <div class="select relative block">
                <v-select :options="divisions" placeholder="-- Pilih divisi --" class="p-1"
                  v-model="formUser.division_id"
                  @update:modelValue="selectedDivisiAtCreateUser(formUser.division_id)" />
              </div>
            </div>
            <div>
              <label for="" class="block mb-2">Tanggal Lahir</label>
              <input type="date" class="w-full p-2 border-gray-400 border-1 focus:outline-0 rounded-sm"
                placeholder="ravel" v-model="formUser.birthdate">
            </div>
          </div>

          <div class="grid mb-6 gap-8 md:grid-cols-2">
            <div>
              <label for="" class="block mb-2">Email</label>
              <div class="select relative block">
                <input type="text" class="w-full p-2 border-gray-400 border-1 focus:outline-0 rounded-sm"
                  placeholder="kitsudahbisa@gmail.com" v-model="formUser.email">
              </div>
            </div>
            <div>
              <label for="" class="block mb-2">Username</label>
              <div class="select relative block">
                <input type="text" class="w-full p-2 border-gray-400 border-1 focus:outline-0 rounded-sm"
                  placeholder="Joki98" v-model="formUser.username">
              </div>
            </div>
          </div>
          <div class="grid mb-6 gap-8">
            <div>
              <label for="" class="block mb-2">Nama Lengkap</label>
              <div class="select relative block">
                <input type="text" class="w-full p-2 border-gray-400 border-1 focus:outline-0 rounded-sm"
                  placeholder="Jajang  Maulana" v-model="formUser.name">
              </div>
            </div>
          </div>
          <div class="grid mb-6 gap-8">
            <div>
              <label for="" class="block mb-2">Motto</label>
              <div class="select relative block">
                <input type="text" class="w-full p-2 border-gray-400 border-1 focus:outline-0 rounded-sm"
                  placeholder="Terus kedepan" v-model="formUser.motto">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-card">
        <div class="select relative flex justify-end">
          <button type="reset" class="bg-red-600 text-white flex w-40 justify-center p-2 rounded-lg cursor-pointer mx-4"
            @click="resetFormUser">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            <p class="px-2"> Reset</p>
          </button>
          <button type="submit" class="bg-blue-600 text-white flex w-40 justify-center p-2 rounded-lg cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <p class="px-2">Simpan</p>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
