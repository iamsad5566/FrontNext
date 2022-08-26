import React from "react";

const PublicationTable = () => {
  const styleForTitle = {
    margin: "0.5em",
  };

  const styleForTh = {
    width: "8em",
  };
  return (
    <React.Fragment>
      <h3 style={styleForTitle}>PUBLICATION</h3>
      <table
        className="table table-success table-striped"
        style={{ fontWeight: "bold" }}
      >
        <tbody>
          <tr>
            <th scope="row" style={styleForTh}>
              {" "}
              2022{" "}
            </th>
            <td>
              {" "}
              <a
                href="https://www.eneuro.org/content/early/2022/03/25/ENEURO.0387-21.2022"
                id="journalLink"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none" }}
              >
                {" "}
                P3b Does Not Reflect Perceived Contrast{" "}
              </a>{" "}
            </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default PublicationTable;
