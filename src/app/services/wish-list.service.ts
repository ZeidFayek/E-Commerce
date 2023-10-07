import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor( private _HttpClient:HttpClient ) { }

  addToWishList(id:string|undefined):Observable<any>{
    return this._HttpClient.post(`https://route-ecommerce.onrender.com/api/v1/wishlist` , 
    {
      productId: id
    })
  }

  
  getUserWishList():Observable<any>{
    return this._HttpClient.get(`https://route-ecommerce.onrender.com/api/v1/wishlist`)
  }

  removeFromWishList(id:string|undefined):Observable<any>{
    return this._HttpClient.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${id}`)
  }

}
