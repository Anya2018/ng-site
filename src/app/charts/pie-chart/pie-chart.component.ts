import { Component, OnInit, Input } from '@angular/core';
import _ from 'lodash';
import {THEME_COLORS} from '../../shared/theme.colors';

const theme = 'Default';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  @Input() inputData: any;
  @Input() limit: number;

  pieChartData: number[];
  pieChartLabels: string[];
  pieChartType = 'doughnut';
  pieChartColors: any[] = [
    {
      backgroundColor:this.themeColors(theme),
      borderColor: '#111',
    }
  ];
  pieChartLegend = true;

  ngOnInit(): void {
    this.parseChartData(this.inputData,this.limit);
  }

  parseChartData(res: any, limit?: number){
    const allData = res.slice(0,limit);

    this.pieChartData = allData.map(x=> _.values(x)[1]);
    this.pieChartLabels = allData.map(x=> _.values(x)[0]);

  }

  themeColors(setName:string):string[] {
    const c = THEME_COLORS.slice(0)
    .find(set=>set.name === setName).colorSet;

    return c;
  }

}
