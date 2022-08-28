import React, { useEffect } from "react";
import * as d3 from "d3";
import { useRef } from "react";

const PieChart = (props) => {
  const ref = useRef();

  useEffect(() => {
    var width = 480,
      height = 450,
      margin = 40;

    if (document.scrollingElement.clientWidth <= 480) {
      width = (document.scrollingElement.clientWidth * 7) / 8;
      height = (width * 15) / 16;
      margin = width / 12;
    }

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin;

    // append the svg object to the div called 'my_dataviz'
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .select("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const data = props.data;

    // set the color scale
    const color = d3
      .scaleOrdinal()
      .domain(["Correct", "Wrong"])
      .range(d3.schemeDark2);

    // Compute the position of each group on the pie:
    const pie = d3
      .pie()
      .value(function (d) {
        return d[1];
      })
      .sort(function (a, b) {
        return d3.ascending(a.key, b.key);
      }); // This make sure that group order remains the same in the pie chart

    const data_ready = pie(Object.entries(data));
    // map to data
    let u = svg.selectAll("path").data(data_ready);

    var Tooltip = d3
      .select("#svgContainer")
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px");

    var mouseover = (d) => {
      Tooltip.style("visibility", "visible");
    };

    var mousemove = (d) => {
      Tooltip.style("left", d.pageX + 50 + "px")
        .style("top", d.pageY - 50 + "px")
        .html(d.target.id);
    };

    var mouseleave = (d) => {
      Tooltip.style("visibility", "hidden");
    };

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    u.join("path")
      //   .transition()
      //   .duration(1000)
      .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
      .attr("fill", (d) => {
        return color(d.data[0]);
      })
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
      .attr("id", (d) => {
        return `${d.data[0]}: ${data[d.data[0]] * 100}%`;
      });

    svg
      .selectAll("path")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);

    var keys = ["Correct", "Wrong"];
    var legend = d3.select(ref.current);

    legend
      .selectAll("mydots")
      .data(keys)
      .join("circle")
      .attr("cx", "75%")
      .attr("cy", function (d, i) {
        return (height * 8) / 9 + i * 25;
      }) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("r", 7)
      .style("fill", function (d) {
        return color(d);
      });

    legend
      .selectAll("mylabels")
      .data(keys)
      .join("text")
      .attr("x", "78%")
      .attr("y", function (d, i) {
        return (height * 8) / 9 + i * 25;
      }) // 100 is where the first dot appears. 25 is the distance between dots
      .style("fill", function (d) {
        return color(d);
      })
      .text(function (d) {
        return d;
      })
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle");
  }, [props.data]);

  return (
    <React.Fragment>
      <span style={{ display: "inline-block" }}>
        <h2>正確率</h2>
        <svg ref={ref}>
          <g></g>
        </svg>
      </span>
    </React.Fragment>
  );
};

export default PieChart;
