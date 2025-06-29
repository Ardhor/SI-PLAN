<script setup>
import { useLocalStorage } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { alertConfirm, alertError, alertSuccess } from '../../lip/alert.js';
import { deletePenjualan, getPenjualan } from '../../lip/api/PenjualanApi.js';

const token = useLocalStorage("token", "");

const penjualan = ref([]);

async function handleDelete(id) {
    if (! await alertConfirm("Are you serious to delete this Penjualan?")) {
        return;
    }

    const respone = await deletePenjualan(token.value, id);
    const responseBody = await respone.json()
    console.log(responseBody)

    if (respone.status === 200) {
        await alertSuccess("Penjualan deleted successfully");
        await fetchPenjualan();
    } else {
        await alertError(responseBody.errors)
    }
}

async function fetchPenjualan() {
    const response = await getPenjualan(token.value);
    const responseBody = await response.json()
    console.log(responseBody);

    if (response.status === 200) {
        penjualan.value = responseBody.data;

    } else {
        console.log(responseBody)
        console.log(responseBody.errors)
    }
}

onMounted(async () => {
    await fetchPenjualan();
})

// Format tanggal
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('id-ID', options)
}

const formatPrice = (value) => {
    if (!value) return '0';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
</script>
<template>
    <!-- component -->
    <div class="text-gray-200 bg-zinc-800 m-10 p-10 animate-fade-in">
        <div class=" flex justify-between">
            <h1 class="text-3xl">Penjualan</h1>
            <RouterLink to="/dashboard/penjualan/add"
                class="flex w-20 content-center justify-center border border-green-200 text-white bg-green-600 hover:bg-green-800 hover:text-white rounded">
                <button>Tambah</button>
            </RouterLink>
        </div>
        <div class=" py-4 flex justify-center">
            <table class="w-full text-md bg-zinc-800 shadow-md rounded mb-4">
                <tbody>
                    <tr class="border-b">
                        <th class="text-left p-3">Tanggal </th>
                        <th class="text-left p-3">Total</th>
                        <th class="text-left p-3">Items</th>
                        <th class="text-left p-3">Metode Pembayaran</th>
                        <th class="text-left p-3">Status Pembayaran</th>
                        <th class="text-left p-3">Keterangan</th>
                        <th>Action</th>
                    </tr>
                    <tr v-for="listPenjualan in penjualan" :key="listPenjualan.id"
                        class="border-b hover:bg-orange-100 hover:text-zinc-800 ">
                        <td class="w-36 p-3">
                            {{ formatDate(listPenjualan.tanggal) }}
                        </td>
                        <td class="p-3">
                            Rp. {{ formatPrice(listPenjualan.total) }}
                        </td>
                        <td class="p-3">
                            <ul>
                                <li v-for="(item, index) in listPenjualan.penjualanItems" :key="index">
                                    {{ item.items.item_name }} (x{{ item.qty }}) - Rp. {{ formatPrice(item.price) }}
                                </li>
                            </ul>
                        </td>
                        <td class="p-3">
                            {{ listPenjualan.pembayaran[0].metodePembayaran }}
                        </td>
                        <td class="p-3">
                            {{ listPenjualan.pembayaran[0].statusPembayaran }}
                        </td>
                        <td class="w-80 p-3">
                            {{ listPenjualan.pembayaran[0].keterangan }}
                        </td>
                        <td class="p-2 px-5">
                            <RouterLink :to="`/dashboard/penjualan/${listPenjualan.id}/edit`">
                                <button type="button"
                                    class="h-8 w-20 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                                    Edit</button>
                            </RouterLink>
                            <button type="button" v-on:click.prevent="async () => handleDelete(listPenjualan.id)"
                                class="h-8 w-20 text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>
<style scoped></style>