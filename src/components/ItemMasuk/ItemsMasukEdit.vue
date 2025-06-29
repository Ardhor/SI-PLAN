<script setup>
import { useLocalStorage } from '@vueuse/core';
import { onMounted, reactive, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { alertError, alertSuccess } from '../../lip/alert.js';
import { getItems } from '../../lip/api/ItemsApi.js';
import { detailItemMasuk, itemMasukAdd, updateItemMasuk } from '../../lip/api/ItemMasukApi.js';
import { userDetail } from '../../lip/api/UserApi.js';

const token = useLocalStorage("token", "");
const route = useRoute();
const {id} = route.params;

const itemMasuk = reactive({
    nama_penyetor: "",
    jumlah_barang: 1,
    price: 1,
    itemId: '',
})

const items = ref([])

onMounted(async () => {
    await fetchItems();
    await fetchUser();
    await fetchItemMasuk();
})

async function handleEditItemMasuk() {
    const response = await updateItemMasuk(token.value, id, {
        nama_penyetor: itemMasuk.nama_penyetor,
        jumlah_barang: itemMasuk.jumlah_barang,
        price: itemMasuk.price,
        itemId: itemMasuk.itemId,
    })

    const responseBody = await response.json();
    console.log(responseBody);

    if(response.status === 200){
        await alertSuccess("Edit item masuk Successfully")
    } else {
        await alertError(responseBody.errors)
    }
}

async function fetchUser() {
    const response = await userDetail(token.value)
    const responseBody = await response.json()
    console.log("fetch user:", responseBody);
    if(response.status === 200){
        itemMasuk.username = responseBody.data.username
    } else {
        await alertError(responseBody.errors)
    }
}

async function fetchItems() {
    const response = await getItems(token.value);
    const responseBody = await response.json();
    if(response.status === 200) {
        items.value = responseBody.data;
        console.log(responseBody)
    } else {
        console.log(responseBody.errors)
    }
}

async function fetchItemMasuk() {
    const response = await detailItemMasuk(token.value, id);
    const responseBody = await response.json()
    console.log(responseBody);

    if(response.status === 200){
        itemMasuk.nama_penyetor = responseBody.data.nama_penyetor;
        itemMasuk.jumlah_barang = responseBody.data.jumlah_barang;
        itemMasuk.price = responseBody.data.price;
        itemMasuk.itemId = responseBody.data.itemId;
    }
}


</script>

<template>
    <div class="flex items-center m-10 p-10 justify-center">
        <RouterLink to="/dashboard/itemMasuk"
            class="text-zinc-400 hover:text-white mr-4 flex items-center transition-colors duration-200">
            <i class="fas fa-arrow-left mr-2"></i> Kembali to List Item Masuk
        </RouterLink>
        <h1 class="text-2xl font-bold text-white flex items-center">
            <i class="fa-solid fa-box-open text-zinc-300 mr-3"></i> 
            Edit item masuk
        </h1>
    </div>

    <div
        class="bg-zinc-800 bg-opacity-80 rounded-xl shadow-custom border border-zinc-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
        <div class="p-8">
            <form v-on:submit.prevent="handleEditItemMasuk">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                        <label for="first_name" class="block text-zinc-300 text-sm font-medium mb-2">Nama Penyetor</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-user-tag text-zinc-500"></i>
                            </div>
                            <input type="text" id="first_name" name="first_name"
                                class="w-full pl-10 pr-3 py-3 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="Enter nama item" required v-model="itemMasuk.nama_penyetor">
                        </div>
                    </div>
                    <div>
                        <label for="first_name" class="block text-zinc-300 text-sm font-medium mb-2">Jumlah Barang</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-user-tag text-zinc-500"></i>
                            </div>
                            <input type="text" id="first_name" name="first_name"
                                class="w-full pl-10 pr-3 py-3 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="Enter nama item" required v-model="itemMasuk.jumlah_barang">
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                        <label for="last_name" class="block text-zinc-300 text-sm font-medium mb-2">Item</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-user-tag text-zinc-500"></i>
                            </div>
                            <select name="kategori" v-model="itemMasuk.itemId"
                                class="w-full pl-10 pr-3 py-3 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" required>
                                <option disabled value="">---Select Items---</option>
                                <option v-for="item in items" :key="item.id" :value="item.id">
                                    {{ item.item_name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label for="first_name" class="block text-zinc-300 text-sm font-medium mb-2">Price</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-user-tag text-zinc-500"></i>
                            </div>
                            <input type="number" id="first_name" name="first_name"
                                class="w-full pl-10 pr-3 py-3 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="Enter harga beli" required v-model="itemMasuk.price">
                        </div>
                    </div>
                </div>
                <!-- <div class="mb-5">
                    <div>
                        <label for="first_name" class="block text-zinc-300 text-sm font-medium mb-2">Username Penerima</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-user-tag text-zinc-500"></i>
                            </div>
                            <input type="text" id="first_name" name="first_name"
                                class="w-full pl-10 pr-3 py-3 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="Enter Deskripsi" disabled required v-model="itemMasuk.username">
                        </div>
                    </div>
                </div> -->

                <div class="flex justify-end space-x-4">
                    <RouterLink to="/dashboard/itemMasuk"
                        class="px-5 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-800 transition-all duration-200 flex items-center shadow-md">
                        <i class="fas fa-times mr-2"></i> Cancel
                    </RouterLink>
                    <button type="submit"
                        class="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center">
                        <i class="fas fa-plus-circle mr-2"></i> Edit Item Masuk
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped></style>