import React from "react";
import "./App.css";
import ForceGraph from "./forcegraph";
import HierarchyChart from "./heirarchy";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Force Graph Example</h1>
      </header>

      <main>
        <ForceGraph />
      </main>
      <main>
        <HierarchyChart />
      </main>
    </div>
  );
};

export default App;
