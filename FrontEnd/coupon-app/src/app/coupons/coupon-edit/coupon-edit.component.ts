import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Client } from 'src/app/client/client.model';
import { ClientService } from 'src/app/client/client.service';
import { Coupon } from '../coupon.model';
import { CouponService } from '../coupon.service';

@Component({
  selector: 'app-coupon-edit',
  templateUrl: './coupon-edit.component.html',
  styleUrls: ['./coupon-edit.component.css']
})
export class CouponEditComponent implements OnInit {

  @ViewChild("f") contactForm: NgForm

  constructor(private route: ActivatedRoute,
    private couponService: CouponService,
    private router: Router,
    private clientService: ClientService) { }

  client: Client
  id: number
  editMode: boolean

  coupon: Coupon = {
    id: -1,
    title: "",
    description: "",

    startDate: "",
    endDate: "",

    price: 0,
    amount: 0,
    soldAmount: 0,
    imageURL: "",

    category: 0,
    company: { id: -1, name: "", email: "", password: "" },
    customers: {},
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"]
      this.editMode = params["id"] != null
      if (this.editMode) {
        this.coupon = this.couponService.getCouponById(this.id)
      }
    })
    this.clientService.fetchClient()
    this.clientService.clientChanged.subscribe((client: Client) => {
      this.client = client
    });
  }

  onSubmit() {
    this.coupon.company = this.client
    this.coupon.customers = []
    if (this.editMode) {
      this.couponService.replaceCouponAt(this.id, this.coupon)
    } else {
      this.couponService.appendCoupon(this.coupon)
    }
    this.router.navigate(["/coupons"])
  }

  onClearCouponView() {
    this.coupon = {
      id: this.coupon.id,
      title: this.coupon.title,
      description: "",

      startDate: "",
      endDate: "",

      price: 0,
      amount: 0,
      soldAmount: this.coupon.soldAmount,
      imageURL: "",

      category: 0,
      company: this.coupon.company,
      customers: {}
    }
  }
}