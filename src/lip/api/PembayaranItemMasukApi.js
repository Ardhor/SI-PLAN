const url = new URL(import.meta.env.VITE_API_PATH)

export const getPembayaranItemMasuk = async (token) => {
    return await fetch(`${url}/pembayaranItemMasuk`, {
        method: "GET",
        headers: {
            "accept" : "application/json",
            "Authorization" : token
        }
    })
}

export const detailPembayaranItemMasuk = async (token, id) =>{
    return await fetch(`${url}/pembayaranItemMasuk/${id}`, {
        method: "GET",
        headers: {
            "accept" : "application/json",
            "Authorization" : token
        }
    })
}

export const pembayaranItemMasukAdd = async (token, {metodePembayaran, statusPembayaran, itemMasukId}) => {
    return await fetch(`${url}/pembayaranItemMasuk`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "accept" : "application/json",
            "Authorization" : token
        },
        body: JSON.stringify({
            metodePembayaran,
            statusPembayaran,
            itemMasukId
        })
    })
}

export const deletePembayaranItemMasuk = async (token, id) => {
    return await fetch(`${url}/pembayaranItemMasuk/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : token
        }
    })
}

export const updatePembayaranItemMasuk = async (token, id, {metodePembayaran, statusPembayaran, itemMasukId}) => {
    return await fetch(`${url}/pembayaranItemMasuk/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json",
            "accept" : "application/json",
            "Authorization" : token
        },
        body: JSON.stringify({
            metodePembayaran,
            statusPembayaran,
            itemMasukId
        })
    })
}