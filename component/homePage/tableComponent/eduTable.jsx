import React from "react";

const EduTable = () => {
  const styleForTitle = {
    margin: "0.5em",
  };

  const styleForTh = {
    width: "8em",
  };

  return (
    <React.Fragment>
      <h3 style={styleForTitle}>EDUCATION</h3>
      <table className="table table-primary table-striped">
        <tbody>
          <tr>
            <th scope="row" style={styleForTh}>
              2018 - 2021
            </th>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <th scope="row">M.A.</th>
            <td>National Taiwan University</td>
            <td>Department of Psychology</td>
          </tr>

          <tr>
            <th scope="row">2011 - 2016</th>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <th scope="row">B.A.</th>
            <td>National ChengChi University</td>
            <td>Department of Psychology</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default EduTable;
