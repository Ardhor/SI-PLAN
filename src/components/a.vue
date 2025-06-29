<script setup>
    
</script>

<template>
    <div class="min-h-screen flex">
        <!-- Sidebar -->
        <div class="bg-zinc-800 w-64 border-r shadow-sm">
            <!-- Sidebar Header -->
            <div class="p-4 border-b">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <img src="../assets/icon/market.png" alt="Logo" class="h-8 w-8">
                        <span class="text-lg font-semibold text-white">SI PLAN</span>
                    </div>
                    <button class="text-gray-500 hover:text-gray-600 lg:hidden">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Sidebar Content -->
            <div class="py-4">
                <!-- Navigation Section -->
                <div class="px-4 mb-4">
                    <h2 class="text-xs font-semibold text-white uppercase tracking-wider">Navigation</h2>
                    <nav class="mt-2 space-y-1">
                        <a href="#"
                            class="flex items-center px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-zinc-800 rounded-lg">
                            <img src="../assets/icon/home.png" class="h-5 w-5 mr-3" alt="Dashboard">
                            Dashboard
                        </a>

                        <!-- Collapsible Menu Item -->
                        <div class="relative">
                            <button
                                class="w-full flex items-center px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-zinc-800  rounded-lg">
                                <img src="../assets/icon/shopping-cart.png" class="h-5 w-5 mr-3 ">
                                Penjualan
                                <svg class="ml-auto h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                            <!-- Submenu -->
                            <div class="mt-1 pl-11 space-y-1">
                                <!-- <a href="#"
                                    class="block px-4 py-2 text-sm text-white hover:bg-gray-50 rounded-lg">Penjualan Item</a> -->
                                <a href="#"
                                    class="block px-4 py-2 text-sm text-white hover:bg-white hover:text-zinc-800 rounded-lg">Penjualan</a>
                                <a href="#"
                                    class="block px-4 py-2 text-sm text-white hover:bg-white hover:text-zinc-800 rounded-lg">Pembayaran</a>
                            </div>
                        </div>
                        <!-- Collapsible Menu Item -->
                        <div class="relative">
                            <button
                                class="w-full flex items-center px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-zinc-800 rounded-lg">
                                <img src="../assets/icon/product.png" class="h-5 w-5 mr-3" alt="items">
                                Items
                                <svg class="ml-auto h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                            <!-- Submenu -->
                            <div class="mt-1 pl-11 space-y-1">
                                <a href="#"
                                    class="block px-4 py-2 text-sm text-white hover:bg-white hover:text-zinc-800 rounded-lg">Item</a>
                                <a href="#"
                                    class="block px-4 py-2 text-sm text-white hover:bg-white hover:text-zinc-800 rounded-lg">Item Masuk</a>
                                <a href="#"
                                    class="block px-4 py-2 text-sm text-white hover:bg-white hover:text-zinc-800 rounded-lg">Pembayaran Item Masuk</a>
                            </div>
                        </div>

                        <a href="#"
                            class="flex items-center px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-zinc-800 rounded-lg">
                            <img src="../assets/icon/user-square.png" class="h-5 w-5 mr-3" alt="">
                            Supplier
                        </a>
                    </nav>
                </div>
            </div>

            <!-- User Profile -->
            <div class="border-t mt-auto">
                <div class="p-4">
                    <div class="flex items-center">
                        <img src="../assets/icon/user.png"
                            alt="User avatar" class="h-8 w-8 rounded-full">
                        <div class="ml-3">
                            <p class="text-sm font-medium text-white">Ilham Muhammad Yunan</p>
                            <p class="text-xs text-white">username</p>
                        </div>
                        <button class="ml-auto text-gray-400 hover:text-gray-500">
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1 bg-gray-50 flex">
            <!-- Add your main content here -->
        </div>
    </div>
</template>

<style scoped>
    
</style>