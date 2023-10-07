import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  
  constructor( private _HttpClient:HttpClient ) { }
  
  baseurl:any = `https://ecommerce.routemisr.com/api/v1/auth/`

  forgetPassword(userEmail:object):Observable<any>{
    return this._HttpClient.post( this.baseurl + `forgotPasswords` , userEmail)
  }

  resetCode(resetCode:object):Observable<any>{
    return this._HttpClient.post(this.baseurl + `verifyResetCode` , resetCode)
  }

  resetPassword(resetForm:object):Observable<any>{
    return this._HttpClient.put(this.baseurl + `resetPassword` , resetForm)
  }
}
