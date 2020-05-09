import { Component, OnInit } from '@angular/core';
import { LINE_CHART_COLORS } from '../../shared/chart.colors';

const LINE_CHART_SAMPLE_DATA: any[] = [
  {data: [45,78,24,56,12,63], label: 'Sentiment Anaysis'},
  {data: [87,34,56,52,62,88], label: 'Image Recognition'},
  {data: [12,15,34,93,24,65], label: 'Forecasting'},
];

const LINE_CHART_SAMPLE_LABELS: string[] = ['Jan','Feb','Mar','Apr','May'];

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor() { }

  lineChartData =LINE_CHART_SAMPLE_DATA;
  lineChartLabels = LINE_CHART_SAMPLE_LABELS;
  lineChartOptions: any = {
    responsive: true,

  };
  lineChartLegend =true;
  lineChartType = 'line';
  lineChartColors = LINE_CHART_COLORS;

  ngOnInit(): void {
  }

}
