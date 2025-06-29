const url = new URL(import.meta.env.VITE_API_PATH);

export const addPenjualan = async (token, payload) => {
    return await fetch(`${url}/penjualan`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(payload)
    })
}

export const getPenjualan = async (token) => {
    return await fetch(`${url}/penjualan`, {
        method: "GET",
        headers: {
            "accept" : "application/json",
            "Authorization" : token
        }
    })
}

export const deletePenjualan = async (token, id) => {
    return await fetch(`${url}/penjualan/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : token
        }
    })
}

export const detailPenjualan = async (token, id) => {
    return await fetch(`${url}/penjualan/${id}`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : token
        }
    })
}

export const UpdatePenjualan = async (token, id,payload) => {
    return await fetch(`${url}/penjualan/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(payload)
    })
}