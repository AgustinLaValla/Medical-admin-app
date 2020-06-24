import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{ticks:{beginAtZero:true}}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  @Input() public barChartType: ChartType = 'bar';
  @Input() public title:string = '';
  @Input() public barChartLabels: Label[] = [];
  @Input() public barChartData: ChartDataSets[] = []



  constructor() { }

  ngOnInit() {
  }

}
