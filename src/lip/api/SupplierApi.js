export const supplierAdd = async (token, {name, no_telepon}) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/suppliers`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "accept" : "application/json",
            "Authorization" : token
        },
        body: JSON.stringify({
            name,
            no_telepon
        })
    })
}

export const getSupplier = async(token) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/suppliers`, {
        method: "GET",
        headers: {
            "accept" : "application/json",
            "Authorization" : token
        },
    })
}

export const supplierDetail = async(token, id) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/suppliers/${id}`, {
        method: "GET",
        headers: {
            "accept" : "application/json",
            "Authorization" : token
        },
    })
}

export const deleteSupplier = async(token, id) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/suppliers/${id}`, {
        method: "DELETE",
        headers: {
            "accept" : "application/json",
            "Authorization" : token
        },
    })
}

export const updateSupplier = async (token, id, {name, no_telepon}) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/suppliers/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json",
            "accept" : "application/json",
            "Authorization" : token
        },
        body: JSON.stringify({
            name,
            no_telepon
        })
    })
}

