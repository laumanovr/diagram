import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import { DiagramService } from '../../services/diagram.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-diagram',
  templateUrl: 'diagram.component.html',
  styleUrls: ['diagram.component.scss']
})

export class DiagramComponent implements OnInit {
  public dates = [];
  public degrees = [];
  public chart = Chart;
  public selectDates = [];
  public dateFrom: number;
  public dateTo: number;
  public activeTab = '';

  constructor(private diagramService: DiagramService) {
  }

  ngOnInit() {
    this.getSelectDates();
    this.getTemperatures();
  }

  getSelectDates() {
    let   startDate = 1880;
    const endDate   = 2006;
    while (startDate < endDate) {
      startDate += 1;
      this.selectDates.push(startDate);
    }
  }

  getTemperatures() {
    this.dates = [];
    this.degrees = [];
    this.activeTab = 'temp';
    if (this.chart['ctx']) {
      this.chart.destroy();
    }
    this.diagramService.getTemperature().subscribe((resp) => {
      resp.forEach((item) => {
        this.dates.push(item['t']);
        this.degrees.push(item['v']);
      });
      this.getChart();
    });
    setTimeout(() => {
      Array.from(document.querySelectorAll('select')).forEach(select => { select.selectedIndex = 0; });
    }, 300);
  }

  getPrecipitations() {
    this.dates = [];
    this.degrees = [];
    this.activeTab = 'precip';
    this.chart.destroy();
    Array.from(document.querySelectorAll('select')).forEach(select => { select.selectedIndex = 0; });
    this.diagramService.getPrecipitation().subscribe((resp) => {
      resp.forEach((item) => {
        this.dates.push(item['t']);
        this.degrees.push(item['v']);
      });
      this.getChart();
    });
  }

  getFilteredData() {
    if ((this.dateFrom && this.dateTo) !== undefined) {
      this.dates = [];
      this.degrees = [];
      this.chart.destroy();

      if (this.activeTab === 'temp') {
        this.diagramService.getTemperature().subscribe((resp) => {
          resp.forEach((item) => {
            const year = Number(item.t.slice(0, 4));
            if (year >= this.dateFrom && year <= Number(this.dateTo)) {
              this.dates.push(item['t']);
              this.degrees.push(item['v']);
            }
          });
          this.getChart();
        });
      } else {
        this.diagramService.getPrecipitation().subscribe((resp) => {
          resp.forEach((item) => {
            const year = Number(item.t.slice(0, 4));
            if (year >= this.dateFrom && year <= Number(this.dateTo)) {
              this.dates.push(item['t']);
              this.degrees.push(item['v']);
            }
          });
          this.getChart();
        });
      }
    }
  }

  getChart() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.dates,
        datasets: [
          {
            data: this.degrees,
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }
}
