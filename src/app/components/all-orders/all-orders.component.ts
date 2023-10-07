import { Component, OnInit } from '@angular/core';
import { AllOrdersService } from 'src/app/services/all-orders.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {
  constructor(private _AllOrdersService:AllOrdersService){}

  allOrdersNum:number = 0
  allOrdersData:any = {}

  ngOnInit(): void {
      this._AllOrdersService.getAllOrders().subscribe({
        next:(response)=>{
          this.allOrdersNum = response.results
          this.allOrdersData = response.data
        }
      })
  }
}
