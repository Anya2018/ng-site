import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/order';

@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: ['./section-orders.component.css']
})
export class SectionOrdersComponent implements OnInit {

  constructor() { }

  orders: Order[] = [
    {id: 1,customer: 
        {id:1 ,name:'La Bakery',state:'Co',email:'huhu@gmail.com'},
        total:230,placed:new Date(2018,12,3),fulfilled:new Date(2018,12,5)},
    {id: 2,customer: 
        {id:34 ,name:'Pa Bakery',state:'Co',email:'huhu@gmail.com'},
        total:230,placed:new Date(2018,12,3),fulfilled:new Date(2018,12,5)},
    {id: 3,customer: 
       {id:2 ,name:'La Ship',state:'Co',email:'huhu@gmail.com'},
       total:230,placed:new Date(2018,12,3),fulfilled:new Date(2018,12,5)},
    {id: 4,customer: 
      {id:11 ,name:'La Constustion',state:'Co',email:'huhu@gmail.com'},
      total:230,placed:new Date(2018,12,3),fulfilled:new Date(2018,12,5)},
    {id: 5,customer: 
        {id:19 ,name:'Lape Bakery',state:'Co',email:'huhu@gmail.com'},
         total:230,placed:new Date(2018,12,3),fulfilled:new Date(2018,12,5)},
  ];


  ngOnInit(): void {
  }

}
