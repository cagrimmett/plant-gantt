import Component from "@ember/component";
import { scaleTime, scaleBand } from "d3-scale";
import { select } from "d3-selection";
import { axisBottom } from "d3-axis";
import { timeFormat } from "d3-time-format";
import { timeMonth } from "d3-time";

let data = [
  {
    start: "February 27, 2020",
    end: "May 23, 2020",
    name: "Broccoli",
    color: "#A6D785"
  },
  {
    start: "April 2, 2020",
    end: "June 5, 2020",
    name: "Apples",
    color: "red"
  },
  {
    start: "August 30, 2020",
    end: "November 20, 2020",
    name: "Kale",
    color: "#006400"
  },
  {
    start: "May 3, 2020",
    end: "August 12, 2020",
    name: "Eggplant",
    color: "purple"
  },
  {
    start: "May 20, 2020",
    end: "July 30, 2020",
    name: "Tomatoes",
    color: "blue"
  }
];

function sortDateAscending(a, b) {
  return new Date(a.start) - new Date(b.start);
}

data = data.sort(sortDateAscending);

export default class Calendar extends Component {
  didInsertElement() {
    let svg = select(this.$("svg")[0]);
    let margin = { top: 30, right: 0, bottom: 10, left: 30 };
    let height = data.length * 25 + margin.top + margin.bottom;
    let width = 1200;

    let x = scaleTime()
      .domain([
        new Date("January 1, 2020 00:00:00"),
        new Date("December 31, 2020 23:59:59")
      ])
      .range([10, width - 10]);

    let y = scaleBand()
      .domain(data.map(d => d.name))
      .range([margin.top, height - margin.bottom])
      .padding(0.1);

    svg.append("g").call(
      axisBottom()
        .scale(x)
        .ticks(timeMonth.every())
        .tickFormat(timeFormat("%b"))
    );

    svg
      .append("g")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => x(new Date(d.start)))
      .attr("height", y.bandwidth())
      .attr("y", d => y(d.name))
      .style("fill", d => d.color)
      .attr("rx", "5")
      .attr("width", d => x(new Date(d.end)) - x(new Date(d.start)));

    svg
      .append("g")
      .attr("fill", "white")
      .attr("text-anchor", "middle")
      .style("font", "12px sans-serif")
      .selectAll("text")
      .data(data)
      .join("text")
      .attr("x", d => (x(new Date(d.end)) + x(new Date(d.start))) / 2)
      .attr("y", d => y(d.name) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .text(d => d.name);
  }
}
