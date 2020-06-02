import { Component, OnInit } from '@angular/core';
import { LINE_CHART_COLORS } from '../../shared/chart.colors';
import { SalesDataService } from '../../services/sales-data.service';
import * as moment from 'moment';

// const LINE_CHART_SAMPLE_DATA: any[] = [
//   {data: [45,78,24,56,12,63], label: 'Sentiment Anaysis'},
//   {data: [87,34,56,52,62,88], label: 'Image Recognition'},
//   {data: [12,15,34,93,24,65], label: 'Forecasting'},
// ];

// const LINE_CHART_SAMPLE_LABELS: string[] = ['Jan','Feb','Mar','Apr','May'];

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor(private _salesDataService: SalesDataService) { }

  topCustomers: string[];
  allOrders: any[];

  lineChartData: any;
  lineChartLabels:any;
  lineChartOptions: any = {
    responsive: true,
  };
  lineChartLegend =true;
  lineChartType = 'line';
  lineChartColors = LINE_CHART_COLORS;

  ngOnInit(): void {
    this._salesDataService.getOrders(1,100).subscribe(res => {
      //console.log('res:',res);
      this.allOrders = res['page']['data'];

      this._salesDataService.getOrdersByCustomer(3).subscribe(cus=>{
        this.topCustomers = cus.map(x=>x['name']);

        const allChartData = this.topCustomers.reduce((result,i)=>{
          result.push(this.getChartData(this.allOrders,i));
          return result;
        },[]);

        let dates = allChartData.map(x=>x['data']).reduce((a,i) => {
          a.push(i.map(o=> new Date(o[0])));
          return a;
        },[]);
        //console.log('dates:',dates);
        //concotinating dates:
        dates = [].concat.apply([],dates);
        //getting unique values and direagrding all other info apart of the specific date:
        //customer orders by paticular date:
        const r = this.getCustomerOrdersByDate(allChartData,dates)['data'];
        console.log('r',r);

        //pushing our data into format which is usable by chartJS:
        this.lineChartLabels = r[0].orders.map(o=>o['date']);

        //3 arrays for each customer which chartJS expects:
        this.lineChartData =[
          {'data': r[0].orders.map(x=>x.total),'label': r[0]['customer']},
          {'data': r[1].orders.map(x=>x.total),'label': r[1]['customer']},
          {'data': r[2].orders.map(x=>x.total),'label': r[2]['customer']},
        ];
      });
    });
  }

  getChartData(allOrders: any,name: string){
    const customerOrders = allOrders.filter(o=>o.customer.name === name);
    //console.log("name:",name,"customer Orders:",customerOrders);

    const formattedOrders = customerOrders.reduce((r,e)=>{
      r.push([e.placed,e.total]);
      return r;
    },[]);

    console.log("formatted Orders:",formattedOrders);

    const result = {customer: name, data: formattedOrders};
    return result;

  }

  getCustomerOrdersByDate(orders: any,dates: any){
    //for each customer --> for each date -->
    //{ data:[{'customer': 'ABC', 'orders':[{'date':'12-11-20',total:2367},{},{}]},{},{}]} 
    //- array of objects which represent 3 customers and their orders
    const customers = this.topCustomers;
    const prettyDates = dates.map(x => this.toFriendlyDate(x));
    //console.log(prettyDates);
    //getting unique dates:
    const u = Array.from(new Set(prettyDates)).sort();
    //console.log(u);
    //define our result object to return :
    const result = {};
    const dataSets = result['data'] = [];

    //this reduce function is sort of "for eachof the customer(there are 3 of them)"
    //we supply the third prameter this time. This is an index of current iteration(z):
    //x is accumulator, and y is the current iteration
    customers.reduce((x, y, i) => {
      //console.log('i',i);

      const customerOrders = [];
      //for each index in our dataSet we will build dataSets objects:
      dataSets[i]={
        //customer's name and orders array.We need to get the orders for each date in the set of 
        //dates that we have:
        customer: y, orders:
        u.reduce((r, e, j)=>{
          const obj = {};
          obj['date'] = e;
          //parameters: e - for that date, y - for a particular customer:
          obj['total'] = this.getCustomerDateTotal(e,y); //sum the total for the 
          //particular customer for that date

          customerOrders.push(obj);
          return customerOrders;
        })
      };
      return x;
    },[]);

    return result;
  }

  toFriendlyDate(date: Date){
    return moment(date).endOf('day').format('YY-MM-DD');
  }

  getCustomerDateTotal(date: any,customer: string){

    const r = this.allOrders.filter(o => o.customer.name === customer &&
      this.toFriendlyDate(o.placed)===date);

    const result = r.reduce((a,b)=>{
      return a + b.total;
    },0);

    return result;
  }
}
