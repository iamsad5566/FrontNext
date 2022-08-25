import React from "react";

const EmpTable = () => {
  const styleForTitle = {
    margin: "0.5em",
  };
  const styleForTh = {
    width: "8em",
  };
  return (
    <React.Fragment>
      <h3 style={styleForTitle}>EMPLOYMENT</h3>
      <table
        className="table table-danger table-striped"
        style={{ fontWeight: "bold" }}
      >
        <tbody>
          <tr>
            <th scope="row" style={styleForTh}>
              {" "}
              2022 -{" "}
            </th>
            <td>
              {" "}
              Backend enginner, research and development, Eupfin Technology
              Co.,Ltd., New Taipei, Taiwan{" "}
            </td>
          </tr>

          <tr>
            <th scope="row"> 2021 - 2022 </th>
            <td>
              {" "}
              Research Assistant, Department of Psychology, National Taiwan
              University, Taipei, Taiwan{" "}
            </td>
          </tr>

          <tr>
            <th scope="row"> 2020 - 2021 </th>
            <td>
              {" "}
              Teaching Assistant, Course: ‘‘Seminar”, Department of Psychology,
              National Taiwan University, Taipei, Taiwan{" "}
            </td>
          </tr>

          <tr>
            <th scope="row"> 2019 - 2021 </th>
            <td>
              {" "}
              Adjunct Researcher Assistant in National Taiwan University
              Hospital, Taiwan{" "}
            </td>
          </tr>

          <tr>
            <th scope="row">2019 - 2020</th>
            <td>
              {" "}
              Teaching Assistant, Course: ‘‘General Psychology”, Department of
              Psychology, National Taiwan University, Taipei, Taiwan{" "}
            </td>
          </tr>

          <tr>
            <th scope="row">2014 - 2015</th>
            <td>
              {" "}
              Contingent worker in National Taiwan University Hospital, Taiwan{" "}
            </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default EmpTable;
