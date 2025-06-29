<script setup>
import { useLocalStorage } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { deleteSupplier, getSupplier } from '../../lip/api/SupplierApi.js';
import { alertConfirm, alertError, alertSuccess } from '../../lip/alert.js';

const token = useLocalStorage("token", "");

const suppliers = ref([]);

async function handleDelete(id) {
    if (! await alertConfirm("Are you want to delete this supplier?")) {
        return;
    }

    const respone = await deleteSupplier(token.value, id);
    const responseBody = await respone.json();
    console.log(responseBody);

    if (respone.status === 200) {
        await alertSuccess("Contact deleted successfully");
        await fetchSupplier();
    } else {
        await alertError(responseBody.errors)
    }
}

async function fetchSupplier() {
    const response = await getSupplier(token.value);
    const responseBody = await response.json()
    console.log(responseBody);

    if (response.status === 200) {
        suppliers.value = responseBody.data;

    } else {
        console.log(responseBody.errors)
    }
}

onMounted(async () => {
    await fetchSupplier();
})

</script>
<template>
    <!-- component -->
    <div class="text-gray-200 bg-zinc-800 m-10 p-10 animate-fade-in">
        <div class=" flex justify-between">
            <h1 class="text-3xl">Supplier</h1>
            <RouterLink to="/dashboard/supplier/add"
                class="flex w-20 content-center justify-center border border-green-200 text-white bg-green-600 hover:bg-green-800 hover:text-white rounded">
                <button>Tambah</button>
            </RouterLink>
        </div>
        <div class=" py-4 flex justify-center">
            <table class="w-full text-md bg-zinc-800 shadow-md rounded mb-4">
                <tbody>
                    <tr class="border-b">
                        <th class="text-left p-3 px-5">Nama</th>
                        <th class="text-left p-3 px-5">Telepon</th>
                        <th class="text-right">Action</th>
                    </tr>
                    <tr v-for="supplier in suppliers" :key="supplier.id"
                        class="border-b hover:bg-orange-100 hover:text-zinc-800 ">
                        <td class="w-36 p-3 px-5">
                            {{ supplier.name }}
                        </td>
                        <td class="p-3 px-5">
                            {{ supplier.no_telepon }}
                        </td>
                        <td class="py-3 flex justify-end self-center">
                            <RouterLink :to="`/dashboard/supplier/${supplier.id}/edit`">
                                <button type="button"
                                    class="h-8 w-20 mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</button>
                            </RouterLink>
                            <button type="button" v-on:click.prevent="async () => handleDelete(supplier.id)"
                                class="h-8 w-20 text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>
<style scoped></style>