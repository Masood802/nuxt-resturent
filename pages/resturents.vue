<template>
    <div class="flex items-center justify-start flex-col">
        <div class="w-full flex relative">
                <input type="text" v-model="coordinates" placeholder="Enter your Location" class="w-[50%] mx-auto py-2 my-4 ">
                <i class="material-icons absolute left-[75%] top-8 mx-2 cursor-pointer " @click="findLocation">my_location</i>
        </div>
    
    <div class="grid grid-cols-2 gap-4 w-[50%] ">
        <div>
            <select class="w-[80%] px-2 py-3" v-model="type">
            <option value="resturent">Resturent</option>
        </select>
        </div>
    
    <div>
        <select class="w-[80%] px-2 py-3" v-model="radius">
            <option value="5">5KM</option>
            <option value="10">10KM</option>
            <option value="15">15KM</option>
            <option value="20">20KM</option>
        </select>
    </div>
    <div>
        {{ places }}
    </div>
    </div>
    <button class="text-sm font-bold bg-pink-500 px-4 py-2 my-4 text-white rounded" 
    @click="findCloseBuyButtonPressed">Find Resturent</button>
    </div>
</template>

<script setup>
import axios from "axios";
const type = ref('')
const radius =ref('')
const lat = ref(0)
const lng=ref(0)
const places = ref([])
const name=ref('')
const coordinates = computed(() => {
    return `${lat.value},${lng.value}`
})
function findLocation() {
    navigator.geolocation.getCurrentPosition(
        position => {
            lat.value = position.coords.latitude
            lng.value = position.coords.longitude
         },
        error => {
            console.log('Error getting location')
        })
}
function findCloseBuyButtonPressed() {
    const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
        lat.value
      },${lng.value}&type=${type.value}&radius=${radius.value *
        1000}&key=AIzaSyD_fFu8jlUihqfU5u3UnAfUD7dcXf-4kwI`;
	axios.get(URL).then(response => {
        places.value = response.data.results;
        console.log(places.value)
		addLocationsToGoogleMaps();
	}).catch(error => {
		console.log(error.message);
	});
}
</script>
<style  scoped>

</style>