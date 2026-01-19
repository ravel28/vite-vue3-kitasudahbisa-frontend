<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import vSelect from "vue-select"
import 'vue-select/dist/vue-select.css'
import axios from 'axios'

// declaration variable of meta
const api = import.meta.env.VITE_API_BASE_URL;
const { appContext } = getCurrentInstance();
const swal = appContext.config.globalProperties.$swal;
const changeRoute = useRouter()
const emit = defineEmits(['submit'])

// declaration varible to this page
const isLoadingDataTable = ref(true)
const isLoadingUpdateUser = ref(false)
const users = ref([])
const meta = ref([])
const isPrev = ref(false)
const isNext = ref(false)
const imagePreview = ref(null)
const divisionList = ref([])
const positionList = ref([])
const isCreate = ref(false)
const pages = ref([])
const filterDataUsers = ref({
  take: 10,
  page: 1,
  name: null,
  divisi: null,
  position: null
})
const pagination = ref({
  current_page: 0,
  take: 0,
  total_pages: 0,
  item_per_page: 0,
  total_items: 0,
  start_index: 0,
})
const formUser = ref({
  imagePreview: null,
  division_id: null,
  position_id: null,
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
    // const responseGetDivisi = await axios.get(`${api}/divisions/10`)
    // const responseGetPosition = await axios.get(`${api}/positions/10`)

    // divisionList.value = responseGetDivisi.data.data.item.map(div => ({
    //   label: div.division,
    //   value: div.id
    // }))

    // positionList.value = responseGetPosition.data.data.item.map(div => ({
    //   label: div.position,
    //   value: div.id
    // }))

    isLoadingDataTable.value = false;
  } catch (error) {
    await swal.fire('Server Error', 'Unable to connect to the server. Please check your internet connection or try again later.', 'error');
    isLoadingDataTable.value = false;
    console.error('API error:', error)
  }
})

function pagesToShow() {
  const pageList = []
  const currentPage = pagination.value.current_page
  let start = currentPage - ((currentPage - 1) % 3);

  for (let i = 1; i <= 3; i++) {
    if (start <= pagination.value.total_pages)
      pageList.push(start)
    start++
  }

  if (
    pagination.value.current_page > 1
  ) {
    isPrev.value = true;
  } else {
    isPrev.value = false;
  }

  if (
    pagination.value.current_page < pagination.value.total_pages
  ) {
    isNext.value = true;
  } else {
    isNext.value = false;
  }

  pages.value = pageList;
}

async function requestPage(pageNumber) {
  filterDataUsers.value.page = pageNumber
  getDataUsers()
}

async function nextPrev(isNext) {
  if (isNext)
    filterDataUsers.value.page += 1
  if (!isNext)
    filterDataUsers.value.page -= 1
  getDataUsers()
}

function togleCardCreateUser(isShow) {
  isCreate.value = isShow === true ? true : false;
}

function togleButtonSaveData() {
  isLoadingUpdateUser.value = !isLoadingUpdateUser.value;
}

function selectedDivisiAtCreateUser(divisionLabel) {
  formUser.value.division_id = divisionLabel.value;
}

function selectedPositionAtCreateUser(divisionLabel) {
  formUser.value.position_id = divisionLabel.value;
}

async function getDataUsers() {
  const response = await axios.get(api + '/users/' + filterDataUsers.value.take, {
    params: {
      page: filterDataUsers.value.page
    }
  })
  users.value = response.data.data.item
  meta.value = response.data.meta
  // const response = await axios.get(api + 'data')
  // const response_meta = await axios.get(api + 'meta')
  // users.value = response.data
  // meta.value = response_meta.data

  pagination.value.current_page = meta.value.current_page
  pagination.value.take = meta.value.take
  pagination.value.total_pages = meta.value.total_pages
  pagination.value.item_per_page = meta.value.item_per_page
  pagination.value.total_items = meta.value.total_items
  pagination.value.start_index = (pagination.value.current_page - 1) * pagination.value.take

  pagesToShow();
}

function resetFormUser() {
  formUser.value.division_id = null;
  formUser.value.imagePreview = null;
  formUser.value.birthdate = null;
  formUser.value.username = null;
  formUser.value.name = null;
  formUser.value.email = null;
  formUser.value.motto = null;
}

async function getDataDetailUser(idUser) {
  // changeRoute.push(`/users/edit/${idUser}`)
  // "id": 5,
  //   "email": "fifah06@gmail.com",
  //     "username": "fifah06",

  await axios.patch(`http://localhost:3000/data/5`, {
    name: 'reza_ravelinno'
  });
  getDataUsers();
}

