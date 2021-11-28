import { Injectable } from "@angular/core"
import { Observable, Subject } from "rxjs"
import { Token } from "../token"

@Injectable({ providedIn: 'root' })

export class LoginService {

    token = ""
    errorChannel = new Subject<string>()

    constructor() { }

    onLogin(onLoginURL: Observable<Token>) {
        onLoginURL.subscribe(t => {
            this.token = t.token
            localStorage.setItem('token', t.token);
        }, error => {
            this.errorChannel.next("There was en error trying to login!")
        })
    }

    logout() {
        this.token = ""
        localStorage.removeItem('token');
        localStorage.removeItem('client');
        localStorage.removeItem('clientName');
        localStorage.removeItem('clientEmail');
    }
}