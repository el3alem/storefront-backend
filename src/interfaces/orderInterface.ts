interface Order {
    id?: number
    userid: number
    status: string
}

interface ProductToOrder {
    id?: number
    orderid: number
    productid: number
    quantity: number
}

export { Order, ProductToOrder }
