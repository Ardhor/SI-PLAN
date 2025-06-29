<script setup>
import { useLocalStorage } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { deleteItemMasuk, getItemMasuk } from '../../lip/api/ItemMasukApi.js';
import { alertConfirm, alertError, alertSuccess } from '../../lip/alert.js';

const token = useLocalStorage("token", "");

const itemsMasuk = ref([]);

async function handleDelete(id) {
    if (! await alertConfirm("Are you serious to delete this Item?")) {
        return;
    }

    const respone = await deleteItemMasuk(token.value, id);
    const responseBody = await respone.json()
    console.log(responseBody)

    if (respone.status === 200) {
        await alertSuccess("Item deleted successfully");
        await fetchItemMasuk();
    } else {
        await alertError(responseBody.errors)
    }
}

async function fetchItemMasuk() {
    const response = await getItemMasuk(token.value);
    const responseBody = await response.json();
    console.log(responseBody)

    if(response.status === 200){
        itemsMasuk.value = responseBody.data
    }
}

onMounted(async () => {
    await fetchItemMasuk();
})
</script>
<template>
    <!-- component -->
    <div class="text-gray-200 bg-zinc-800 m-10 p-10 animate-fade-in">
        <div class=" flex justify-between">
            <h1 class="text-3xl">Item Masuk</h1>
            <RouterLink to="/dashboard/itemMasuk/add"
                class="flex w-20 content-center justify-center border border-green-200 text-white bg-green-600 hover:bg-green-800 hover:text-white rounded">
                <button>Tambah</button>
            </RouterLink>
        </div>
        <div class="py-4 flex justify-center">
            <table class="w-full text-md bg-zinc-800 shadow-md rounded mb-4">
                <tbody>
                    <tr class="border-b">
                        <th class="text-left p-3 ">Nama Penyetor</th>
                        <th class="text-left p-3 ">Jumlah Barang</th>
                        <th class="text-left p-3 ">Price perbarang</th>
                        <th class="text-left p-3 ">item</th>
                        <th class="text-left p-3 ">Nama Penerima</th>
                        <th class="text-right">Action</th>
                    </tr>
                    <tr v-for="listItemMasuk in itemsMasuk" :key="listItemMasuk.id"
                    class="border-b hover:bg-orange-100 hover:text-zinc-800 ">
                        <td class="w-36 p-3">
                            {{ listItemMasuk.nama_penyetor }}
                        </td>
                        <td class="p-3">
                            {{ listItemMasuk.jumlah_barang }}
                        </td>
                        <td class="p-3">
                           Rp. {{ listItemMasuk.price }}
                        </td>
                        <td class="p-3">
                            {{ listItemMasuk.item.item_name }}
                        </td>
                        <td class="p-3">
                            {{ listItemMasuk.user.name }}
                        </td>
                        <td class="flex py-3 justify-end self-center">
                            <RouterLink :to="`/dashboard/itemMasuk/${listItemMasuk.id}/edit`">
                                <button type="button"
                                    class="h-8 w-20 mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                                    Edit</button>
                            </RouterLink>
                            <button type="button" v-on:click.prevent="() => handleDelete(listItemMasuk.id)"
                                class="h-8 w-20 text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>
<style scoped></style>