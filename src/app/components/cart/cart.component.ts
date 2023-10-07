import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor(private _CartService:CartService){}

  cartData:any = null
  numOfCartData:number = 0
  
  ngOnInit(): void {
      this._CartService.getCart().subscribe({
        next:(response)=>{
          this.cartData = response.data;
          this.numOfCartData = response.numOfCartItems;
        }
      })
  }

  removeItem(id:string):void{
    this._CartService.removeCartItem(id).subscribe({
      next:(response)=>{
        this.cartData = response.data;
      }
    })
  }

  changeCount(count:number , id:string):void{
    if (count > 0) {
      this._CartService.updateCart(id , count).subscribe({
        next:(response)=>{
          this.cartData = response.data;
        }
      })
    }
  }

  removeUserCart():void{
    this._CartService.removeUserCart().subscribe({
      next:(response)=>{
        this.cartData = response.data
      }
    })
  }

}
