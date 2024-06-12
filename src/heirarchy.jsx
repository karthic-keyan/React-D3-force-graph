import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const HierarchyChart = () => {
  const ref = useRef();
  const svgRef = useRef(); // Reference to the SVG element

  useEffect(() => {
    // Clear the existing SVG to prevent duplication
    d3.select(ref.current).selectAll("svg").remove();

    const data = {
      name: "Root",
      children: [
        {
          name: "Parent 1",
          children: Array.from({ length: Math.random() * 15 + 5 }, (_, i) => ({
            name: `Child 1.${i + 1}`,
          })),
        },
        {
          name: "Parent 2",
          children: Array.from({ length: Math.random() * 15 + 5 }, (_, i) => ({
            name: `Child 2.${i + 1}`,
          })),
        },
        {
          name: "Parent 3",
          children: Array.from({ length: Math.random() * 15 + 5 }, (_, i) => ({
            name: `Child 3.${i + 1}`,
          })),
        },
        {
          name: "Parent 4",
          children: Array.from({ length: Math.random() * 15 + 5 }, (_, i) => ({
            name: `Child 4.${i + 1}`,
          })),
        },
        {
          name: "Parent 5",
          children: Array.from({ length: Math.random() * 15 + 5 }, (_, i) => ({
            name: `Child 5.${i + 1}`,
          })),
        },
      ],
    };

    const cluster = d3.cluster().size([1000, 600]); // Adjust size to better fit the cluster layout
    const root = d3.hierarchy(data);

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", "90vw")
      .attr("height", "80vh")
      .attr("viewBox", [-50, -50, 1000, 600]) // Updated to allow some margin around the content
      .call(
        d3.zoom().on("zoom", (event) => {
          svg.attr("transform", event.transform);
        })
      )
      .append("g");

    svgRef.current = svg;

    const links = cluster(root).links();
    const linkPathGenerator = d3
      .linkHorizontal()
      .x((d) => d.y)
      .y((d) => d.x);

    svg
      .selectAll("path")
      .data(links)
      .enter()
      .append("path")
      .attr("d", linkPathGenerator)
      .attr("fill", "none")
      .attr("stroke", "#555");

    svg
      .selectAll("circle")
      .data(root.descendants())
      .enter()
      .append("circle")
      .attr("cx", (d) => d.y)
      .attr("cy", (d) => d.x)
      .attr("r", 4);

    svg
      .selectAll("text")
      .data(root.descendants())
      .enter()
      .append("text")
      .attr("x", (d) => d.y + 5)
      .attr("y", (d) => d.x)
      .attr("dy", "0.32em")
      .attr("text-anchor", "start")
      .text((d) => d.data.name);
  }, []);

  return <div ref={ref} />;
};

export default HierarchyChart;
