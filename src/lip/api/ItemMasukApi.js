const url = new URL(import.meta.env.VITE_API_PATH)
console.log(url)

export const getItemMasuk = async (token) => {
    return await fetch(`${url}/itemMasuk`, {
        method: "GET",
        headers: {
            "accept" : "application/json",
            "Authorization" : token
        }
    })

}

export const detailItemMasuk = async (token, id) => {
    return await fetch(`${url}/itemMasuk/${id}`, {
        method: "GET",
        headers: {
            "accept" : "application/json",
            "Authorization" : token
        }
    })
}

export const itemMasukAdd = async (token, {nama_penyetor, jumlah_barang, price, itemId, username}) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/itemMasuk`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "accept" : "application/json",
            "Authorization" : token
        },
        body: JSON.stringify({
            nama_penyetor,
            jumlah_barang,
            price,
            itemId,
            username
        })
    })
}

export const deleteItemMasuk = async (token, id) => {
    return await fetch(`${url}/itemMasuk/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : token
        }
    })
}

export const updateItemMasuk  = async (token, id, {nama_penyetor, jumlah_barang, price, itemId }) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/itemMasuk/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json",
            "accept" : "application/json",
            "Authorization" : token
        },
        body: JSON.stringify({
            nama_penyetor,
            jumlah_barang,
            price,
            itemId
        })
    })
}