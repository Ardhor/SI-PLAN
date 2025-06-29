<script setup>
import { reactive, ref, computed, watch, onMounted } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { getItems } from '../../lip/api/ItemsApi.js'
import { addPenjualan } from '../../lip/api/PenjualanApi.js'
import { alertSuccess, alertError } from '../../lip/alert.js'

const token = useLocalStorage("token", "")
const items = ref([])

// Data penjualan
const penjualan = reactive({
    penjualanItems: [
        {
            itemId: "",
            qty: 1,
            price: 0
        }
    ],
    pembayaran: {
        metodePembayaran: "Cash",
        statusPembayaran: "success",
        keterangan: ""
    }
})

// Computed property untuk total
const totalPenjualan = computed(() => {
    return penjualan.penjualanItems.reduce((total, item) => {
        return total + (item.qty * item.price)
    }, 0)
})

// Auto-fill harga saat item dipilih
watch(() => penjualan.penjualanItems, (newItems) => {
    newItems.forEach(item => {
        if (item.itemId) {
            const selectedItem = items.value.find(i => i.id === item.itemId)
            if (selectedItem) {
                item.price = selectedItem.sell_price
            }
        }
    })
}, { deep: true })

// Tambahkan ini untuk debugging
watch(() => penjualan.penjualanItems, (newItems) => {
    console.log("PenjualanItems berubah:", JSON.parse(JSON.stringify(newItems)));
}, { deep: true });

// Fungsi untuk menambah item
function addItem() {
    // Gunakan spread operator untuk memastikan reactivity
    penjualan.penjualanItems = [
        ...penjualan.penjualanItems,
        {
            itemId: "",
            qty: 1,
            price: 0
        }
    ];
    console.log("Items setelah ditambah:", penjualan.penjualanItems);
}

// Fungsi untuk menghapus item
function removeItem(index) {
    // Gunakan filter untuk memastikan reactivity
    penjualan.penjualanItems = penjualan.penjualanItems.filter((_, i) => i !== index);
    console.log("Items setelah dihapus:", penjualan.penjualanItems);
}

// Fungsi untuk submit penjualan
async function submitPenjualan() {
    try {
        // Buat deep copy dari penjualanItems untuk menghindari reactivity issues
        const itemsToSend = JSON.parse(JSON.stringify(penjualan.penjualanItems));

        // Validasi form - pastikan semua item valid
        const validItems = itemsToSend.filter(item => {
            return item.itemId &&
                Number.isInteger(item.qty) && item.qty > 0 &&
                Number(item.price) > 0;
        });

        if (validItems.length === 0) {
            return alertError("Minimal 1 item harus diisi");
        }

        if (validItems.length !== penjualan.penjualanItems.length) {
            return alertError("Semua item harus diisi dengan benar");
        }

        if (!penjualan.pembayaran.metodePembayaran || !penjualan.pembayaran.statusPembayaran) {
            return alertError("Metode dan status pembayaran harus diisi");
        }

        // Siapkan payload sesuai format API
        const payload = {
            penjualanItems: validItems,
            pembayaran: [{
                ...penjualan.pembayaran
            }]
        };

        console.log("Payload yang dikirim:", JSON.stringify(payload, null, 2));

        // Kirim ke API
        const response = await addPenjualan(token.value, payload);
        const responseBody = await response.json()
        if (response.status === 201) {
            await alertSuccess("Add Penjualan Successfully")
        } else {
            await alertError(responseBody.errors)
        }


        // Reset form
        penjualan.penjualanItems = [{ itemId: "", qty: 1, price: 0 }];
        penjualan.pembayaran = {
            metodePembayaran: "Cash",
            statusPembayaran: "success",
            keterangan: ""
        };

    } catch (error) {
        console.error("Error:", error);
        await alertError(error.message || "Terjadi kesalahan saat menyimpan penjualan");
    }
}

// Fetch data item saat komponen dimount
onMounted(async () => {
    try {
        const response = await getItems(token.value)
        const responseData = await response.json()

        if (response.status === 200) {
            items.value = responseData.data
        } else {
            throw new Error(responseData.errors || "Gagal memuat data item")
        }
    } catch (error) {
        console.error("Error:", error)
        await alertError(error.message)
    }
})
</script>
<template>
    <div class="flex items-center p-5 justify-center">
        <RouterLink to="/dashboard/penjualan"
            class="text-zinc-400 hover:text-white mr-4 flex items-center transition-colors duration-200">
            <i class="fas fa-arrow-left mr-2"></i> Kembali to List Item
        </RouterLink>
        <h1 class="text-2xl font-bold text-white flex items-center">
            <i class="fa-solid fa-box-open text-zinc-300 mr-3"></i>
            Tambah Penjualan
        </h1>
    </div>

    <div class="ml-20 mr-20 p-8 bg-zinc-800 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-white mb-6">Form Penjualan</h2>

        <!-- Daftar Item -->
        <div class="space-y-4 mb-6">
            <div v-for="(item, index) in penjualan.penjualanItems" :key="index"
                class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end p-4 border rounded-lg">
                <div>
                    <label class="block text-sm font-medium text-white mb-1">Item</label>
                    <select v-model="item.itemId"
                        class="w-full p-2 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        required>
                        <option value="" disabled>Pilih Item</option>
                        <option v-for="product in items" :key="product.id" :value="product.id">
                            {{ product.item_name }} (Stok: {{ product.qty }})
                        </option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-white mb-1">Jumlah</label>
                    <input type="number" v-model.number="item.qty" min="1"
                        class="w-full p-2 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        required>
                </div>

                <div>
                    <label class="block text-sm font-medium text-white mb-1">Harga</label>
                    <input type="number" v-model.number="item.price" min="0"
                        class="w-full p-2 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        required>
                </div>

                <button @click="removeItem(index)" class="p-2 text-red-600 hover:text-red-800"
                    v-if="penjualan.penjualanItems.length > 1">
                    Hapus
                </button>
            </div>

            <button @click="addItem" class="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
                + Tambah Item
            </button>
        </div>

        <!-- Total -->
        <div
            class="p-4 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 mb-6">
            <p class="text-lg font-semibold">
                Total: Rp {{ totalPenjualan.toLocaleString('id-ID') }}
            </p>
        </div>

        <!-- Form Pembayaran -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
                <label class="block text-sm font-medium text-white mb-1">Metode Pembayaran</label>
                <select v-model="penjualan.pembayaran.metodePembayaran"
                    class="w-full p-2 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required>
                    <option value="Cash">Cash</option>
                    <option value="Qris">QRIS</option>
                </select>
            </div>

            <div>
                <label class="block text-sm font-medium text-white mb-1">Status Pembayaran</label>
                <select v-model="penjualan.pembayaran.statusPembayaran"
                    class="w-full p-2 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required>
                    <option value="success">Success</option>
                    <option value="pending">Pending</option>
                </select>
            </div>

            <div class="md:col-span-2">
                <label class="block text-sm font-medium text-white mb-1">Keterangan</label>
                <textarea v-model="penjualan.pembayaran.keterangan"
                    class="w-full p-2 bg-zinc-700 bg-opacity-50 border border-zinc-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    rows="2"></textarea>
            </div>
        </div>

        <!-- Tombol Submit -->
        <div class="flex justify-end">
            <button @click="submitPenjualan"
                class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Simpan Penjualan
            </button>
        </div>
    </div>
</template>
