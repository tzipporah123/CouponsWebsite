import { EventEmitter, Injectable } from "@angular/core"
import { Subject } from "rxjs"
import { StorageService } from "../common/storage.service"
import { Coupon } from "./coupon.model"

@Injectable()
export class CouponService {

  wasPurases: boolean
  coupon: Coupon
  coupons: Coupon[] = []

  coupanSelected = new EventEmitter<Coupon>()
  coupansChanged = new EventEmitter<Coupon[]>()
  errorChannel = new Subject<string>()

  constructor(private storageService: StorageService) { }

  purchaseCoupon(id: number) {
    this.storageService.addCouponCustomer(id)
      .subscribe(c => {
        this.coupons.unshift(c)
        this.onCouponsChanged()
      }, error => {
        this.errorChannel.next("Something went wrong while trying to purchase a new coupon!")
      })
  }

  deleteCoupon(id: number) {
    this.storageService.removeCoupon(id).subscribe()
  }

  getCoupons() {
    return this.coupons.slice()
  }

  fetchCompanyCoupons() {
    this.storageService.getCompanyCoupons()
      .subscribe(coupons => {
        this.coupons = coupons
        this.onCouponsChanged()
      }, error => {
        this.errorChannel.next("Something went wrong while trying to add a new coupon!")
      })
    return this.getCoupons()
  }

  getCouponById(id: number) {
    this.coupons.forEach(c => {
      if (c.id === id) {
        this.coupon = c
      }
    });
    return this.coupon
  }

  onCouponsChanged() {
    this.coupansChanged.emit(this.getCoupons())
  }

  appendCoupon(coupon: Coupon) {
    this.storageService.postCoupon(coupon)
      .subscribe(coupon => {
        this.coupons.unshift(coupon)
        this.onCouponsChanged()
      }, error => {
        this.errorChannel.next("Something went wrong while trying to add a new coupon!")
      })
  }

  replaceCouponAt(id: number, coupon: Coupon) {
    this.storageService.updateCoupon(coupon)
      .subscribe(coupon => {
        this.coupons[id] = coupon
        this.coupons[id] = coupon
        this.onCouponsChanged()
      }
        , error => {
          this.errorChannel.next("Something went wrong while trying to updat the coupon!")
        });
  }

  fetchCustomerCoupons() {
    this.storageService.getCustomerCoupons()
      .subscribe(coupons => {
        this.coupons = coupons
        this.onCouponsChanged()
        this.wasPurases = true
      }, error => {
        this.errorChannel.next("Something went wrong while trying to add a new coupon!")
      })
    return this.getCoupons()
  }

  fetchCustomerUnpurchaseCoupons() {
    this.storageService.getCustomerUnpurchaseCoupons()
      .subscribe(coupons => {
        this.coupons = coupons
        this.onCouponsChanged()
        this.wasPurases = false
      }, error => {
        this.errorChannel.next("Something went wrong while trying to add a new coupon!")
      })
    return this.getCoupons()
  }
}