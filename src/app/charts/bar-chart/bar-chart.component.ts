import { Component, OnInit } from '@angular/core';
import { SalesDataService } from '../../services/sales-data.service';
//for working with dates:
import * as moment from 'moment';

// const SAMPLE_BARCHART_DATA: any[]=[
//   {data:[38,24,78,12,34,87,55], label:'Q3 Sales'},
//   {data:[58,23,90,12,84,21,95], label:'Q4 Sales'},
// ];

// const SAMPLE_BARCHART_LABELS: string[]=['w1','w2','w3','w4','w5','w6','w7'];

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor(private _salesDataService: SalesDataService) { }

  orders: any;
  orderLabels:string[];
  orderData:number[];

  public barChartData: any[];
  public barChartLabels: string[];
  public barChartLegend =true;
  public barChartType = 'bar';
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    respnsive: true,
  }


  ngOnInit(): void {
    //the most recent 100 orders:
    this._salesDataService.getOrders(1,100)
      .subscribe(res =>{
        //console.log(res['page']['data']);
        const localChartData = this.getChartData(res);
        this.barChartLabels = localChartData.map(x => x[0]).reverse();
        this.barChartData = [{'data':localChartData.map(x => x[1]),'label':'Sales'}];
      });
  }

  getChartData(res: Response){
    this.orders = res['page']['data'];
    const data = this.orders.map(o => o.total);
    //just to see how it looks like:
    // console.log(data);
    //const labels = this.orders.map(o => moment(new Date (o.placed)).format('YY-MM-DD'));
    //console.log(labels);
    const formattedOrders = this.orders.reduce((r,e) => {
      r.push([moment(e.placed).format('YY-MM-DD'),e.total]);
      return r;
    },[]);

    const p = [];

    const charData = formattedOrders.reduce((r,e) => {
      const key = e[0];
      if(!p[key]){
        p[key]= e;
        r.push(p[key]);
      } else{
        p[key][1] += e[1];
      }
      return r;
    },[]);
    return charData;
  }
}
