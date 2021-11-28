import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../client/client.service';
import { Coupon } from '../coupon.model';
import { CouponService } from '../coupon.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {

  coupons: Coupon[]
  clientService: ClientService
  
  constructor(private couponService: CouponService) {}

  ngOnInit(): void {}

  onMyCouponsClick() {
    this.coupons = this.couponService.fetchCustomerCoupons()
  }
  
  onUnpurchaseCouponsClick() {
    this.coupons = this.couponService.fetchCustomerUnpurchaseCoupons()
  }
}