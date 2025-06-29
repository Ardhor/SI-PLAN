<script setup>
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';
import { supplierAdd } from '../../lip/api/SupplierApi.js';
import { alertError, alertSuccess } from '../../lip/alert.js';
import { useLocalStorage } from '@vueuse/core';

const token = useLocalStorage("token", "");

const supplier = reactive({
    name : "",
    no_telepon : ""
})

async function handleSupplierAdd() {
    const response = await supplierAdd(token.value, {name : supplier.name, no_telepon : supplier.no_telepon});
    const responseBody = await response.json();
    console.log(responseBody);

    if(response.status === 200) {
        await alertSuccess("Add Supplier successfully")
    } else {
        await alertError(responseBody.errors)
    }
}
</script>

<template>
    <div class="flex items-center m-10 p-10 justify-center">
        <RouterLink to="/dashboard/supplier"
            class="text-zinc-400 hover:text-white mr-4 flex items-center transition-colors duration-200">
            <i class="fas fa-arrow-left mr-2"></i> Kembali to List Item
        </RouterLink>
        <h1 class="text-2xl font-bold text-white flex items-center">
            <i class="fa-solid fa-box-open text-zinc-300 mr-3"></i> 
            Tambah supplier baru
        </h1>
    </div>

    <div
        class="bg-zinc-800 bg-opacity-80 rounded-xl shadow-custom border border-zinc-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
        <div class="p-8">
            <form v-on:submit.prevent="handleSupplierAdd">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                        <label for="first_name" class="block text-zinc-300 text-sm font-medium mb-2">Nama Supplier</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-user-tag text-zinc-500"></i>
                            </div>
                            <input type="text" id="first_name" name="first_name"
                                class="w-full pl-10 pr-3 py-3 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="Enter nama supplier" required v-model="supplier.name">
                        </div>
                    </div>
                    <div>
                        <label for="first_name" class="block text-zinc-300 text-sm font-medium mb-2">No Telepon</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-user-tag text-zinc-500"></i>
                            </div>
                            <input type="text" id="first_name" name="first_name"
                                class="w-full pl-10 pr-3 py-3 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="Enter No Telepon" required v-model="supplier.no_telepon">
                        </div>
                    </div>
                </div>
                <!-- <div class="mb-5">
                    <label for="email" class="block text-zinc-300 text-sm font-medium mb-2">Email</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i class="fas fa-envelope text-zinc-500"></i>
                        </div>
                        <input type="email" id="email" name="email"
                            class="w-full pl-10 pr-3 py-3 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            placeholder="Enter email address" required>
                    </div>
                </div>

                <div class="mb-6">
                    <label for="phone" class="block text-zinc-300 text-sm font-medium mb-2">Phone</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i class="fas fa-phone text-zinc-500"></i>
                        </div>
                        <input type="tel" id="phone" name="phone"
                            class="w-full pl-10 pr-3 py-3 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            placeholder="Enter phone number" required>
                    </div>
                </div> -->

                <div class="flex justify-end space-x-4">
                    <RouterLink to="/dashboard/supplier"
                        class="px-5 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-800 transition-all duration-200 flex items-center shadow-md">
                        <i class="fas fa-times mr-2"></i> Cancel
                    </RouterLink>
                    <button type="submit"
                        class="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center">
                        <i class="fas fa-plus-circle mr-2"></i> Tambah Supplier
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped></style>