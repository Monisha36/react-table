import React, { useState } from "react";
import SelectCheckBox from "../src/componets/SelectCheckBox";
import data from "./data.json";
import "./App.css"; 

function App() {
  const [filters, setFilters] = useState({
    status: [],
    offer: [],
    reject: [],
  });

  const handleFilterChange = (filterType, selectedValues) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: selectedValues,
    }));
  };

  const filteredData = data.filter((item) => {
    const statusMatch = filters.status.length
      ? filters.status.includes(item.status)
      : true;
    const offerMatch = filters.offer.length
      ? filters.offer.includes(item.offer)
      : true;
    const rejectMatch = filters.reject.length
      ? filters.reject.includes(item.reject)
      : true;

    return statusMatch && offerMatch && rejectMatch;
  });

  return (
    <div>
      <h1>Select Data by Filter</h1>
      <SelectCheckBox
        filterName="status"
        label="Status"
        options={["Active", "Interview Processing", "Hold", "Rejected"]}
        onFilterChange={handleFilterChange}
      />
      <SelectCheckBox
        filterName="offer"
        label="Offer"
        options={["Offered", "Closed"]}
        onFilterChange={handleFilterChange}
      />
      <SelectCheckBox
        filterName="reject"
        label="Reject"
        options={["Rejected", "Closed"]}
        onFilterChange={handleFilterChange}
      />

      <table className="centered-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Offer</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.status}</td>
              <td>{item.offer}</td>
              <td>{item.reject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
