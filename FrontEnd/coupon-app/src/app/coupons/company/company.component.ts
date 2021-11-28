import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../client/client.model';
import { CouponService } from '../coupon.service';
import { Coupon } from '../coupon.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})

export class CompanyComponent implements OnInit {

  client: Client
  coupons: Coupon[]
  sortBy: string

  constructor(private couponService: CouponService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.onCompanyCoupons()
  }

  onCompanyCoupons() {
    this.coupons = this.couponService.fetchCompanyCoupons()
    this.coupons = this.coupons.sort((a, b) => b.soldAmount - a.soldAmount)
    this.router.navigate(["/coupons"])
  }

  onNewCoupon() {
    this.router.navigate(["new"], { relativeTo: this.route })
  }

  onTitleClick() {
    this.coupons = this.coupons.sort((a, b) => a.title.localeCompare(b.title))
  }

  onStartDateClick() {
    this.coupons = this.coupons.sort((a, b) => a.startDate.localeCompare(b.startDate))
  }

  onEndDateClick() {
    this.coupons = this.coupons.sort((a, b) => a.endDate.localeCompare(b.endDate))
  }
}