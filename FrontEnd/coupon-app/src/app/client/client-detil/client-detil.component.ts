import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { Client } from '../client.model';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-detil',
  templateUrl: './client-detil.component.html',
  styleUrls: ['./client-detil.component.css']
})

export class ClientDetilComponent implements OnInit {

  client: Client

  constructor(private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private login: LoginService) { }

  ngOnInit(): void {
    this.clientService.fetchClient()
    this.clientService.clientChanged
      .subscribe((client: Client) => {
        this.client = client
      })
  }

  onEditClient() {
    this.router.navigate(["edit"], { relativeTo: this.route })
  }

  onLogout() {
    this.login.logout()
    this.router.navigate(["/login"])
  }
}