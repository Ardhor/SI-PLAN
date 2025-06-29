<script setup>
import { useLocalStorage } from "@vueuse/core";
import { onBeforeMount, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { userDetail } from "../lip/api/UserApi.js";
import { alertError } from "../lip/alert.js";
const isPenjualanOpen = ref(false);
const isItemOpen = ref(false);

const token = useLocalStorage("token", "")
const name = ref("");

async function fetchUser() {
    const response = await userDetail(token.value)
    const responseBody = await response.json()
    console.log(responseBody);

    if (response.status === 200) {
        name.value = responseBody.data.name;
    } else {
        alertError(responseBody.errors)
    }
}
onBeforeMount(async () => {
    await fetchUser();
})
</script>

<template>

    <div class="bg-gradient-to-br from-zinc-900 to-zinc-800 min-h-screen flex">
        <!-- Header with right-aligned menu -->
        <header class="flex flex-col bg-gradient shadow-lg w-80 p-4 justify-between">
            <nav class=" flex flex-col space-y-2 min-w-56">
                <RouterLink to="/dashboard"
                    class="mb-10 justify-center flex hover:opacity-90 transition-opacity duration-200">
                    <img src="../assets/icon/market.png" alt="logo" class="w-10 h-10 mr-3">
                    <div class="self-center text-white font-bold text-xl">SI PLAN</div>
                </RouterLink>
                <ul class="">
                    <li class="h-10 w-15 px-2 content-center hover:text-zinc-800 text-gray-100 text-lg">
                        <RouterLink to="/dashboard" class="items-center transition-colors duration-200">
                            <i class="fas fa-user-circle mr-2"></i>
                            <span>Dashboard</span>
                        </RouterLink>
                    </li>

                    <!-- penjualan -->
                    <li id="nav-penjualan" @click="isPenjualanOpen = !isPenjualanOpen"
                        class="h-10 w-full md:w-auto px-2 content-center rounded hover:bg-white hover:text-zinc-800 text-gray-100 text-lg cursor-pointer">
                        <i class="fa-solid fa-basket-shopping mr-2"></i>
                        <span>Penjualan</span>
                        <i class="ml-16 fa-regular fa-square-caret-down"></i>
                    </li>
                    <div :class="isPenjualanOpen ? 'flex' : 'hidden'"
                        class="flex flex-col transition-all duration-300 ease-in-out animate-fade-in">
                        <li class="ml-8 h-10 px-2 content-center  hover:text-zinc-800 text-gray-100 text-md">
                            <RouterLink to="/dashboard/penjualan" class="items-center transition-colors duration-200">
                                <span>Penjualan</span>
                            </RouterLink>
                        </li>
                        <!-- <li class="ml-8 h-10 px-2 content-center hover:text-zinc-800 text-gray-100 text-md">
                            <RouterLink to="/dashboard/pembayaran" class="items-center transition-colors duration-200">
                                <span>Pembayaran</span>
                            </RouterLink>
                        </li> -->
                    </div>

                    <!-- item -->
                    <li @click="isItemOpen = !isItemOpen"
                        class="h-10 px-2 content-center rounded hover:bg-white hover:text-zinc-800 text-gray-100 text-lg cursor-pointer">
                        <i class="fa-solid fa-boxes-stacked mr-2"></i>
                        <span>Item</span>
                        <i class="ml-28 fa-regular fa-square-caret-down"></i>
                    </li>
                    <div :class="isItemOpen ? 'flex' : 'hidden'"
                        class="flex flex-col transition-all duration-300 ease-in-out animate-fade-in">
                        <li class="ml-8 h-10 px-2 content-center hover:text-zinc-800 text-gray-100 text-md">
                            <RouterLink to="/dashboard/items" class="items-center transition-colors duration-200">
                                <span>Items</span>
                            </RouterLink>
                        </li>
                        <li class="ml-8 h-10 px-2 content-center hover:text-zinc-800 text-gray-100 text-md">
                            <RouterLink to="/dashboard/itemMasuk" class="items-center transition-colors duration-200">
                                <span>Item Masuk</span>
                            </RouterLink>
                        </li>
                        <li class="ml-8 h-15 px-2 content-center rounded hover:text-zinc-800 text-gray-100 text-md">
                            <RouterLink to="/dashboard/pembayaranItemMasuk"
                                class="items-center transition-colors duration-200">
                                <span>Pembayaran item masuk</span>
                            </RouterLink>
                        </li>
                    </div>
                    <li class="h-10 px-2 content-center hover:text-zinc-800 text-gray-100 text-lg">
                        <RouterLink to="/dashboard/supplier" class="items-center transition-colors duration-200">
                            <i class="fa-solid fa-building mr-2"></i>
                            <span>Supplier</span>
                        </RouterLink>
                    </li>
                </ul>
            </nav>

            <!-- sidebar bottom -->
            <div class="">
                <div
                    class="flex flex-col px-2 content-center rounded hover:bg-white hover:text-zinc-800 text-gray-100 text-lg">
                    <RouterLink to="/dashboard/users/profile" class="flex items-center transition-colors duration-200">
                        <div class="pl-3 justify-center">
                            <i class="fa-regular fa-user mr-5 self-center"></i>
                        </div>
                        <div>
                            <span class="underline" v-text="name"></span>
                        </div>
                    </RouterLink>
                </div>
                <div class="flex flex-col px-5 content-center rounded text-gray-100 text-lg">
                    <RouterLink to="/dashboard/users/logout"
                        class="flex hover:text-zinc-800 items-center transition-colors duration-200">
                        <i class="mr-4 fas fa-sign-out-alt mr-2"></i>
                        <span>Logout</span>
                    </RouterLink>
                </div>
            </div>
        </header>
        <main class="w-full text-zinc-400 text-sm animate-fade-in">
            <RouterView />

            <!-- Footer
            <div class=" text-center px-4 py-4 text-zinc-400 text-sm animate-fade-in">
                <p>© 2025 Contact Management. All rights reserved.</p>
            </div>
            <div class="text-white">
                <h1>Ayam</h1>
            </div> -->
        </main>
    </div>
</template>

<style scoped></style>