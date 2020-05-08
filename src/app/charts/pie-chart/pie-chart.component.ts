import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  pieChartData: number[] = [350,456,190];
  pieChartLabels: string[] = ['DHL','JJJ','CTR'];
  pieChartType = 'doughnut';
  pieChartColors: any[] = [
    {
      backgroundColor:['#26547c','#ff6b6b','#ffd166'],
      borderColor: '#111',
    }
  ];
  pieChartLegend = true;

  ngOnInit(): void {
  }

}
