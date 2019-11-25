import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartPoint } from 'chart.js';
import { Color, Label, BaseChartDirective } from 'ng2-charts';
import { AppState, selectBidState } from 'src/app/store/app.reducer';
import { Store, select } from '@ngrx/store';
import * as fromBids from '../../../store/bid/bid.reducer';
import { Bid } from 'src/app/models/bid';


@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent implements OnInit {

  public currentAmount: number = 0;
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    scales: {
      xAxes: [{
        type: 'linear',
        ticks: {
          min: 2015,
          max: 2019,
          stepSize: 1,
        }
      }],
      yAxes: [{
        ticks: {
          min: -0.1,
          max: 15000000,
          stepSize: 3000000,
        }
      }]
    },
    title: {
      text: 'Сумма общих стоимостей заявок (в рублях)',
      display: true,
      fontSize: 16
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

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store
      .pipe(
        select(selectBidState),
        select(fromBids.selectAll)
      )
      .subscribe(data => {
        data.forEach(item=>{
          console.log(item.totalCost/100)
          this.currentAmount+=(item.totalCost/100);
        })
      });


    let points: ChartPoint[] = [{
      x: 2015,
      y: 1983043
    },
    {
      x: 2016,
      y: 2536576
    },
    {
      x: 2017,
      y: 3438866
    },
    {
      x: 2018,
      y: 5445387
    },
    {
      x: 2019,
      y: this.currentAmount
    }];

    this.lineChartData.push({
      data: points,
      radius: 10,
      pointHoverRadius: 10
    });
  }

}
