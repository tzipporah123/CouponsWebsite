import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../client.model';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {

  @ViewChild("f") contactForm: NgForm

  constructor(private clientService: ClientService, private router: Router) { }

  client: Client = {
    id: -1,
    name: "",
    email: "",
    password: "",
  }

  ngOnInit(): void {
    this.clientService.fetchClient()
    this.clientService.clientChanged.subscribe((client: Client) => {
      this.client = client
    })
  }

  onSubmit() {
    this.clientService.replaClientAt(this.client)
    this.router.navigate(["/client"])
  }
}