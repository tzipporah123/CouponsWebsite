import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { StorageService } from "../common/storage.service";
import { Client } from "./client.model";

@Injectable()

export class ClientService {

    public readonly COMPANY = 2
    public readonly CUSTOMER = 3

    client: Client
    clientLevel: number

    errorChannel = new Subject<string>()
    clientChanged = new EventEmitter<Client>()

    constructor(private storageService: StorageService) { }

    getClientCompany() {
        this.storageService.getCompany()
            .subscribe(company => {
                this.client = company
                this.onClientChanged()
            }, error => {
                this.errorChannel.next("There was en error trying to fetch company from the cloud!")
            })
    }

    fetchClient() {
        if (localStorage.getItem('client') === "COMPANY") {
            this.clientLevel = this.COMPANY
            this.getClientCompany()
        } else if (localStorage.getItem('client') === "CUSTOMER") {
            this.clientLevel = this.CUSTOMER
            this.getClientCustomer()
        }
    }

    getClientCustomer() {
        this.storageService.getCustomer()
            .subscribe(customer => {
                this.client = customer
                this.onClientChanged()
            }, error => {
                this.errorChannel.next("There was en error trying to fetch customer from the cloud!")
            })
    }

    replaClientAt(client: Client) {
        if (client.password === "") {
            client.password = this.getClientPassword()
        }
        if (this.clientLevel === this.CUSTOMER) {
            this.storageService.postClientCustomer(client)
                .subscribe(customer => {
                    this.client = customer
                    this.onClientChanged()
                }, error => {
                    this.errorChannel.next("There was en error trying to update your detils!")
                })
        } else if (this.clientLevel === this.COMPANY) {
            this.storageService.postClientCompany(client)
                .subscribe(company => {
                    this.client = company
                    this.onClientChanged()
                }, error => {
                    this.errorChannel.next("There was en error trying to update company detils!")
                })
        }
    }

    onClientChanged() {
        this.clientChanged.emit(this.getClient())
    }

    getClient() {
        return new Client(this.client.id, this.client.name, this.client.email, "")
    }

    getClientPassword() {
        return this.client.password
    }
}