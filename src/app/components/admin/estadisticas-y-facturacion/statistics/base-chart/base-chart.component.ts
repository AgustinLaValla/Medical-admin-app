import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-base-chart',
  templateUrl: './base-chart.component.html',
  styleUrls: ['./base-chart.component.css']
})
export class BaseChartComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          console.log(ctx.chart.data.labels[ctx.dataIndex]);
          return label;
        },
      },
    },
  };
  @Input() public pieChartLabels: Label[] = [];
  @Input() public pieChartData: number[] = [];
  @Input() public pieChartType: ChartType = 'pie';
  @Input() public title:string;
  public pieChartLegend = true;

  constructor() { }

  ngOnInit() {
  }

}
