import { Component, OnInit } from '@angular/core';
import { Coupon } from './coupon.model';
import { CouponService } from './coupon.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css'],
  providers: [CouponService]
})
export class CouponsComponent implements OnInit {

  selectedCoupon: Coupon
  errorMessage: string;

  constructor(private couponService: CouponService) { }

  ngOnInit(): void {
    this.couponService.coupanSelected.subscribe((Coupon: Coupon) => {
      this.selectedCoupon = Coupon
      this.couponService.errorChannel.subscribe(errorMessage => {
        this.errorMessage = errorMessage;
      })
    })
  }
}