import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
FormGroup
FormControl

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  constructor(private _CartService:CartService , private _ActivatedRoute:ActivatedRoute) {}
  
  id:any = ''
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=> {
            this.id = params.get('id')
        },
      })
  }

  shippingAddress:FormGroup = new FormGroup({
    details:new FormControl('' , Validators.required),
    phone:new FormControl('', Validators.required),
    city:new FormControl('' , Validators.required)
  })

  handleForm():void{
    const orderDetails = this.shippingAddress.value
    
    this._CartService.checkOut(this.id , orderDetails).subscribe({
      next:(response)=>{
        window.open(response.session.url)
      }
    })
    
  }
  
}
