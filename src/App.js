import React from "react";
import "./App.css";
import ForceGraph from "./forcegraph";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Force Graph Example</h1>
      </header>
      <main>
        <ForceGraph />
      </main>
    </div>
  );
};

export default App;
