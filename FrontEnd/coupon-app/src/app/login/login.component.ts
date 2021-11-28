import { Component, OnInit, ViewChild } from "@angular/core"
import { NgForm } from "@angular/forms"
import { Router } from "@angular/router"
import { Subject } from "rxjs"
import { ClientService } from "../client/client.service"
import { StorageService } from "../common/storage.service"
import { Token } from "../token"
import { LoginService } from "./login.service"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild("f") loginForm: NgForm

  constructor(private clientService: ClientService,
    private router: Router,
    private storageService: StorageService,
    private loginService: LoginService) { }

  loginClient = {
    clientEmail: "",
    clientPassword: "",
    level: ""
  }

  errorChannel = new Subject<string>()

  ngOnInit(): void { }

  onSubmit() {
    if (this.loginClient.level === "COMPANY") {
      this.loginService.onLogin(
        this.storageService.login(this.loginClient.clientEmail, this.loginClient.clientPassword, this.clientService.COMPANY)
      )
      localStorage.setItem('client', "COMPANY");
    }
    else if (this.loginClient.level === "CUSTOMER") {
      this.loginService.onLogin(
        this.storageService.login(this.loginClient.clientEmail, this.loginClient.clientPassword, this.clientService.CUSTOMER)
      )
      localStorage.setItem('client', "CUSTOMER");
    }
    if (localStorage.getItem('token')) {
      this.router.navigate(["/client"])
    }
  }
}