<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const matched = route.matched;
const parentMeta = matched.length > 1 ? matched[matched.length - 2].meta : null;
const currentMeta = matched[matched.length - 1].meta;

// console.log('Meta Induk:', parentMeta);
// console.log('Meta Anak:', currentMeta);
// console.log('Meta Anak title:', currentMeta.title);
</script>

<template>
    <div class="w-full flex items-center justify-between">
        <div class="navigation px-2">
            <span class='text-gray-400'>
                {{ parentMeta.navigation }}
            </span>
        </div>
        <div class="profil flex bg-blue-600 text-white w-60 mx-8 p-3 rounded-2xl shadow-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <p class="px-2"> Muhammad Reza Ravelinno </p>
        </div>
    </div>
</template>