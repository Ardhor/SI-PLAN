<script setup>
import { reactive } from "vue";
import { userLogin } from "../../lip/api/UserApi.js";
import { alertSuccess, alertError } from "../../lip/alert.js"
import { useRouter, RouterLink } from "vue-router";
import {useLocalStorage} from "@vueuse/core";

const router = useRouter();
const token = useLocalStorage("token", "");
const user = reactive({
    username: "",
    password: ""
})

async function handleLogin() {
    try {
        const response = await userLogin(user)
        const responseBody = await response.json()
        if(response.status === 200) {
            token.value = responseBody.data.token;
            await router.push({
                path: "/dashboard/penjualan"
            })
        } else {
            await alertError(responseBody.errors)
        }
    } catch (error) {
        console.error("Unhandled Error:", error)
        await alertError("Terjadi kesalahan saat login")
    }
}

</script>
<template>
    <div
        class="animate-fade-in bg-zinc-800 bg-opacity-80 p-8 rounded-xl shadow-custom border border-zinc-700 backdrop-blur-sm w-full max-w-md">
        <div class="text-center mb-8">
            <div class="inline-block p-3 bg-gradient rounded-full mb-4">
                <img src="../../assets/icon/market.png" alt="logo" class="w-16">
            </div>
            <h1 class="text-3xl font-bold text-white">SI PLAN</h1>
            <p class="text-gray-300 mt-2">Sign in to your account</p>
        </div>

        <form v-on:submit.prevent="handleLogin">
            <div class="mb-5">
                <label for="username" class="block text-gray-300 text-sm font-medium mb-2">Username</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-user text-gray-500"></i>
                    </div>
                    <input type="text" id="username" name="username"
                        class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="Enter your username" required v-model="user.username">
                </div>
            </div>

            <div class="mb-6">
                <label for="password" class="block text-gray-300 text-sm font-medium mb-2">Password</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-lock text-gray-500"></i>
                    </div>
                    <input type="password" id="password" name="password"
                        class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="Enter your password" required v-model="user.password">
                </div>
            </div>

            <div class="mb-6">
                <button type="submit"
                    class="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5">
                    <i class="fas fa-sign-in-alt mr-2"></i> Sign In
                </button>
            </div>

            <div class="text-center text-sm text-gray-400">
                Don't have an account?
                <RouterLink to="/register"
                    class="text-red-400 hover:text-red-300 font-medium transition-colors duration-200">Sign up</RouterLink>
            </div>
        </form>
    </div>
</template>
<style scoped></style>