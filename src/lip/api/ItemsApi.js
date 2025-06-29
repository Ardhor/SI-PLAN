export const itemsAdd = async (token, { item_name, category, buy_price, sell_price, qty, description, supplierId }) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({
            item_name,
            category,
            buy_price,
            sell_price,
            qty,
            description,
            supplierId
        })
    })
}

export const getItems = async (token) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/items`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : token
        }
    })
}

export const itemsDetail = async (token, id) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/items/${id}`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : token
        }
    })
}

export const getSupplier = async (token) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/suppliers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
}

export const deleteItems = async (token, id) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/items/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
}

export const updateItems = async (token, id, { item_name, category, buy_price, sell_price, qty, description, supplierId }) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/items/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({
            item_name,
            category,
            buy_price,
            sell_price,
            qty,
            description,
            supplierId
        })
    })
}