async function createdUser() {
  try {
    togleButtonSaveData();
    await axios.post(import.meta.env.VITE_API_BASE_URL + '/users/create/', formUser.value)
    togleButtonSaveData();
    await swal.fire('Creation Successful', 'The data has been created successfully.', 'success');
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
    <div class="main-table mt-5 px-5">
      <div class="tool-table">

      </div>
      <table border="1 " class="w-full m-2 text-center">
        <thead class=" border-b-1">
          <tr>
            <th class="w-15 py-4">No.</th>
            <th>Nama lengkap</th>
            <th>Divisi</th>
            <th>Posisi</th>
            <th class="w-60">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id" class="py-3" v-if="users.length > 0 && !isLoadingDataTable">
            <td class="py-5">{{ pagination.start_index + index + 1 }}</td>
            <td class="py-5">{{ user.name }}</td>
            <td class="py-5">{{ user.division_name }}</td>
            <td class="py-5">{{ user.position_name }}</td>
            <td class="flex items-center py-5 justify-center">
              <button class="flex bg-blue-400 text-white p-2 rounded-sm cursor-pointer mx-2"
                @click="getDataDetailUser(user.id)">
                Detail
              </button>
            </td>
          </tr>
          <tr v-else-if="isLoadingDataTable">
            <td colspan="5" class="text-center py-5 text-gray-500">
              <div role="status" class="flex justify-center items-center w-full">
                <svg aria-hidden="true" class="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor" />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill" />
                </svg>
                <span>Loading...</span>
              </div>
            </td>
          </tr>
          <tr v-else>
            <td colspan="5" class="text-center py-5 text-gray-500">
              Data is null.
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination-table w-full flex justify-between items-center" v-if="!isLoadingDataTable">
        <div class="flex flex-col items-center">
          <span class="text-sm text-gray-700 ">
            Showing <span class="font-semibold text-gray-900 ">{{ pagination.start_index + 1 }}</span> to <span
              class="font-semibold text-gray-900 ">{{ pagination.start_index + pagination.item_per_page }}</span> of
            <span class="font-semibold text-gray-900 ">{{
              pagination.total_items }}</span>
            Entries
          </span>
        </div>
        <nav aria-label="Page navigation example">
          <ul class="inline-flex -space-x-px text-base h-10" v-if="isPrev">
            <li @click="nextPrev(false)">
              <a href="#"
                class="flex items-center justify-center px-4 h-10 ms-0 leading-tight bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ">
                << Previous</a>
            </li>
          </ul>
          <ul class="inline-flex -space-x-px text-base h-10" v-for="n in pages" :key="n">
            <li @click="requestPage(n)" :class="n === pagination.current_page ? 'text-black' : 'text-gray-400'">
              <a href="#"
                class="flex items-center justify-center px-4 h-10 leading-tight  bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">{{
                  n }}</a>
            </li>
          </ul>
          <ul class="inline-flex -space-x-px text-base h-10" v-if="isNext">
            <li @click="nextPrev(true)">
              <a href="#"
                class="flex items-center justify-center px-4 h-10 leading-tight  bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ">Next
                >></a>
            </li>
          </ul>
        </nav>
      </div>
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
                <v-select :options="divisionList" placeholder="-- Pilih divisi --" class="p-1"
                  @update:modelValue="selectedDivisiAtCreateUser" />
              </div>
            </div>
            <div>
              <label for="" class="block mb-2">Posisi</label>
              <div class="select relative block">
                <v-select :options="positionList" placeholder="-- Pilih divisi --" class="p-1"
                  @update:modelValue="selectedPositionAtCreateUser" />
              </div>
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
              <label for="" class="block mb-2">Tanggal Lahir</label>
              <input type="date" class="w-full p-2 border-gray-400 border-1 focus:outline-0 rounded-sm"
                placeholder="ravel" v-model="formUser.birthdate">
            </div>
          </div>
          <div class="grid mb-6 gap-8 md:grid-cols-2">
            <div>
              <label for="" class="block mb-2">Username</label>
              <div class="select relative block">
                <input type="text" class="w-full p-2 border-gray-400 border-1 focus:outline-0 rounded-sm"
                  placeholder="Joki98" v-model="formUser.username">
              </div>
            </div>
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
          <button type="submit" class="bg-blue-600 text-white flex w-40 justify-center p-2 rounded-lg cursor-pointer"
            v-if="!isLoadingUpdateUser">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <p class="px-2" v-if="!isLoadingUpdateUser">Simpan</p>
          </button>
          <button type="submit" class="flex justify-center bg-blue-600 text-white w-40 p-2 rounded-lg cursor-pointer"
            v-if="isLoadingUpdateUser">
            <svg aria-hidden="true" class="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor" />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill" />
            </svg>
            <span>Loading...</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
