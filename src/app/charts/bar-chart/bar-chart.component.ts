import { Component, OnInit } from '@angular/core';

const SAMPLE_BARCHART_DATA: any[]=[
  {data:[38,24,78,12,34,87,55], label:'Q3 Sales'},
  {data:[58,23,90,12,84,21,95], label:'Q4 Sales'},
];

const SAMPLE_BARCHART_LABELS: string[]=['w1','w2','w3','w4','w5','w6','w7'];



@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor() { }

  public barChartData: any[] = SAMPLE_BARCHART_DATA;
  public barChartLabels: string[] = SAMPLE_BARCHART_LABELS;
  public barChartLegend =true;
  public barChartType = 'bar';
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    respnsive: true,
  }


  ngOnInit(): void {
  }

}
