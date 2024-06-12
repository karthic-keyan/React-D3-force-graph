import React, { useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import useWindowDimensions from "./useWindowDimensions"; // Assuming the custom hook file is named useWindowDimensions.js

const ForceGraph = () => {
  const { width, height } = useWindowDimensions();
  const fgRef = useRef();

  // Generate sample data
  const generateGraphData = () => {
    const nodes = [];
    const links = [];

    // Create parent nodes
    for (let i = 0; i < 5; i++) {
      const parentId = `parent-${i}`;
      nodes.push({ id: parentId, group: "parent", val: 10 });

      // Create a random number of child nodes for each parent (between 10 and 50)
      const numOfChildren = Math.floor(Math.random() * 41) + 10;
      for (let j = 0; j < numOfChildren; j++) {
        const childId = `child-${i}-${j}`;
        nodes.push({ id: childId, group: "child", val: 10 });
        links.push({ source: parentId, target: childId });
      }
    }

    return { nodes, links };
  };

  const graphData = generateGraphData();
  console.log("graphData", graphData);

  //   useEffect(() => {
  //     const fg = fgRef.current;
  //     fg.d3Force("link").distance((link) => {
  //       return link.source.group === "parent" && link.target.group === "child"
  //         ? 150
  //         : 100;
  //     });
  //     fg.d3Force("collision", d3.forceCollide(100)); // Add collision force with radius 20
  //   }, []);

  return (
    <div className="force-graph-container">
      <ForceGraph2D
        ref={fgRef}
        width={width - 200}
        height={height - 200}
        graphData={graphData}
        linkDirectionalArrowLength={4}
        linkDirectionalArrowRelPos={1}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 2;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle =
            node.color || (node.group === "parent" ? "red" : "blue");

          // Draw circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
          ctx.fill();

          // Draw node label
          ctx.fillStyle = "black";
          ctx.fillText(label, node.x, node.y);
        }}
        nodePointerAreaPaint={(node, color, ctx) => {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI, false);
          ctx.fill();
        }}
      />
    </div>
  );
};

export default ForceGraph;
