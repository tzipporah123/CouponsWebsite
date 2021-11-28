import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Coupon } from "../coupons/coupon.model";
import { Token } from "../token";
import { Client } from "../client/client.model";

@Injectable()
export class StorageService {

    constructor(private http: HttpClient) { }

    addCouponCustomer(id: number) {
        let params = new HttpParams()
            .set("couponId", id.toString())
            .set("token", localStorage.getItem('token'))
        return this.http.post<Coupon>("http://localhost:8080/api/customer/purchase-coupon", params)
    }

    removeCoupon(id: number): Observable<{}> {
        return this.http.delete("http://localhost:8080/api/companies/delete-coupon?couponId=" + id + "&token=" + localStorage.getItem('token'))
    }

    updateCoupon(coupon: Coupon) {
        return this.http.patch<Coupon>("http://localhost:8080/api/companies/coupons-update?token=" + localStorage.getItem('token'), coupon)
    }

    postCoupon(coupon: Coupon) {
        return this.http.post<Coupon>("http://localhost:8080/api/companies/coupons-new-full?token=" + localStorage.getItem('token'), coupon)
    }

    getCustomerCoupons(): Observable<Coupon[]> {
        return this.http.get<Coupon[]>("http://localhost:8080/api/customers/coupons?token=" + localStorage.getItem('token'))
    }

    getCompanyCoupons(): Observable<Coupon[]> {
        return this.http.get<Coupon[]>("http://localhost:8080/api/companies/coupons?token=" + localStorage.getItem('token'))
    }

    login(email: string, password: string, level: number) {
        let params = new HttpParams()
            .set("email", email)
            .set("password", password)
            .set("loginType", level.toString())
        return this.http.post<Token>("http://localhost:8080/api/login", params)
    }

    postClientCustomer(client: Client) {
        return this.http.patch<Client>("http://localhost:8080/api/customers/edit?token=" + localStorage.getItem('token'), client)
    }

    postClientCompany(client: Client) {
        return this.http.patch<Client>("http://localhost:8080/api/companies/edit?token=" + localStorage.getItem('token'), client)
    }

    getCompany(): Observable<Client> {
        return this.http.get<Client>("http://localhost:8080/api/companies?token=" + localStorage.getItem('token'))
    }

    getCustomer(): Observable<Client> {
        return this.http.get<Client>("http://localhost:8080/api/customers?token=" + localStorage.getItem('token'))
    }

    getCustomerUnpurchaseCoupons() {;
        return this.http.get<Coupon[]>("http://localhost:8080/api/customers/coupons-missing?token=" + localStorage.getItem('token'))
    }
}
