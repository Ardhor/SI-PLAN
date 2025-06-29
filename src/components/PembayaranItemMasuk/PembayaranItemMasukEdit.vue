<script setup>
import { useLocalStorage } from '@vueuse/core';
import { onMounted, reactive, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { alertError, alertSuccess } from '../../lip/alert.js';
import { getItemMasuk } from '../../lip/api/ItemMasukApi.js';
import { detailPembayaranItemMasuk, pembayaranItemMasukAdd, updatePembayaranItemMasuk } from '../../lip/api/PembayaranItemMasukApi.js';

const token = useLocalStorage("token", "");
const route = useRoute();
const {id} = route.params;

const pembayaranItemMasuk = reactive({
    metodePembayaran: "",
    statusPembayaran: "",
    itemMasukId: ""

})

const itemMasuk = ref([])

onMounted(async () => {
    const response = await getItemMasuk(token.value);
    const responseBody = await response.json();
    if(response.status === 200) {
        itemMasuk.value = responseBody.data;
        console.log(responseBody)
    } else {
        console.log(responseBody.errors)
    }

    await fetchPembayaranItemMasuk();
})

async function handlerEditPembayaranItemMasuk() {
    const response = await updatePembayaranItemMasuk(token.value, id, {
        metodePembayaran: pembayaranItemMasuk.metodePembayaran,
        statusPembayaran: pembayaranItemMasuk.statusPembayaran,
        itemMasukId: pembayaranItemMasuk.itemMasukId
    })

    const responseBody = await response.json();
    console.log(responseBody);

    if(response.status === 200){
        await alertSuccess("Edit pembayaran item masuk Successfully")
    } else {
        await alertError(responseBody.errors)
    }
}

async function fetchPembayaranItemMasuk() {
    const response  = await detailPembayaranItemMasuk(token.value, id);
    const responseBody = await response.json();

    if (response.status === 200){
        pembayaranItemMasuk.metodePembayaran = responseBody.data.metodePembayaran;
        pembayaranItemMasuk.statusPembayaran = responseBody.data.statusPembayaran;
        pembayaranItemMasuk.itemMasukId = responseBody.data.itemMasukId;
    }
}

</script>

<template>
    <div class="flex items-center m-10 p-10 justify-center">
        <RouterLink to="/dashboard/pembayaranItemMasuk"
            class="text-zinc-400 hover:text-white mr-4 flex items-center transition-colors duration-200">
            <i class="fas fa-arrow-left mr-2"></i> Kembali to List Item
        </RouterLink>
        <h1 class="text-2xl font-bold text-white flex items-center">
            <i class="fa-solid fa-box-open text-zinc-300 mr-3"></i> 
            Edit Pembayaran item masuk
        </h1>
    </div>

    <div
        class="bg-zinc-800 bg-opacity-80 rounded-xl shadow-custom border border-zinc-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
        <div class="p-8">
            <form v-on:submit.prevent="handlerEditPembayaranItemMasuk">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                        <label for="last_name" class="block text-zinc-300 text-sm font-medium mb-2">Metode Pembayaran</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-user-tag text-zinc-500"></i>
                            </div>
                            <select name="kategori" v-model="pembayaranItemMasuk.metodePembayaran"
                                class="w-full pl-10 pr-3 py-3 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" required>
                                <option disabled value="">-Select Metode Pembayaran-</option>
                                <option value="Cash">Cash</option>
                                <option value="Qris">Qris</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label for="last_name" class="block text-zinc-300 text-sm font-medium mb-2">Status Pembayaran</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-user-tag text-zinc-500"></i>
                            </div>
                            <select name="kategori" v-model="pembayaranItemMasuk.statusPembayaran"
                                class="w-full pl-10 pr-3 py-3 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" required>
                                <option disabled value="">-Select Status Pembayaran-</option>
                                <option value="success">Success</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-1 gap-5 mb-5">
                    <div>
                        <label for="last_name" class="block text-zinc-300 text-sm font-medium mb-2">Item Masuk</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-user-tag text-zinc-500"></i>
                            </div>
                            <select name="kategori" v-model="pembayaranItemMasuk.itemMasukId"
                                class="w-full pl-10 pr-3 py-3 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" required>
                                <option disabled value="">---Select Item Masuk---</option>
                                <option class="text-zinc-700 hover:text-red-700" v-for="listItemMasuk in itemMasuk" :key="listItemMasuk.id" :value="listItemMasuk.id">
                                    {{ listItemMasuk.item.item_name }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            
                <div class="flex justify-end space-x-4">
                    <RouterLink to="/dashboard/pembayaranItemMasuk"
                        class="px-5 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-800 transition-all duration-200 flex items-center shadow-md">
                        <i class="fas fa-times mr-2"></i> Cancel
                    </RouterLink>
                    <button type="submit"
                        class="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center">
                        <i class="fas fa-plus-circle mr-2"></i> Tambah Item
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped></style>