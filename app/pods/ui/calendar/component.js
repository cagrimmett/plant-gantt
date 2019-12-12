import Component from "@ember/component";
import { scaleTime, scaleBand } from "d3-scale";
import { select, selectAll } from "d3-selection";
import { axisBottom } from "d3-axis";
import { timeFormat } from "d3-time-format";
import { timeWeek, timeDay } from "d3-time";
import { computed } from "@ember/object";

export default class Calendar extends Component {
  newItem = null;
  today = new Date();

  @computed("data")
  get windowListener() {
    if (this.data.length > 0) {
      window.addEventListener("resize", function() {
        selectAll("svg").remove();
      });
    }
  }

  didInsertElement() {
    this.drawChart();
  }

  didUpdateAttrs() {}

  drawChart() {
    selectAll("svg").remove();
    function sortDateAscending(a, b) {
      return new Date(a.startDate) - new Date(b.startDate);
    }
    let sortedData;
    sortedData = this.data.map(c => c.toJSON()).sort(sortDateAscending);
    function maxIndex(values, valueof) {
      let max;
      let maxIndex = -1;
      let index = -1;
      if (valueof === undefined) {
        for (const value of values) {
          ++index;
          if (
            value != null &&
            (max < value || (max === undefined && value >= value))
          ) {
            (max = value), (maxIndex = index);
          }
        }
      } else {
        for (let value of values) {
          if (
            (value = valueof(value, ++index, values)) != null &&
            (max < value || (max === undefined && value >= value))
          ) {
            (max = value), (maxIndex = index);
          }
        }
      }
      return maxIndex;
    }
    let margin = { top: 30, right: 0, bottom: 10, left: 30 };
    let height = this.data.length * 25 + margin.top + margin.bottom;
    let svg = select("#calendar-container")
      .append("svg")
      .attr("width", "100%")
      .attr("height", height + 50)
      .attr("id", "calendar");

    let width = svg.node().getBoundingClientRect().width;
    let lastToHarvest = maxIndex(sortedData, d =>
      timeDay.offset(new Date(d.startDate), d.daysToMaturity)
    );
    let x = scaleTime()
      .domain([
        timeDay.offset(new Date(sortedData[0].startDate), -15),
        timeDay.offset(
          new Date(sortedData[lastToHarvest].startDate),
          sortedData[lastToHarvest].daysToMaturity + 15
        )
      ])
      .range([10, width - 10]);

    let y = scaleBand()
      .domain(sortedData.map(d => d.name))
      .range([margin.top, height - margin.bottom])
      .padding(0.1);

    svg.append("g").call(
      axisBottom()
        .scale(x)
        .ticks(timeWeek.every())
        .tickFormat(timeFormat("%b %d"))
    );

    svg
      .append("g")
      .selectAll("rect")
      .data(sortedData)
      .join("rect")
      .attr("x", d => x(new Date(d.startDate)))
      .attr("height", y.bandwidth())
      .attr("y", d => y(d.name))
      .style("fill", d => d.color)
      .attr("rx", "5")
      .attr(
        "width",
        d =>
          x(timeDay.offset(new Date(d.startDate), d.daysToMaturity)) -
          x(new Date(d.startDate))
      );

    svg
      .append("g")
      .attr("fill", "white")
      .attr("text-anchor", "middle")
      .style("font", "12px sans-serif")
      .selectAll("text")
      .data(sortedData)
      .join("text")
      .attr(
        "x",
        d =>
          (x(timeDay.offset(new Date(d.startDate), d.daysToMaturity)) +
            x(new Date(d.startDate))) /
          2
      )
      .attr("y", d => y(d.name) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .text(d => d.name);
  }
}
