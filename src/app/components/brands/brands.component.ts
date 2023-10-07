import { Component, OnInit } from '@angular/core';
import { ApidataService } from 'src/app/services/apidata.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit {
  constructor (private _ApidataService:ApidataService){}

  brandData:any = []
  brandName:string = ''
  brandSlug:string = ''
  brandImage:string = ''

  ngOnInit(): void {
    this._ApidataService.getbrands().subscribe({
      next:(response)=>{
        this.brandData = response.data
      }
    })
  }

  openModal(name:string , slug:string , image:string){
    this.brandName = name
    this.brandSlug = slug
    this.brandImage = image
    const modalDiv:any = document.getElementById('modal')
    if(modalDiv !== null){
      modalDiv.style.display = 'block'
    }
  }
  closeModal(){
    const modalDiv:any = document.getElementById('modal')
    if(modalDiv !== null){
      modalDiv.style.display = 'none'
    }
  }
}