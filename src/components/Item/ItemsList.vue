<script setup>
import { useLocalStorage } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { deleteItems, getItems } from '../../lip/api/ItemsApi.js';
import { alertConfirm, alertError, alertSuccess } from '../../lip/alert.js';

const token = useLocalStorage("token", "");

const items = ref([]);

async function handleDelete(id) {
    if (! await alertConfirm("Are you serious to delete this Item?")) {
        return;
    }

    const respone = await deleteItems(token.value, id);
    const responseBody = await respone.json()
    console.log(responseBody)

    if (respone.status === 200) {
        await alertSuccess("Item deleted successfully");
        await fetchItems();
    } else {
        await alertError(responseBody.errors)
    }
}

async function fetchItems() {
    const response = await getItems(token.value);
    const responseBody = await response.json()
    console.log(responseBody);

    if (response.status === 200) {
        items.value = responseBody.data;

    } else {
        console.log(responseBody)
        console.log(responseBody.errors)
    }
}

onMounted(async () => {
    await fetchItems();
})
</script>
<template>
    <!-- component -->
    <div class="text-gray-200 bg-zinc-800 m-10 p-10 animate-fade-in">
        <div class=" flex justify-between">
            <h1 class="text-3xl">Items</h1>
            <RouterLink to="/dashboard/items/add"
                class="flex w-20 content-center justify-center border border-green-200 text-white bg-green-600 hover:bg-green-800 hover:text-white rounded">
                <button>Tambah</button>
            </RouterLink>
        </div>
        <div class=" py-4 flex justify-center">
            <table class="w-full text-md bg-zinc-800 shadow-md rounded mb-4">
                <tbody>
                    <tr class="border-b">
                        <th class="text-left p-3">Nama</th>
                        <th class="text-left p-3">Kategori</th>
                        <th class="text-left p-3">Harga Beli</th>
                        <th class="text-left p-3">Harga Jual</th>
                        <th class="text-left p-3">QTY</th>
                        <th class="text-left p-3">Deskripsi</th>
                        <th class="text-left p-3">Supplier</th>
                        <th>Action</th>
                    </tr>
                    <tr v-for="item in items" :key="item.id" class="border-b hover:bg-orange-100 hover:text-zinc-800 ">
                        <td class="w-36 p-3">
                            {{ item.item_name }}
                        </td>
                        <td class="p-3">
                            {{ item.category }}
                        </td>
                        <td class="p-3">
                           Rp. {{ item.buy_price }}
                        </td>
                        <td class="p-3">
                           Rp. {{ item.sell_price }}
                        </td>
                        <td class="p-3">
                            {{ item.qty }}
                        </td>
                        <td class="w-80 p-3">
                            {{ item.description }}
                        </td>
                        <td class="p-3">
                            {{ item.supplier.name }}
                        </td>
                        <td class="p-2 px-5">
                            <RouterLink :to="`/dashboard/items/${item.id}/edit`">
                                <button type="button"
                                    class="h-8 w-20 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                                    Edit</button>
                            </RouterLink>
                            <button type="button" v-on:click.prevent="async () => handleDelete(item.id)"
                                class="h-8 w-20 text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>
<style scoped></style>