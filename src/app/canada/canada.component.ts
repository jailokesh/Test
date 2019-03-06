import { Component, OnInit } from '@angular/core';
import { ChartService } from '../chart.service';
import { FormControl } from '@angular/forms';
import * as d3 from 'd3';

interface AfterViewInit {
  ngAfterViewInit(): void
}

@Component({
  selector: 'app-canada',
  templateUrl: './canada.component.html',
  styleUrls: ['./canada.component.css']
})
export class CanadaComponent implements OnInit, AfterViewInit {

  tabs = [{ "name": 'Male', "title": "Adjusted net intake rate (%) Primary Male - Canada", "id": "canada" },
  { "name": 'Female', "title": "Adjusted net intake rate (%) Primary Female - Canada", "id": "canada" },
  { "name": 'Total', "title": "Adjusted net intake rate (%) Primary Total - Canada", "id": "canada" }];
  selected = new FormControl(0);

  constructor(private chart: ChartService) { }

  ngAfterViewInit() {
    this.callService(0);
  }

  ngOnInit() {

  }

  tabIndex($event) {
    this.callService($event.index);
  }

  callService(index) {

    d3.selectAll(`#canada${index} > *`).remove();
    
    let dimensions = {};
    if(document.getElementById(`canada${index}`).offsetWidth < 600){
      dimensions = {
        width: document.getElementById(`canada${index}`).offsetWidth+50,
        height: 400
      };
    }else{
      dimensions = {
        width: document.getElementById(`canada${index}`).offsetWidth,
        height: 400
      };
    }

    let url = {
      "male": "https://www.quandl.com/api/v3/datasets/WEDU/CAN_UIS_NIRA_1_M.json?api_key=k4bYNhQRSYQ_fJuyR3sz",
      "female": "https://www.quandl.com/api/v3/datasets/WEDU/CAN_UIS_NIRA_1_F.json?api_key=k4bYNhQRSYQ_fJuyR3sz",
      "total": "https://www.quandl.com/api/v3/datasets/WEDU/CAN_UIS_NIRA_1.json?api_key=k4bYNhQRSYQ_fJuyR3sz"
    };

    if (index == 0) {
      this.chart.getData(url.male).subscribe(res => {
        let arr = [];
        res.dataset.data.map(a => {
          arr.push({ "x": a[0], "y": a[1] });
        })
        console.log(arr);
        this.chart.lineChart("canada" + index, dimensions, arr).subscribe(done => console.log('done'));
      });
    } else if (index == 1) {
      this.chart.getData(url.female).subscribe(res => {
        let arr = [];
        res.dataset.data.map(a => {
          arr.push({ "x": a[0], "y": a[1] });
        })
        console.log(arr);
        this.chart.lineChart("canada" + index, dimensions, arr).subscribe(done => console.log('done'));
      });
    } else {
      this.chart.getData(url.total).subscribe(res => {
        let arr = [];
        res.dataset.data.map(a => {
          arr.push({ "x": a[0], "y": a[1] });
        })
        console.log(arr);
        this.chart.lineChart("canada" + index, dimensions, arr).subscribe(done => console.log('done'));
      });
    }

  }

}
