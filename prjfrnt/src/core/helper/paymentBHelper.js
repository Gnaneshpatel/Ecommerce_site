import { API } from '../../backend';

export const getMeToken = async (userId, token) => {
    return await fetch(`${API}/payment/gettoken/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        return res.json();
    })
        .catch(err => console.log(err))
}

export const processPayment = async (userId, token, paymentInfo) => {
    return await fetch(`${API}/payment/braintree/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentInfo)
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err))
}