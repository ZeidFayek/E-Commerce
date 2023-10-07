import { Component, OnInit } from '@angular/core';
import { ApidataService } from 'src/app/services/apidata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  
  constructor( private _ApidataService:ApidataService ){}


  categoryData:any = []
  categoryID:string = ''
  categoryName:string = ''
  subCategoryData:any = []

  ngOnInit(): void {
    this._ApidataService.getcategories().subscribe({
      next:(response)=>{
        this.categoryData = response.data
      },
    })
  }

  getData(id:any , name:string):void {
    this.categoryID = id
    this.categoryName = name
    
    this._ApidataService.getSpecificCategory(id).subscribe({
      next:(response)=>{
        console.log(response);
        this.subCategoryData = response.data
      }
    })
  }



}
