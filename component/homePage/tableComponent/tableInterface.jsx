import React, { useState } from "react";
import ConfTable from "./confTable";
import EduTable from "./eduTable";
import EmpTable from "./empTable";
import PublicationTable from "./publicationTable";

const TableInterface = () => {
  const [selection, setSelection] = useState(0);

  function handleSelect(value) {
    setSelection(value);
  }

  const tableArr = [
    <EduTable />,
    <ConfTable />,
    <EmpTable />,
    <PublicationTable />,
  ];

  const styleForTables = {
    position: "relative",
    display: "table-cell",
    verticleAlign: "middle",
    fontSize: "0.9em",
    width: "90%",
  };

  return (
    <React.Fragment>
      <div style={styleForTables}>
        <table className="table">
          <thead>
            <tr>
              <th colSpan="3" scope="col">
                <button
                  id="tableSelect"
                  className="btn btn-primary m-2"
                  onClick={() => handleSelect(0)}
                >
                  Education
                </button>
                <button
                  id="tableSelect"
                  className="btn btn-secondary m-2"
                  onClick={() => handleSelect(1)}
                >
                  Conferences
                </button>
                <button
                  id="tableSelect"
                  className="btn btn-danger m-2"
                  onClick={() => handleSelect(2)}
                >
                  Employments
                </button>
                <button
                  id="tableSelect"
                  className="btn btn-success m-2"
                  onClick={() => handleSelect(3)}
                >
                  Publications
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-dark" style={{ height: "2em" }}>
              <th scope="row"></th>
            </tr>
          </tbody>
        </table>

        <div>{tableArr[selection]}</div>
      </div>
    </React.Fragment>
  );
};

export default TableInterface;
