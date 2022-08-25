import React from "react";

const ConfTable = () => {
  const styleForTitle = {
    margin: "0.5em",
  };
  return (
    <React.Fragment>
      <h3 style={styleForTitle}> CONFERENCE PRESENTATIONS </h3>
      <table className="table table-secondary table-striped">
        <tbody>
          <tr>
            <td>
              {" "}
              "P3b does not reflect perceived contrasts" Association for the
              Scientific Study of Consciousness, Speaker, Virtual Meeting, June
              2021.{" "}
            </td>
          </tr>

          <tr>
            <td>
              {" "}
              "NCC, P3b, and no-report paradigms" Society for Philosophy and
              Psychology, 47th Annual Meeting, 2021. Virtual Princeton, NJ,
              United States, June 28-July 2, 2021.{" "}
            </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default ConfTable;
