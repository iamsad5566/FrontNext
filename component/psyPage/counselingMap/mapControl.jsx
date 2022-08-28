import React, { useEffect, useState } from "react";
import { geoMercator, geoPath } from "d3";

const MapControl = (props) => {
  const { feature, addSelected, deleteSelected, handleReset } = props;
  let county = feature.properties.COUNTYNAME;
  const [selected, setSelected] = useState(false);
  let { re } = props;
  function handleClick() {
    if (selected === false) {
      setSelected(true);
      addSelected(county);
    } else {
      setSelected(false);
      deleteSelected(county);
    }
  }

  useEffect(() => {
    if (re) {
      setSelected(false);
      handleReset();
    }
    // eslint-disable-next-line
  }, [re]);

  let projection = geoMercator().center([121, 24]).scale(9000);

  if (window.screen.width < 575.98) {
    projection = geoMercator().center([123.5, 23]).scale(5000);
  }

  let path = geoPath().projection(projection);

  return (
    <React.Fragment>
      <path
        d={path(feature)}
        onClick={() => {
          handleClick();
        }}
        fill={selected ? "red" : ""}
      />
    </React.Fragment>
  );
};

export default MapControl;
