import { zip } from "rxjs"
import { Client } from "../client/client.model"

export class Coupon {
    id: number

    title: string
    description: string

    startDate: string
    endDate: string

    price: number

    amount: number
    soldAmount: number

    imageURL: string

    category: number

    company: Client
    customers: {}

    constructor(
        coupon_id: number,

        title: string,
        description: string,

        start_date: string,
        end_date: string,

        price: number,

        amount: number,
        soldAmount: number,

        imageurl: string,

        category: number,
        company: Client) {
        this.id = coupon_id

        this.title = title
        this.description = description

        this.startDate = start_date
        this.endDate = end_date

        this.price = price

        this.amount = amount
        this.soldAmount = soldAmount

        this.imageURL = imageurl

        this.category = category
        this.company = company
    }
}