
const navPenjualan = document.getElementById("nav-penjualan");
const listPenjualan = document.getElementById("list-penjualan");
const listPembayaran = document.getElementById("list-pembayaran");

navPenjualan.onclick = function () {
    listPenjualan.classList.toggle("active")
    listPembayaran.classList.toggle("active")
    console.info("click")
}