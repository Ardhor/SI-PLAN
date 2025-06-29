import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Layout from "./components/Layout.vue"
import UserRegister from "./components/User/UserRegister.vue"
import UserLogin from "./components/User/UserLogin.vue"
import DashboardLayout from './components/DashboardLayout.vue'
import SaleList from './components/Penjualan/SaleList.vue'
import UserProfile from './components/User/UserProfile.vue'
import ItemsList from './components/Item/ItemsList.vue'
import UserLogout from './components/User/UserLogout.vue'
import ItemsAdd from './components/Item/ItemsAdd.vue'
import SupplierList from './components/Supplier/SupplierList.vue'
import SupplierAdd from './components/Supplier/SupplierAdd.vue'
import ItemsEdit from './components/Item/itemsEdit.vue'
import SupplierEdit from './components/Supplier/SupplierEdit.vue'
import ItemsMasukList from './components/ItemMasuk/ItemsMasukList.vue'
import ItemsMasukEdit from './components/ItemMasuk/ItemsMasukEdit.vue'
import ItemsMasukAdd from './components/ItemMasuk/ItemsMasukAdd.vue'
import PembayaranItemMasukList from './components/PembayaranItemMasuk/PembayaranItemMasukList.vue'
import PembayaranItemMasukAdd from './components/PembayaranItemMasuk/PembayaranItemMasukAdd.vue'
import PembayaranItemMasukEdit from './components/PembayaranItemMasuk/PembayaranItemMasukEdit.vue'
import SaleAdd from './components/Penjualan/SaleAdd.vue'
import SaleEdit from './components/Penjualan/SaleEdit.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            component: Layout,
            children: [
                {
                    path: "/register",
                    component: UserRegister
                },
                {
                    path: "/login",
                    component: UserLogin
                }
            ]
        },
        {
            path: "/dashboard",
            component: DashboardLayout,
            children: [
                // Penjualan
                {
                    path:"penjualan",
                    component: SaleList
                },
                {
                    path: "penjualan/add",
                    component: SaleAdd
                },
                {
                    path: "penjualan/:id/edit",
                    component: SaleEdit
                },

                // Items
                {
                    path: "items",
                    component: ItemsList
                },
                {
                    path: "items/add",
                    component: ItemsAdd
                },
                {
                    path: "items/:id/edit",
                    component: ItemsEdit
                },

                // ItemMasuk
                {
                    path: "itemMasuk",
                    component: ItemsMasukList
                },
                {
                    path: "itemMasuk/add",
                    component: ItemsMasukAdd
                },
                {
                    path: "itemMasuk/:id/edit",
                    component: ItemsMasukEdit
                },

                // Pembayaran Item Masuk
                {
                    path: "pembayaranItemMasuk",
                    component: PembayaranItemMasukList
                },
                {
                    path: "pembayaranItemMasuk/add",
                    component: PembayaranItemMasukAdd
                },
                {
                    path: "pembayaranItemMasuk/:id/edit",
                    component: PembayaranItemMasukEdit
                },

                // Suppliers
                {
                    path: "supplier",
                    component:SupplierList
                },
                {
                    path: "supplier/add",
                    component:SupplierAdd
                },
                {
                    path: "supplier/:id/edit",
                    component: SupplierEdit
                },

                // Users
                {
                    path: "users/profile",
                    component: UserProfile
                },
                {
                    path: "users/logout",
                    component: UserLogout
                }
            ]
        }
    ]
})

createApp(App).use(router).mount('#app')
