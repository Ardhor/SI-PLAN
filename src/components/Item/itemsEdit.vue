<script setup>
import { useLocalStorage } from '@vueuse/core';
import { onMounted, reactive, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { getSupplier, itemsDetail, updateItems } from '../../lip/api/ItemsApi.js';
import { alertError, alertSuccess } from '../../lip/alert.js';

const token = useLocalStorage("token", "");
const route = useRoute();
const {id} = route.params

const items = reactive({
    item_name: "",
    category: "",
    buy_price: "",
    sell_price: "",
    qty: "",
    description: "",
    supplierId: ""

})

async function fetchItems() {
    const response = await itemsDetail(token.value, id);
    const responseBody = await response.json();
    console.log(responseBody);

    if(response.status === 200) {
        items.item_name = responseBody.data.item_name;
        items.category = responseBody.data.category;
        items.buy_price = responseBody.data.buy_price;
        items.sell_price = responseBody.data.sell_price;
        items.qty = responseBody.data.qty;
        items.description = responseBody.data.description;
        items.supplierId = responseBody.data.supplierId;
        console.log(items.supplierId)
    } else {
        await alertError(responseBody.errors);
    }
}

const suppliers = ref([])

async function fetchSupplier() {
    const response = await getSupplier(token.value);
    const responseBody = await response.json();
    if(response.status === 200) {
        suppliers.value = responseBody.data;
        console.log(responseBody)
    } else {
        console.log(responseBody.errors)
    }   
}

async function handleEdit() {
    const response = await updateItems(token.value, id, {
        item_name: items.item_name,
        category: items.category,
        buy_price: items.buy_price,
        sell_price: items.sell_price,
        qty: items.qty,
        description: items.description,
        supplierId: items.supplierId,
    })

    const responseBody = await response.json()
    console.log(responseBody);

    if (response.status === 200){
        await alertSuccess("Edit data Successfully");
    } else {
        await alertError(responseBody.errors);
    }
}

onMounted(async () => {
    await fetchSupplier();
    await fetchItems();
})

</script>

<template>
    <div class="flex items-center m-10 p-10 justify-center">
        <RouterLink to="/dashboard/items"
            class="text-zinc-400 hover:text-white mr-4 flex items-center transition-colors duration-200">
            <i class="fas fa-arrow-left mr-2"></i> Kembali to List Item
        </RouterLink>
        <h1 class="text-2xl font-bold text-white flex items-center">
            <i class="fa-solid fa-box-open text-zinc-300 mr-3"></i> 
            Edit item baru
        </h1>
    </div>

    <div
        class="bg-zinc-800 bg-opacity-80 rounded-xl shadow-custom border border-zinc-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
        <div class="p-8">
            <form v-on:submit.prevent="handleEdit">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                        <label for="first_name" class="block text-zinc-300 text-sm font-medium mb-2">Nama Item</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-user-tag text-zinc-500"></i>
                            </div>
                            <input type="text" id="first_name" name="first_name"
                                class="w-full pl-10 pr-3 py-3 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="Enter nama item" required v-model="items.item_name">
                        </div>
                    </div>
                    <div>
                        <label for="last_name" class="block text-zinc-300 text-sm font-medium mb-2">Kategory</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-user-tag text-zinc-500"></i>
                            </div>
                            <select name="kategori" v-model="items.category"
                                class="w-full pl-10 pr-3 py-3 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" required>
                                <option disabled value="">---Select Category---</option>
                                <option value="drink">Drink</option>
                                <option value="food">Food</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                        <label for="first_name" class="block text-zinc-300 text-sm font-medium mb-2">Harga Beli</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-user-tag text-zinc-500"></i>
                            </div>
                            <input type="number" id="first_name" name="first_name"
                                class="w-full pl-10 pr-3 py-3 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="Enter harga beli" required v-model="items.buy_price">
                        </div>
                    </div>
                    <div>
                        <label for="last_name" class="block text-zinc-300 text-sm font-medium mb-2">Harga Jual</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-user-tag text-zinc-500"></i>
                            </div>
                            <input type="number" id="last_name" name="last_name"
                                class="w-full pl-10 pr-3 py-3 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="Enter harga jual" required v-model="items.sell_price">
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                        <label for="first_name" class="block text-zinc-300 text-sm font-medium mb-2">QTY</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-user-tag text-zinc-500"></i>
                            </div>
                            <input type="number" id="first_name" name="first_name"
                                class="w-full pl-10 pr-3 py-3 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="Enter QTY" required v-model="items.qty">
                        </div>
                    </div>
                    <div>
                        <label for="last_name" class="block text-zinc-300 text-sm font-medium mb-2">Supplier</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-user-tag text-zinc-500"></i>
                            </div>
                            <select name="supplier" v-model="items.supplierId"
                                class="w-full pl-10 pr-3 py-3 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" required>
                                <option disabled value="">---Select Supplier---</option>
                                <option class="text-zinc-700 hover:text-red-700" v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">
                                    {{ supplier.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="mb-5">
                    <div>
                        <label for="first_name" class="block text-zinc-300 text-sm font-medium mb-2">Deskripsi</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-user-tag text-zinc-500"></i>
                            </div>
                            <input type="text" id="first_name" name="first_name"
                                class="w-full pl-10 pr-3 py-3 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="Enter Deskripsi" required v-model="items.description">
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
                    <RouterLink to="/dashboard/items"
                        class="px-5 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-800 transition-all duration-200 flex items-center shadow-md">
                        <i class="fas fa-times mr-2"></i> Cancel
                    </RouterLink>
                    <button type="submit"
                        class="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center">
                        <i class="fas fa-plus-circle mr-2"></i> Update Item
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped></style>