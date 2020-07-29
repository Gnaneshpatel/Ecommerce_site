import { API } from "../../backend";

//category calls

export const createCategory = async (userId, token, category) => {
    return await fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(res => {
            return res.JSON();
        })
        .catch(err => console.log(err))
}

// get all categories

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err))
}

//product calls

// create product

export const createProduct = async (userId, token, product) => {
    return await fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(res => {
            return res.json()
        })
        .catch(err => console.log(err))
}

// get all product

export const getProducts = () => {
    return fetch(`${API}/products`, {
        method: "GET"
    })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err))
}

// delete a product

export const deleteProduct = async (productId, userId, token) => {
    return await fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json()
        })
        .catch(err => console.log(err))
}


// update a product

export const updateProduct = async (productId, userId, token, product) => {
    return await fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(res => {
            return res.json()
        })
        .catch(err => console.log(err))
}

// get a product

export const getProduct = async (productId) => {
    return await fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err))
}