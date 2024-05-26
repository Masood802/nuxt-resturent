<template>
    <div class="flex items-center justify-start flex-col">
        <div class="w-full flex relative">
                <input type="text" v-model="coordinates" placeholder="Enter your Location" class="w-[50%] mx-auto py-2 my-4 ">
                <i class="material-icons absolute left-[75%] top-8 mx-2 cursor-pointer " @click="findLocation">my_location</i>
        </div>
    
    <div class="grid grid-cols-2 gap-4 w-[50%] ">
        <div>
            <select class="w-[80%] px-2 py-3" v-model="type">
            <option value="restaurant">Restaurant</option>
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
       Locaion Name: {{ name }}
    </div>
    </div>
    <button class="text-sm font-bold bg-pink-500 px-4 py-2 my-4 text-white rounded" 
    @click="findResturents">Find Resturent</button>
    </div>
</template>

<script setup>
import axios from "axios";
const type = ref('')
const radius =ref('')
const lat = ref(0)
const lng=ref(0)
const places = ref([])
const name = ref('')
const coordinates = computed(() => {
    return `${lat.value},${lng.value}`
})
function findLocation() {
    navigator.geolocation.getCurrentPosition(
        position => {
            
            lat.value = position.coords.latitude
            lng.value = position.coords.longitude
            getStreetAddressFrom ()
         },
        error => {
            console.log('Error getting location')
        })  
      
}
function getStreetAddressFrom() {
    const url=`https://maps.googleapis.com/maps/api/geocode/json?latlng=
        ${lat.value},${lng.value}&key=AIzaSyC4800J442xrkb5zUzGSEHA5GHHnMmccgc`
    axios.get(url)
	.then(response => {
        if (response.data.error_massage) {
            console.log(response.data.error_massage);
        }
        else
        {
            console.log(response.data.results)
            name.value = response.data.results[0].formatted_address;
        }
	}).catch(error => {
		console.log(error.message);
	});
}
function findResturents() {
    const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=cruise&location=
    ${lat.value},${lng.value}&type=${type.value}&radius=${radius.value *
        1000}&key=AIzaSyDp51TWrCe9TEG_22qFY5S2ApeVLIK1jXU`;
	axios.get(URL).then(response => {
        places.value = response.data.result;
        console.log('request sent',response)
	}).catch(error => {
		console.log(error.message);
	});
}
</script>
<style  scoped>

</style>