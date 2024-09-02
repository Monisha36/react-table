import React, { useState } from "react";
import {
  createTable,
  useTableInstance,
  getCoreRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";

const table = createTable();

const defaultColumns = [
  table.createDataColumn("firstName", {
    header: "First Name",
    cell: ({ row, getValue }) => (
      <div
        style={{ paddingLeft: `${row.depth * 2}rem`, cursor: "pointer" }}
        onClick={row.getToggleExpandedHandler()}
      >
        {getValue()}
        {row.getCanExpand() ? (row.getIsExpanded() ? "" : "") : ""}
      </div>
    ),
  }),
  table.createDataColumn("middleName", {
    header: "Middle Name",
  }),
  table.createDataColumn("lastName", {
    header: "Last Name",
  }),
  table.createDataColumn("age", {
    header: "Age",
  }),
  table.createDataColumn("phone[0]", {
    header: "Phone Number 1",
  }),
  table.createDataColumn("phone[1]", {
    header: "Phone Number 2",
  }),
  table.createDataColumn("date_of_birth", {
    header: "Date of Birth",
    cell: (props) => new Date(props.getValue()).toDateString(),
  }),
  table.createDataColumn("date_of_admission", {
    header: "Date of Admission",
    cell: (props) => new Date(props.getValue()).toDateString(),
  }),
];

const BasicTable = ({ data }) => {
  const [expanded, setExpanded] = useState({});

  const instance = useTableInstance(table, {
    data,
    columns: defaultColumns,
    state: { expanded },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div>
      <table border={1} style={{ width: "100%", tableLayout: "fixed" }}>
        <thead>
          {instance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ backgroundColor: "#5491C5", color: "white", padding: "0.5rem" }}
                >
                  {header.isPlaceholder ? null : header.renderHeader()}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {instance.getRowModel().rows.map((row) => (
            <React.Fragment key={row.id}>
              <tr>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{cell.renderCell()}</td>
                ))}
              </tr>
              {row.getIsExpanded() && row.original.subRows ? (
                <tr>
                  <td colSpan={instance.getAllColumns().length} style={{ padding: "0.5rem" }}>
                    <table border={1} style={{ width: "100%", tableLayout: "fixed", background: "#f9f9f9" }}>
                      <thead>
                        <tr  style={{ backgroundColor: "#5491C5", color: "white", padding: "0.5rem" }}>
                          <th>Course</th>
                          <th>Instructor</th>
                          <th>Semester</th>
                          <th>Phone Number 1</th>
                          <th>Phone Number 2</th>
                          <th>Date of Birth</th>
                          <th>Date of Admission</th>
                        </tr>
                      </thead>
                      <tbody>
                        {row.original.subRows.map((subRow, subIndex) => (
                          <tr key={subIndex}>
                            <td>{subRow.course}</td>
                            <td>{subRow.instructor}</td>
                            <td>{subRow.semester}</td>
                            <td>{subRow.phone[0]}</td>
                            <td>{subRow.phone[1]}</td>
                            <td>{new Date(subRow.date_of_birth).toDateString()}</td>
                            <td>{new Date(subRow.date_of_admission).toDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              ) : null}
            </React.Fragment>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default BasicTable;
