import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import * as d3 from "d3";

const BarChart = (props) => {
  const ref = useRef();

  useEffect(() => {
    // set the dimensions and margins of the graph
    let margin = { top: 10, right: 30, bottom: 30, left: 40 },
      width = 480 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;

    let ratio = 1;

    if (document.scrollingElement.clientWidth <= 480) {
      ratio = document.scrollingElement.clientWidth / 500;
      margin = {
        top: 10 * ratio,
        right: 30 * ratio,
        bottom: 30 * ratio,
        left: 40 * ratio,
      };
      width = 480 * ratio - margin.left - margin.right;
      height = 450 * ratio - margin.top - margin.bottom;
    }

    // append the svg object to the body of the page
    const svg = d3
      .select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .select("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg.selectAll("rect").remove();
    svg.selectAll("text").remove();

    // set the color scale
    const color = d3
      .scaleOrdinal()
      .domain(["consistent", "inconsistent"])
      .range(d3.schemeDark2);

    const data = props.data;

    //
    var toolTip = d3
      .select("#svgContainer")
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px");
    //

    const mouseOver = () => {
      toolTip.style("visibility", "visible");
    };

    const mouseMove = (event) => {
      toolTip
        .style("left", event.pageX + 50 + "px")
        .style("top", event.pageY - 50 + "px")
        .html(event.target.id);
    };

    const mouseLeave = () => {
      toolTip.style("visibility", "hidden");
    };

    // sort data
    // data.sort(function (b, a) {
    //   return a.value - b.value;
    // });

    // X axis
    var x = d3
      .scaleBand()
      .range([0, width])
      .domain(
        data.map(function (d) {
          return d.type;
        })
      )
      .padding(0.2);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", `translate(0,${8 * ratio})rotate(0)`)
      .style("text-anchor", "middle")
      .style("font-size", `${1.4 * ratio}em`);

    // Add Y axis
    var y = d3.scaleLinear().domain([0, 0.6]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(d.type);
      })
      .attr("y", function (d) {
        return y(d.value);
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
        return height - y(d.value);
      })
      .attr("fill", (d) => {
        return color(d);
      })
      .attr("id", (d) => {
        return `${d.type}: ${d.value}s`;
      });

    svg
      .selectAll("rect")
      .on("mouseover", mouseOver)
      .on("mousemove", mouseMove)
      .on("mouseleave", mouseLeave);
  }, [props.data]);

  return (
    <React.Fragment>
      <span style={{ display: "inline-block" }}>
        <h2>平均時間</h2>
        <svg ref={ref}>
          <g></g>
        </svg>
      </span>
    </React.Fragment>
  );
};

export default BarChart;
