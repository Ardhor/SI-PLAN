<script setup>
import { reactive } from "vue";
import { userRegister } from "../../lip/api/UserApi.js";
import { alertSuccess, alertError } from "../../lip/alert.js"
import { useRouter, RouterLink } from "vue-router";



const router = useRouter();

const user = reactive({
    username: "",
    password: "",
    confirm_password: "",
    name: ""
})

async function handleSubmit() {
    try {
        if (user.password !== user.confirm_password) {
            await alertError("Password does not match")
            return;
        }

        const response = await userRegister(user)
        const responseBody = await response.json()
        console.log(responseBody);

        if (response.status == 200) {
            await alertSuccess("User created successfully")
            await router.push({
                path: "/login"
            })
        } else {
            await alertError(responseBody.errors)
        }
    } catch (error) {
        console.error("Unhandled error:", error);
        await alertError("Terjadi kesalahan saat memproses pendaftaran.");
    }
}
</script>

<template>
    <div
        class="animate-fade-in bg-zinc-800 bg-opacity-80 p-8 rounded-xl shadow-custom border border-zinc-700 backdrop-blur-sm w-full max-w-md">
        <div class="text-center mb-8">
            <div class="inline-block p-3 bg-gradient rounded-full mb-4">
                <i class="fas fa-user-plus text-3xl text-white"></i>
            </div>
            <h1 class="text-3xl font-bold text-white">Sistem Informasi Penjualan</h1>
            <p class="text-gray-300 mt-2">Create a new account</p>
        </div>

        <form v-on:submit.prevent="handleSubmit">
            <div class="mb-4">
                <label for="username" class="block text-gray-300 text-sm font-medium mb-2">Username</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-user text-gray-500"></i>
                    </div>
                    <input type="text" id="username" name="username"
                        class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="Choose a username" required v-model="user.username">
                </div>
            </div>

            <div class="mb-4">
                <label for="name" class="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-id-card text-gray-500"></i>
                    </div>
                    <input type="text" id="name" name="name"
                        class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="Enter your full name" required v-model="user.name">
                </div>
            </div>

            <div class="mb-4">
                <label for="password" class="block text-gray-300 text-sm font-medium mb-2">Password</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-lock text-gray-500"></i>
                    </div>
                    <input type="password" id="password" name="password"
                        class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="Create a password" required v-model="user.password">
                </div>
            </div>

            <div class="mb-6">
                <label for="confirm_password" class="block text-gray-300 text-sm font-medium mb-2">Confirm
                    Password</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-check-double text-gray-500"></i>
                    </div>
                    <input type="password" id="confirm_password" name="confirm_password"
                        class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="Confirm your password" required v-model="user.confirm_password">
                </div>
            </div>

            <div class="mb-6">
                <button type="submit"
                    class="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5">
                    <i class="fas fa-user-plus mr-2"></i> Register
                </button>
            </div>

            <div class="text-center text-sm text-gray-400">
                Already have an account?
                <RouterLink to="/login"
                    class="text-red-400 hover:text-red-300 font-medium transition-colors duration-200">
                    Sign in
                </RouterLink>
            </div>
        </form>
    </div>
</template>

<style scoped></style>