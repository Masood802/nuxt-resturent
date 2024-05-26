<template>
    <div class="grid grid-cols-2 gap-4 w-full my-12 h-72">
        <div class="bg-white shadow-sm mx-2 w-full">
            <img :src=item.image alt="Show-image" class="w-full h-[400px] p-2">
        </div>
        <div class="bg-white mx-2 text-left px-4">
            <h1 class="text-xl font-semibold text-amber-500">{{item.title}}</h1>
            <h2 class="text-lg"> Address: {{ item.address }}</h2>
            <h3 class="text-lg">Rating: {{ item.avg_rating }} <i class="material-icons text-[18px] text-amber-500 ">star</i></h3>
            <p class="text-lg">Status & Timings: {{ item.description }}</p>
            <p class="text-lg">Coordinates: {{ item.latitude }},{{ item.longitude }}</p>
            <h4>{{ store.selected }}</h4>
        </div>
    </div>
    <NuxtLink to="/">
        <button class="w-[50%] grid content-center mx-auto bg-amber-500 h-10 text-white my-32">
        Go Back</button>
    </NuxtLink>
</template>

<script setup>
import { useMainStore } from '~/stores/restaurants';
const store = useMainStore();
const item = store.selected;
</script>

<style scoped>

</style>