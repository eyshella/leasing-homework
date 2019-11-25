import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartPoint } from 'chart.js';
import { Color, Label, BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    scales: {
      xAxes: [{
        type: 'linear',
        ticks: {
          min: -0.1,
          max: 1.1,
          stepSize: 0.01,
        }
      }],
      yAxes: [{
        ticks: {
          min: -0.1,
          max: 1.1,
          stepSize: 0.1,
        }
      }]
    }
  }
  public lineChartColors: Color[] = [
    {
      borderColor: 'rgb(66,12,232)',
      backgroundColor: 'rgba(0,255,251,0.5)',
    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit() {
    /* for (let i = 0; i < values.length; i++) {
      const value = values[i];
      let point: ChartPoint = {
        x: value,
        y: (i) / values.length,
      }
      points.push(point);
    }
    this.lineChartData.push({
      data: points,
      label: 'Cantor distribution',
      pointRadius: 1
    }); */
  }

}
