function getSession() {
    const token = JSON.parse(sessionStorage.getItem("token"))
    const cbid = JSON.parse(sessionStorage.getItem("cbid"))
    return { token: token, id: cbid }
}

export async function getUser() {
    const browserData = getSession()

    const requestOptions = {
        method: "GET",
        headers: {
            "content-type": "application/json", Authorization: `Bearer ${browserData.token}`
        }
    }

    const response = await fetch(`${process.env.REACT_APP_HOST}/600/users/${browserData.id}`, requestOptions)
    if (!response.ok) {
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json()
    return data
}

export async function getUserOrders() {
    const browserData = getSession()

    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders?user.id=${browserData.id}`, {
        method: "GET",
        headers: { "content-type": "application/json", Authorization: `Bearer ${browserData.token}` }
    })
    if (!response.ok) {
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json()
    return data
}

export async function createOrder(cartList, total, user) {
    const browserData = getSession()

    const order = {
        cartList: cartList,
        amount_paid: total,
        quantity: cartList.length,
        user: {
            // name: event.target.name.value,
            name: user.name,
            // email: event.target.email.value,
            email: user.email,
            id: user.id
        }
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders`, {
        method: "POST",
        headers: { "content-type": "application/json", Authorization: `Bearer ${browserData.token}` },
        body: JSON.stringify(order)
    })
    if (!response.ok) {
        throw { message: response.statusText, status: response.status }; //eslint-disable-line
    }
    const data = await response.json()
    return data

}