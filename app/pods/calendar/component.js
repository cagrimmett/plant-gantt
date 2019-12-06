import Component from "@ember/component";
import { scaleTime, scaleBand } from "d3-scale";
import { select, selectAll } from "d3-selection";
import { axisBottom } from "d3-axis";
import { timeFormat } from "d3-time-format";
import { timeWeek, timeDay } from "d3-time";
import { action } from "@ember/object";

let data = [
  {
    start: "May 10, 2020",
    daysToMaturity: 29,
    name: "Radishes",
    color: "#ea5189"
  },
  {
    start: "May 1, 2020",
    daysToMaturity: 80,
    name: "Anaheim Peppers",
    color: "#66e15b"
  },
  {
    start: "June 15, 2020",
    daysToMaturity: 60,
    name: "Lacinato Kale",
    color: "#036b47"
  },
  {
    start: "May 3, 2020",
    daysToMaturity: 80,
    name: "Eggplant",
    color: "purple"
  },
  {
    start: "May 20, 2020",
    daysToMaturity: 75,
    name: "Roma Tomatoes",
    color: "#ff5050"
  }
];

function sortDateAscending(a, b) {
  return new Date(a.start) - new Date(b.start);
}
let sortedData, lastItem;
function drawChart() {
  sortedData = data.sort(sortDateAscending);
  lastItem = sortedData.length - 1;
  let margin = { top: 30, right: 0, bottom: 10, left: 30 };
  let height = data.length * 25 + margin.top + margin.bottom;
  let svg = select("#calendar-container")
    .append("svg")
    .attr("width", "100%")
    .attr("height", height + 50)
    .attr("id", "calendar");

  let width = svg.node().getBoundingClientRect().width;

  let x = scaleTime()
    .domain([
      timeDay.offset(new Date(data.sort(sortDateAscending)[0].start), -15),
      timeDay.offset(
        new Date(data.sort(sortDateAscending)[lastItem].start),
        data.sort(sortDateAscending)[lastItem].daysToMaturity + 15
      )
    ])
    .range([10, width - 10]);

  let y = scaleBand()
    .domain(data.sort(sortDateAscending).map(d => d.name))
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
    .data(data.sort(sortDateAscending))
    .join("rect")
    .attr("x", d => x(new Date(d.start)))
    .attr("height", y.bandwidth())
    .attr("y", d => y(d.name))
    .style("fill", d => d.color)
    .attr("rx", "5")
    .attr(
      "width",
      d =>
        x(timeDay.offset(new Date(d.start), d.daysToMaturity)) -
        x(new Date(d.start))
    );

  svg
    .append("g")
    .attr("fill", "white")
    .attr("text-anchor", "middle")
    .style("font", "12px sans-serif")
    .selectAll("text")
    .data(data.sort(sortDateAscending))
    .join("text")
    .attr(
      "x",
      d =>
        (x(timeDay.offset(new Date(d.start), d.daysToMaturity)) +
          x(new Date(d.start))) /
        2
    )
    .attr("y", d => y(d.name) + y.bandwidth() / 2)
    .attr("dy", "0.35em")
    .text(d => d.name);
}

export default class Calendar extends Component {
  newItem = null;
  today = new Date();

  showForm = false;

  @action
  toggle() {
    this.set("showForm", true);
  }

  @action
  addToChart() {
    let object = {
      start: this.startDate,
      daysToMaturity: Number(this.daysToMaturity),
      name: this.name,
      color: "#A6D785"
    };
    data.push(object);
    selectAll("svg").remove();
    drawChart();
  }

  didInsertElement() {
    drawChart();

    window.addEventListener("resize", function() {
      selectAll("svg").remove();
      drawChart();
    });
  }
}
