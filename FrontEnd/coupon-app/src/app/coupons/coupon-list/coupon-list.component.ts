import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.css']
})
export class CouponListComponent implements OnInit {

  clientLevel = localStorage.getItem('client');

  constructor() { }

  ngOnInit(): void { }
}