<script setup>
import { useLocalStorage } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { alertConfirm, alertError, alertSuccess } from '../../lip/alert.js';
import { deletePembayaranItemMasuk, getPembayaranItemMasuk } from '../../lip/api/PembayaranItemMasukApi.js';

const token = useLocalStorage("token", "");

const pembayaranItemMasuk = ref([]);

async function handleDelete(id) {
    if (! await alertConfirm("Are you serious to delete this Pembayaran Item Masuk?")) {
        return;
    }

    const respone = await deletePembayaranItemMasuk(token.value, id);
    const responseBody = await respone.json()
    console.log(responseBody)

    if (respone.status === 200) {
        await alertSuccess("Pembayaran Item Masuk deleted successfully");
        await fetchPembayaranItemMasuk();
    } else {
        await alertError(responseBody.errors)
    }
}

async function fetchPembayaranItemMasuk() {
    const response = await getPembayaranItemMasuk(token.value);
    const responseBody = await response.json();
    console.log(responseBody)

    if(response.status === 200){
        pembayaranItemMasuk.value = responseBody.data
    }
}

onMounted(async () => {
    await fetchPembayaranItemMasuk();
})
</script>
<template>
    <!-- component -->
    <div class="text-gray-200 bg-zinc-800 m-10 p-10 animate-fade-in">
        <div class=" flex justify-between">
            <h1 class="text-3xl">Pembayaran Item Masuk</h1>
            <RouterLink to="/dashboard/pembayaranItemMasuk/add"
                class="flex w-20 content-center justify-center border border-green-200 text-white bg-green-600 hover:bg-green-800 hover:text-white rounded">
                <button>Tambah</button>
            </RouterLink>
        </div>
        <div class="py-4 flex justify-center">
            <table class="w-full text-md bg-zinc-800 shadow-md rounded mb-4">
                <tbody>
                    <tr class="border-b">
                        <th class="text-left p-3 ">Item Masuk</th>
                        <th class="text-left p-3 ">Total Pembayaran</th>
                        <th class="text-left p-3 ">Metode Pembayaran</th>
                        <th class="text-left p-3 ">Status Pembayaran</th>
                        <th class="text-right">Action</th>
                    </tr>
                    <tr v-for="listPembayaranItemMasuk in pembayaranItemMasuk" :key="listPembayaranItemMasuk.id"
                    class="border-b hover:bg-orange-100 hover:text-zinc-800 ">

                        <td class="p-3">
                            {{ listPembayaranItemMasuk.itemMasuk.item.item_name }}
                        </td>
                        <td class="w-36 p-3">
                            {{ listPembayaranItemMasuk.totalPembayaran }}
                        </td>
                        <td class="p-3">
                            {{ listPembayaranItemMasuk.metodePembayaran }}
                        </td>
                        <td class="p-3">
                            {{ listPembayaranItemMasuk.statusPembayaran }}
                        </td>
                        
                        <td class="flex py-3 justify-end self-center">
                            <RouterLink :to="`/dashboard/pembayaranItemMasuk/${listPembayaranItemMasuk.id}/edit`">
                                <button type="button"
                                    class="h-8 w-20 mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                                    Edit</button>
                            </RouterLink>
                            <button type="button" v-on:click.prevent="handleDelete(listPembayaranItemMasuk.id)"
                                class="h-8 w-20 text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>
<style scoped></style>