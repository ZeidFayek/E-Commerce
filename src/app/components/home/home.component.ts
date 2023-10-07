import { Component, OnInit, Renderer2 } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { category } from 'src/app/data-interface';
import { ApidataService } from 'src/app/services/apidata.service';
import { CartService } from 'src/app/services/cart.service';
import { FormsModule } from '@angular/forms';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  constructor(
    private _ApidataService:ApidataService,
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2,
    private _WishListService:WishListService
    ) {}

  ProductsData:any[] = []
  categories:category[] = []
  term:string = ''
  homeWishListData: string[] =[]

  ngOnInit(): void {
      this._ApidataService.getproducts().subscribe({
        next: (response) => {
          this.ProductsData = response.data;
        }

      })

      this._ApidataService.getcategories().subscribe({
        next:(response) => {
          this.categories = response.data
        },
      })

      this._WishListService.getUserWishList().subscribe({
        next:(response) => {
          // console.log(response.data);
          const newWishListData = response.data.map( (item:any) => item._id )          
          this.homeWishListData = newWishListData
        }
      })
  }

  categoriesSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    autoplay: true,
    autoplayTimeout:2000,
    autoplaySpeed:1000,
    nav: true
  }

  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    autoplay: true,
    autoplayTimeout:2500,
    autoplaySpeed:1000,
    nav: true
  }

  addProduct(id:string , element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element,'disabled','true');
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        this._CartService.cartNumber.next(response.numOfCartItems)
        this._ToastrService.success(response.message)
        this._Renderer2.removeAttribute(element,'disabled');
      },
      error:()=>{
        this._Renderer2.removeAttribute(element,'disabled');
      }
    })
  }

  addToWishList(id:string|undefined):void{
    this._WishListService.addToWishList(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message)
        this.homeWishListData = response.data
      }
    })
  }

  removeWishListItem(id:string|undefined):void{
    this._WishListService.removeFromWishList(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message)
        this.homeWishListData = response.data
      }
    })
  }
}