import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApidataService } from 'src/app/services/apidata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private _ActivatedRoute:ActivatedRoute
    ,private _ApidataService:ApidataService
    ,private _CartService:CartService){}
  
  productDetails:any = {};
  productID:any ;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
        this.productID = param.get('id')
      }
    });

    this._ApidataService.getproductbyID(this.productID).subscribe({
      next:(response)=>{
        this.productDetails = response.data;
      }
    })
  }


  productSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    autoplay: true,
    nav: false
  }

  addProduct(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        console.log(response)
      }
    })
  }
}
