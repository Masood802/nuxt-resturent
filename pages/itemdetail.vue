<template>
    
    <div class="grid grid-cols-1 gap-4 w-[50%]  h-52 relative mx-auto place-items-center text-center">
        <div class="bg-white mx-2 text-left px-4 flex flex-col items-center">  
            <img :src=item.image alt="Show-image" id="img"  v-if="item.image">
            <div v-else class="relative">
                <img src="../public/noimage.jpg" alt="" id="img" >
                <p class="absolute bottom-0 left-36 text-white">No Image Available</p>
            </div>     
            <h1 class="text-xl font-semibold text-amber-500">{{item.title}}</h1>
            <h2 class="text-lg"> Address: {{ item.address }}</h2>
            <h3 class="text-lg">Rating: {{ item.avg_rating }} <i class="material-icons text-[18px] text-amber-500 ">star</i></h3>
            <p class="text
            -lg">Status & Timings: {{ item.description }}</p>
            <p class="text-lg">Coordinates: {{ item.latitude }},{{ item.longitude }}</p>
            <NuxtLink to="/" class="w-32 mt-2 bg-amber-500 h-10 text-white px-4 py-1 my-2 flex items-center justify-center" >   
        Go Back</NuxtLink>
        </div>
        <!-- <div class="bg-white mx-2 text-left col-span-2 rounded px-1 my-2 py-1"> 
        <div v-for="result in store.results" :key="result.id" class="grid grid-cols-4 gap-3 place-items-center mx-auto py-1 my-4 bg-slate-50 bg-opacity-50 ">
                        <div class="text-center text-xl font-semibold">{{result.title}}</div>   
                        <img :src=result.image alt="Image not Available" class="w-40 h-20 p-1">
                        <div class="p-1 flex items-center justify-center text-lg">Ratings: {{ result.avg_rating }} 
                          <i class="material-icons text-amber-600 text-center  text-md">star</i> </div>  
                          <button class="bg-amber-500 w-40 h-8 rounded text-white my-1" @click="showdetails(result.id)">
                          Show Detail</button>
        </div>              
        </div> -->
    
    </div>
    
</template>

<script setup>
import { useMainStore } from '~/stores/restaurants';
const store = useMainStore();
let item = store.selected;
const showdetails = (id) => {
    item = store.results.find((x) => x.id === id)
    console.log(item)

}
</script>

<style scoped>
#img{
    width:400px;
    height:200px;
    margin:10px;
}
</style>