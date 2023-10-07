import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApidataService } from 'src/app/services/apidata.service';
import { CartService } from 'src/app/services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor( private _ApidataService:ApidataService, private _CartService:CartService, private _ToastrService:ToastrService){}

  term:string = ''

  ProductsData:any[] = []
  ngOnInit():void {
      this._ApidataService.getproducts().subscribe({
        next:(response)=>{
          this.ProductsData = response.data;
        }
      })
    }


  addProduct(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        this._CartService.cartNumber.next(response.numOfCartItems)
        this._ToastrService.success(response.message)
      }
    })
  }
}
