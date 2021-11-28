import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Coupon } from '../coupon.model';
import { CouponService } from '../coupon.service';

@Component({
  selector: 'app-coupon-detail',
  templateUrl: './coupon-detail.component.html',
  styleUrls: ['./coupon-detail.component.css']
})

export class CouponDetailComponent implements OnInit {
  
  coupons:Coupon[]
  coupon:Coupon
  param_id: number
  clientLevel= localStorage.getItem('client');
  wasPurases:boolean
  
  constructor(private couponService: CouponService, 
    private route: ActivatedRoute,
     private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.param_id = +params["id"]
      this.coupon = this.couponService.getCouponById(this.param_id)
      this.wasPurases=this.couponService.wasPurases
    })
  }
  
  onEditCoupon(){
    this.router.navigate(["edit"], { relativeTo: this.route })
  }

  onPurchaseClick(){
    this.couponService.purchaseCoupon(this.coupon.id)
    this.router.navigate(["/client"])
  }

  onDeleteClick(){
    this.couponService.deleteCoupon(this.coupon.id)
    this.router.navigate(["/client"])
  }
}
