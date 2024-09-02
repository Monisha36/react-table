// src/App.js
import React from "react";
import BasicTable from "../src/componets/basic-table";
import data from "./data.json";

function App() {
  return (
    <div>
      <h1>Expandable Table</h1>
      <BasicTable data={data} />
    </div>
  );
}

export default App;
