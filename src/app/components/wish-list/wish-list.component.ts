import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  constructor ( private _WishListService:WishListService ,
    private _CartService:CartService ,
    private _ToastrService:ToastrService ,
    ){}

  WishData:any = []
  removeItemFromWishList:string[] = []

  ngOnInit(): void {
      this._WishListService.getUserWishList().subscribe({
        next:(response)=>{
          this.WishData = response.data
          const newWishData = response.data.map( (item:any)=> item._id )
          this.removeItemFromWishList = newWishData
        }
      })
  }

  removeItem(id:string|undefined):void{
    this._WishListService.removeFromWishList(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message)
        this.removeItemFromWishList = response.data
        const newData = this.WishData.filter( (item:any)=> this.removeItemFromWishList.includes(item._id) )
        this.WishData = newData
      }
    })
    
    
  }

  addToCart(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message)
      }
    })
  }
}
