<template>
  <div class="text-center bg-[url('bg.jpg')] bg-cover bg-center w-full min-h-screen bg-fixed bg-opacity-20 flex item-center justify-center">
    <div class="flex flex-col w-full items-center h-screen">
      <h1 class="text-5xl text-amber-600 font-bold">Find <span class="text-red-600">best Resuturents</span> near you</h1>
      <div class="w-[80%] my-2 ">
            <USelect 
            class="w-[30%]"
            :options="cities"
            />
            <button class="text-center bg-neutral-300 py-3 px-4 rounded-e">Detect</button>   
             <USelect 
            class="w-[30%]"
            :options="search"
            />
            <button class="bg-amber-500 py-3 px-4 rounded-e">Search</button> 
             
          </div>
    </div>
  </div>
</template>

<script setup>
import USelect from 'nvd-u/components/USelect.vue';

const cities=['Lahore','karachi','Islamabad','Rawalpindi','Rahimyarkhan']
</script>

<style>

</style>