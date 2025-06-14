<script setup>
import { computed, onMounted, ref, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import vSelect from "vue-select"
import 'vue-select/dist/vue-select.css'
import axios from 'axios'

// declaration variable of meta
const api = import.meta.env.VITE_API_BASE_URL
const { appContext } = getCurrentInstance()
const swal = appContext.config.globalProperties.$swal
const changeRoute = useRouter()
const emit = defineEmits(['submit'])
const take = 10;

// declaration varible to this page
const isShowCardCreateUpdate = ref(false)
const isUpdateButtonOnCardCreateUpdate = ref(false)

const divisionsList = ref([])
const divisions = ref([])
const idDivisi = ref([])
const titleCardCreateUpdate = ref([])
const redButtonCardCreateUpdate = ref([])
const formDivisi = ref({
  division_id: null,
  division: null
})

onMounted(async () => {
  try {
    getData();
    const responseGetDivisi = await axios.get(`${api}/divisions/${take}`)

    divisions.value = responseGetDivisi.data.data.item.map(div => ({
      label: div.division,
      value: div.id
    }))
  } catch (error) {
    await swal.fire('Server Error', 'Unable to connect to the server. Please check your internet connection or try again later.', 'error');
    console.error('API error:', error)
  }
})

function togleCardCreateData(isShow, isCreateData) {
  isShowCardCreateUpdate.value = isShow ? true : false;
  titleCardCreateUpdate.value = isCreateData ? 'Penambahan Divisi Baru' : 'Perubahan Nama Divisi';
  redButtonCardCreateUpdate.value = isCreateData ? 'Reset' : 'Hapus';
  isUpdateButtonOnCardCreateUpdate.value = isCreateData ? false : true;
  if (isCreateData)
    resetForm();
}

async function getDataDetail(id, divisiName) {
  idDivisi.value = id;
  formDivisi.value.division_id = idDivisi.value;
  formDivisi.value.division = divisiName;
  isUpdateButtonOnCardCreateUpdate.value = true;
  togleCardCreateData(true, false)
}

async function getData() {
  const response = await axios.get(api + '/divisions/' + take)
  divisionsList.value = response.data.data.item
}


function resetForm() {
  idDivisi.value = null;
  formDivisi.value.division_id = null;
  formDivisi.value.division = null;
}

function valueForm() {
  idDivisi.value = null;
  formDivisi.value.division_id = idDivisi.value;
  formDivisi.value.division = formDivisi.value.division;
}

async function createdData() {
  try {
    if (isUpdateButtonOnCardCreateUpdate.value) {
      formDivisi.value.division_id = idDivisi.value;
      formDivisi.value.division = formDivisi.value.division;
      await axios.put(import.meta.env.VITE_API_BASE_URL + '/divisions/update/' + idDivisi.value, formDivisi.value);
      await swal.fire('Changes Saved', 'Your changes have been saved successfully.', 'success');
      isShowCardCreateUpdate.value = false;
      getData();
    } else {
      valueForm();
      await axios.post(import.meta.env.VITE_API_BASE_URL + '/divisions/create', formDivisi.value)
      await swal.fire('Creation Successful', 'The data has been created successfully.', 'success');
      resetForm();
      getData();
    }
    emit('submit', { ...formDivisi.value })
  } catch (error) {
    console.error('Created user failed:', error)
    emit('submit', { error, success: false })
  }
}

async function redButtonEventeClickOnCard() {
  if (!isUpdateButtonOnCardCreateUpdate.value) resetForm();
  if (isUpdateButtonOnCardCreateUpdate.value) await deleteData();
}

async function deleteData() {
  const result = await swal.fire({
    title: 'Are you sure?',
    text: 'This action cannot be undone!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  });


  if (result.isConfirmed) {
    try {
      await axios.delete(import.meta.env.VITE_API_BASE_URL + '/divisions/delete/' + idDivisi.value);
      isShowCardCreateUpdate.value = false;
      swal.fire({
        title: 'Data Deleted!',
        text: 'The data has been successfully removed from the system.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
      getData();
    } catch (error) {
      swal.fire('Error', 'Terjadi kesalahan saat menghapus data.', 'error')
    }
  } else {
    await swal.fire('Deletion Cancelled', 'The item was not deleted.', 'info');
  }
}

</script>
<template>
  <div class="main-data bg-white shadow-2xl m-1 p-2 py-3 rounded-lg">
    <div class="tool-table flex justify-between items-center">
      <div class="tool-table-create-item mx-3" @click="togleCardCreateData(true, true)">
        <button class="w-35 flex text-sm text-white p-2 bg-violet-400 rounded-2xl cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
          </svg>
          <p class="px-2">Divisi Baru</p>
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
            <th>Divisi</th>
            <th class="w-60">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(divisi, index) in divisionsList" :key="divisi.id" class="py-3" v-if="divisionsList.length">
            <td class="py-5">{{ index + 1 }}</td>
            <td class="py-5">{{ divisi.division }}</td>
            <td class="flex items-center py-5 justify-center">
              <button class="flex bg-blue-400 text-white p-2 rounded-sm cursor-pointer mx-2"
                @click="getDataDetail(divisi.id, divisi.division)">
                Detail
              </button>
            </td>
          </tr>
          <tr v-else>
            <td colspan="3" class="text-center py-5 text-gray-500"> Data is null </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div
    class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-7 z-20 w-150 min-h-lg bg-white rounded-2xl shadow-2xl"
    v-if="isShowCardCreateUpdate" @submit.prevent="createdData">
    <div class="header-card flex items-center justify-between py-2">
      <h1 class=" flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
        <p class="font-bold text-lg px-2">{{ titleCardCreateUpdate }}</p>
      </h1>
      <div class="btn-close flex items-center">
        <button class=" cursor-pointer" @click="togleCardCreateData(false)">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <form action="">
      <div class="body-card flex my-4">
        <div class="form w-full px-6">
          <div class="grid mb-6 gap-8">
            <div>
              <label for="" class="block mb-2">Nama Divisi</label>
              <div class="select relative block">
                <input type="text" class="w-full p-2 border-gray-400 border-1 focus:outline-0 rounded-sm"
                  placeholder="IT" v-model="formDivisi.division">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-card">
        <div class="select relative flex justify-end">
          <button type="reset" class="bg-red-600 text-white flex w-40 justify-center p-2 rounded-lg cursor-pointer mx-4"
            @click="redButtonEventeClickOnCard()">
            <p class="px-2"> {{ redButtonCardCreateUpdate }}</p>
          </button>
          <button type="submit" class="bg-blue-600 text-white flex w-40 justify-center p-2 rounded-lg cursor-pointer">
            <p class="px-2">Simpan</p>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
