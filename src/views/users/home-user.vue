<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios'

// declaration variable of meta
const readerPath = useRoute()
const changeRoute = useRouter()
const pageTitle = computed(() => route.meta.title);
const listName = computed(() => route.meta.tableName);

//Get data from API
const api = import.meta.env.VITE_API_BASE_URL;

// declaration varible to this page
const users = ref([])
const detailUsers = ref([])
const take = 10;
const fakeCountUsers = 10;

onMounted(async () => {
  try {
    const response = await axios.get(api + '/users/' + take)
    users.value = response.data.data.item
  } catch (error) {
    console.error('API error:', error)
  }
})

async function getDataDetailUser(idUser) {
  const getDetailUser = await axios.get(api + '/users/finding/' + idUser)
  detailUsers.value = getDetailUser.data.data.item
  changeRoute.push(`/users/edit/${idUser}`)
}

</script>
<template>
  <div class="main-data bg-white shadow-2xl m-1 p-2 py-3 rounded-lg">
    <div class="tool-table flex justify-between items-center">
      <div class="tool-table-search w-65">
        <input type="search" class="p-2 border border-gray-300 w-full rounded-xl focus:outline-none"
          placeholder="Search 🔎" />
      </div>
      <div class="tool-table-create-item mx-3">
        <button class="w-30 flex text-sm text-white p-2 bg-blue-400 rounded-2xl cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
          </svg>
          <p class="px-2">Buat Akun</p>
        </button>
      </div>
    </div>
    <div class="main-table mt-5">
      <div class="tool-table">

      </div>
      <table border="1 " class="w-full m-2 text-center">
        <thead class=" border-b-1">
          <tr>
            <th class="w-15 py-4">No.</th>
            <th>Nama lengkap</th>
            <th>Posisi</th>
            <th class="w-60">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id" class="py-3">
            <td class="py-5">{{ index + 1 }}</td>
            <td class="py-5">{{ user.name }}</td>
            <td class="py-5">{{ user.division }}</td>
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
</template>
