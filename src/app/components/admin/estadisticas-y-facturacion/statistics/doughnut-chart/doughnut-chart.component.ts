import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html'
})
export class DoughnutChartComponent implements OnInit {

  @Input() public doughnutChartLabels:Label[] ;
  @Input() public doughnutChartData:MultiDataSet;  
  @Input() public doughnutChartType: ChartType  ;
  @Input() public title:string;

  constructor() { }

  ngOnInit() {
  }

}
