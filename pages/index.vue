<template>
  <div class="text-center bg-[url('image.jpg')] bg-cover bg-opacity-80 bg-center w-full h-[1000px] flex item-center justify-center">
    <div class="flex flex-col w-full items-center h-screen">
      <h1 class="text-5xl text-amber-600 font-bold">Find <span class="text-red-600">best Places</span> near you</h1>
      <div class="w-[80%] my-3 flex flex-col items-center justify-center">
        <div class="w-full" >
              <label for="cities" class="text-lg text-white  bg-amber-300 py-2 px-5">Select City:</label>   
              <select name="cities" id="cities" 
              class="w-[30%] py-[12px] text-yellow-600 outline-none" 
              v-model="store.city" required>
              <option value="" class="text-center text-amber-300 py-2">Cities</option>
                <option v-for="city in store.cities" 
                :key="city.id" 
                :value="city.coordinates" 
                class="py-1 my-1 text-center text-lg hover:bg-neutral-300">{{ city.name }}</option>
            </select>
        </div>
        <div class="w-full mt-4 flex items-center justify-center">
            <input type="text" placeholder="search by your current location" 
            v-model="store.location"  
            class="w-[30%] py-[10px] text-yellow-600 outline-none px-4 text-lg">
            <button class="text-lg text-white  bg-amber-300 py-[10px] px-[72px] relative" @click="store.getlocation">Detect
              <i class="material-icons absolute top-[11px] text-lg">my_location</i></button>
        </div>
        <div class="w-full my-4">
              <label for="type" class="text-lg text-white  bg-blue-400 py-2 px-[48px]">Search Type:</label>   
              <select name="types" 
              class="w-[30%] py-[12px] text-yellow-600 outline-none" 
              v-model="store.selectedtype">                
              <option v-for="type in store.types" :key="type" :value="type"
              class="py-1 my-1 text-center text-lg hover:bg-neutral-300">{{ type}}</option>
            </select>
        </div>
            <button class="bg-amber-500 w-[40%] h-12 rounded text-cneter text-white text-lg font-semibold relative " 
            @click="store.searchRestaurants">Search <i class="material-icons absolute top-4 left-[57%]">search</i></button>        
        </div>
        <div v-if="store.isloading" class="flex gap-2 items-center">
              <div class="text-semibold text-center text-blue-400 text-xl">Fetching data</div>    
              <div id="loader"></div>
    </div>
                <div class="w-[60%] grid content-center align-middle my-4 mx-auto" v-else>
                  <div  class="grid grid-cols-3 gap-3 bg-white shadow-sm  bg-opacity-70 rounded px-1 my-2 py-1"
                  v-for="result in store.results" :key="result.id">
                        <div class="text-center text-xl font-semibold">{{result.title}}</div>   
                        <div class="p-1 flex items-center justify-center text-lg">Ratings: {{ result.avg_rating }} 
                          <i class="material-icons text-amber-600 text-center  text-md">star</i> </div>  
                          <button class="bg-amber-500 w-40 h-8 rounded text-white my-1" @click="store.getdetails(result.id)">
                          view more</button>
                </div>
                </div>   
  </div>
  </div>
</template>
<script setup>
import { useMainStore } from '~/stores/restaurants';
const store = useMainStore();
</script>
<style>
#loading{
  display: inline-block;
  margin:10px auto;
  width:50px;
  min-height: 50px;
  border: 3px solid orange;
  border-radius: 50%;
  border-top-color:chocolate;
  animation: spin 1s ease-in infinite;
}
@keyframes spin{
  to{ transform: rotate(360deg);}

}
#loader {
  width: 60px;
  aspect-ratio: 4;
  --_g: no-repeat radial-gradient(circle closest-side,#0fd1ebe5 90%,#0000);
  background: 
    var(--_g) 0%   50%,
    var(--_g) 50%  50%,
    var(--_g) 100% 50%;
  background-size: calc(100%/3) 100%;
  animation: dots 1s infinite linear;
}
@keyframes dots {
    33%{background-size:calc(100%/3) 0%  ,calc(100%/3) 100%,calc(100%/3) 100%}
    50%{background-size:calc(100%/3) 100%,calc(100%/3) 0%  ,calc(100%/3) 100%}
    66%{background-size:calc(100%/3) 100%,calc(100%/3) 100%,calc(100%/3) 0%  }
}
</style>

