import { Component, Input } from '@angular/core';
import { Coupon } from '../../coupon.model';

@Component({
  selector: 'app-coupon-item',
  templateUrl: './coupon-item.component.html',
  styleUrls: ['./coupon-item.component.css']
})

export class CouponItemComponent {

  @Input() coupon: Coupon
  @Input() id: number

  addDays(date: Date, daysToAdd: number) {
    var _24HoursInMilliseconds = 86400000;
    return new Date(date.getTime() + daysToAdd * _24HoursInMilliseconds);
  };

  weekLeftForCustomer() {
    return (new Date(this.coupon.endDate) < this.addDays(new Date(), 7)) && localStorage.getItem('client') === "CUSTOMER"
  }
}
