export class Client {

    id: number
    name: string
    password: string
    email: string

    constructor(id: number, name: string, email: string, password: string,) {
        this.id = id
        this.name = name
        this.password = password
        this.email = email
    }
}