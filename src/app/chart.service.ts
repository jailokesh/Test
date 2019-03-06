import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as d3 from 'd3';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private client: HttpClient) { }

  getData(url): Observable<any> {
    return this.client.get<any>(`${url}`);
  }

  lineChart(selector, dimensions, data): Observable<string> {
    return Observable.create(observer => {

      let tooltip = d3.select(`body`).append("div")
        .attr("class", "tooltip")
        .style('position', 'absolute')
        .style('font-size', '14px')
        .style('padding', '5px')
        .style('background', '#EEE')
        .style('border-radius', '5px')
        .style("opacity", 0)
        .style('z-index', 0);

      let margin = { top: 60, right: 60, bottom: 60, left: 60 },
          width = dimensions.width - margin.left - margin.right,
          height = dimensions.height - margin.top - margin.bottom;

      let dparse = d3.timeParse("%Y-%m-%d");
      let dformat = d3.timeFormat("%Y %b %d");

      let x = d3.scaleTime().range([0, width]);
      let y = d3.scaleLinear().range([height, 0]);

      let valueline = d3.line()
        .curve(d3.curveMonotoneX)
        .x(function (d: any) { return x(d.x); })
        .y(function (d: any) { return y(d.y); });

      let svg = d3.select(`#${selector}`).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      data = data.map(function (d) {
        let x_val = d3.timeParse("%Y-%m-%d")(d.x);
        d.x = x_val;
        d.y = +d.y;
        return d;
      }).sort((a, b) => {
        return a.x - b.x;
      });

      x.domain(<any>d3.extent(data, function (d) { return d["x"]; }));
      y.domain([0, <any>d3.max(data, function (d) { return d["y"]; })]);

      svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "#2ca02c")
        .attr("stroke-width", "2px")
        .attr("d", valueline);

      let dot = svg.append("g")
        .attr("id", "scatter")
        .selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3)
        .attr("cx", function (d: any) {
          return x(d.x);
        })
        .attr("cy", function (d: any) {
          return y(d.y);
        })
        .attr("stroke", "#000")
        .attr("stroke-width", "1px")
        .style("fill", "#2ca02c")
        .on("mouseover", function (d) {
          tooltip.transition()
            .duration(200)
            .style("opacity", .9)
            .style('z-index', 1000);
        })
        .on("mousemove", function (d) {
          tooltip
            .style("left", d3.event.pageX - 50 + "px")
            .style("top", d3.event.pageY - 60 + "px")
            .html(d["y"]);
        })
        .on("mouseout", function (d) {
          tooltip.transition()
            .duration(500)
            .style("opacity", 0)
            .style('z-index', 0);
        })
        .attr('height', 0)
        .transition().duration(200).delay(function (d, i) {
          return i * 50;
        })
        .attr('height', function (d) {
          return y(0) - y(d["y"]);
        })
        .attr('y', function (d) {
          return y(d["y"]);
        });

      svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%d/%m/%Y")))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate( -45)");

      svg.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y));
    })
  }

}
