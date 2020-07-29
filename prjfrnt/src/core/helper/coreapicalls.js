import { API } from "../../backend"

export const getProduct = async () => {
    return await fetch(`${API}/products`, {
        method: "GET"
    }).then(res => {
        return res.json();
    })
        .catch(err => console.log(err))
}