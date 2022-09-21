import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Setting from "../../../../setting";
import AuthenticationService from "../../../api/AuthenticationService";
import PsyService from "../../../api/PsyService";
import BarChart from "./barComponent/barChart";
import BarChartPercentage from "./barComponent/barChartPercentage";
import BarChartPopulation from "./barComponent/barChartPopulation";
import MapControl from "./mapControl";
import * as d3 from "d3";

const DrawMap = (props) => {
  let buttonClass = "btn btn-sm m-3";
  let indexLink = 0;
  let setting = new Setting();
  let authenticationService = new AuthenticationService();
  let psyService = new PsyService();

  const [isLoaded, setIsLoaded] = useState(false);
  const [total, setTotal] = useState(0);
  const [dataMap, setDataMap] = useState([
    { county: "新北市", numbers: 0 },
    { county: "臺中市", numbers: 0 },
    { county: "高雄市", numbers: 0 },
    { county: "臺北市", numbers: 0 },
    { county: "桃園市", numbers: 0 },
    { county: "臺南市", numbers: 0 },
    { county: "彰化縣", numbers: 0 },
    { county: "屏東縣", numbers: 0 },
    { county: "雲林縣", numbers: 0 },
    { county: "新竹縣", numbers: 0 },
    { county: "苗栗縣", numbers: 0 },
    { county: "嘉義縣", numbers: 0 },
    { county: "南投縣", numbers: 0 },
    { county: "新竹市", numbers: 0 },
    { county: "宜蘭縣", numbers: 0 },
    { county: "基隆市", numbers: 0 },
    { county: "花蓮縣", numbers: 0 },
    { county: "嘉義市", numbers: 0 },
    { county: "臺東縣", numbers: 0 },
    { county: "金門縣", numbers: 0 },
    { county: "澎湖縣", numbers: 0 },
    { county: "連江縣", numbers: 0 },
  ]);

  const [countyNumbersList, setCountyNumbersList] = useState([
    "心理師公會會員數",
  ]);
  const [countyPercentageList, setCountyPercentageList] = useState([
    "心理師公會會員百分比人數",
  ]);
  const [populationEachCounty, setPopulationEachCounty] = useState([
    "每萬人之中心理師人數",
  ]);
  const [selection, setSelection] = useState([0]);

  const [yearMonthList, setYearMonthList] = useState([]);
  const [linkOfYearMonth, setLinkOfYearMonth] = useState([]);
  const [re, setRe] = useState(false);

  const populationData = [
    { county: "新北市", population: 4008113 },
    { county: "臺中市", population: 2813490 },
    { county: "高雄市", population: 2744691 },
    { county: "臺北市", population: 2524393 },
    { county: "桃園市", population: 2272391 },
    { county: "臺南市", population: 1862059 },
    { county: "彰化縣", population: 1255330 },
    { county: "屏東縣", population: 804440 },
    { county: "雲林縣", population: 670132 },
    { county: "新竹縣", population: 575580 },
    { county: "苗栗縣", population: 538178 },
    { county: "嘉義縣", population: 493316 },
    { county: "南投縣", population: 484897 },
    { county: "新竹市", population: 452640 },
    { county: "宜蘭縣", population: 450692 },
    { county: "基隆市", population: 363977 },
    { county: "花蓮縣", population: 321358 },
    { county: "嘉義市", population: 264727 },
    { county: "臺東縣", population: 213386 },
    { county: "金門縣", population: 141539 },
    { county: "澎湖縣", population: 106340 },
    { county: "連江縣", population: 13645 },
  ];
  useEffect(() => {
    if (window.screen.width < 575.98) {
      d3.select("svg").attr("width", 480).attr("height", 480);
      d3.select("#loading").attr("width", 30).attr("height", 30);
    }

    setSelection(0);
    let tmpLink = "";

    let GetData = () => {
      psyService
        .getList()
        .then((response) => {
          setYearMonthList(response.data["Counties"]);
          setLinkOfYearMonth(response.data["Links"]);
          tmpLink = response.data["Links"][0];
        })
        .then(() => {
          psyService.getDataMap(tmpLink).then((response) => {
            setDataMap(response.data);
            setTotal(response.data[response.data.length - 1].numbers);
          });
        })
        .then(() => {
          setIsLoaded(true);
        });
    };

    if (authenticationService.isLoggedIn()) {
      psyService.saveToken(sessionStorage.getItem(setting.admin));
      GetData();
    } else {
      authenticationService.login("guest", "guest").then((response) => {
        authenticationService.registerLogin("guest", response.data.token);
        psyService.saveToken(sessionStorage.getItem("guest"));
        GetData();
      });
    }
    // eslint-disable-next-line
  }, [total]);

  const { features } = props.data;
  const [countyList, setCountyList] = useState([]);

  let Features = [];
  let county = 0;

  if (features !== undefined) Features = [...features];

  function addSelected(county) {
    let list = [...countyList];
    list.push(county);
    setCountyList(list);

    let key = -1;
    for (let i = 0; i < dataMap.length; i++) {
      if (dataMap[i].county === county) {
        key = i;
        break;
      }
    }

    let numbersList = [...countyNumbersList];
    let percentageList = [...countyPercentageList];
    let populationList = [...populationEachCounty];

    let populationOfCounty = 0;
    for (let i = 0; i < populationData.length; i++) {
      if (populationData[i].county === county) {
        populationOfCounty = populationData[i].population;
        break;
      }
    }

    if (key === -1) {
      numbersList.push(0);
      percentageList.push(0);
      populationList.push(0);
    } else {
      let numbers = dataMap[key].numbers;
      numbersList.push(numbers);
      percentageList.push((numbers / total).toFixed(4));
      populationList.push(((numbers * 10000) / populationOfCounty).toFixed(2));
    }

    setCountyPercentageList(percentageList);
    setCountyNumbersList(numbersList);
    setPopulationEachCounty(populationList);
  }

  function deleteSelected(county) {
    let list = [...countyList];
    list = list.filter((element) => {
      return element !== county;
    });
    setCountyList(list);

    let index = -1;
    for (let i = 0; i < dataMap.length; i++) {
      if (dataMap[i].county === county) {
        index = i;
        break;
      }
    }

    let numbers = 0,
      percentage = 0,
      populationOfCounty = 0,
      percentageByPopulation = 0;
    if (index !== -1) {
      numbers = dataMap[index].numbers;
      percentage = (numbers / total).toFixed(4);

      // Get population of the county
      for (let i = 0; i < populationData.length; i++) {
        if (populationData[i].county === county) {
          populationOfCounty = populationData[i].population;
          break;
        }
      }

      percentageByPopulation = ((numbers * 10000) / populationOfCounty).toFixed(
        2
      );
    }

    let numbersList = [...countyNumbersList];
    let percentageList = [...countyPercentageList];
    let populationList = [...populationEachCounty];

    numbersList = numbersList.filter((element) => {
      if (element === numbers) {
        numbers--;
        return null;
      }
      return element !== numbers;
    });

    percentageList = percentageList.filter((element) => {
      if (element === percentage) {
        percentage--;
        return null;
      }

      return element !== percentage;
    });

    populationList = populationList.filter((element) => {
      if (element === percentageByPopulation) {
        percentageByPopulation--;
        return null;
      }

      return element !== percentageByPopulation;
    });

    setCountyPercentageList(percentageList);
    setCountyNumbersList(numbersList);
    setPopulationEachCounty(populationList);
  }

  function handleSelect(value) {
    setSelection(value);
  }

  const handleChange = (event) => {
    setIsLoaded(false);
    let tmpDataMap = [...dataMap];
    psyService.saveToken(sessionStorage.getItem("guest"));
    psyService
      .getDataMap(linkOfYearMonth[event.target.value])
      .then((response) => {
        setTotal(response.data[response.data.length - 1].numbers);
        tmpDataMap = response.data;
        setDataMap(tmpDataMap);
        setCountyPercentageList(["心理師公會會員百分比人數"]);
        setCountyNumbersList(["心理師公會會員數"]);
        setPopulationEachCounty(["每萬人之中心理師人數"]);
        setCountyList([]);
        setRe(true);
        setIsLoaded(true);
      });
  };

  const handleReset = () => {
    setRe(false);
  };

  const styleForContainer = {
    position: "relative",
    top: "1px",
  };

  const styleForFullCover = {
    position: "relative",
    display: "flex",
    alignItem: "center",
    textAlign: "center",
    marginTop: "10em",
  };

  const styleForTaiwan = {
    marginTop: "2em",
    position: "relative",
    display: "flex",
    alignItem: "center",
    textAlign: "right",
    justifyContent: "center",
    height: "70vh",
    overflow: "auto",
  };

  const styleForBarChart = {
    position: "relative",
    display: "flex",
    alignItem: "center",
    textAlign: "right",
    justifyContent: "center",
    marginTop: "5em",
  };

  let componentArr = [
    <BarChart countyList={countyList} countyNumbersList={countyNumbersList} />,
    <BarChartPercentage
      countyList={countyList}
      countyPercentageList={countyPercentageList}
    />,
    <BarChartPopulation
      countyList={countyList}
      populationEachCounty={populationEachCounty}
    />,
  ];
  return (
    <React.Fragment>
      <Helmet>
        <title>Counseling map in Taiwan</title>
      </Helmet>
      <div className="container-fluid" style={styleForContainer}>
        <div className="row" style={styleForFullCover}>
          <h3>
            {" "}
            <select onChange={handleChange}>
              {yearMonthList.map((ym) => {
                return (
                  <option value={indexLink++} key={ym}>
                    {" "}
                    {ym}{" "}
                  </option>
                );
              })}
            </select>{" "}
            全臺諮商心理師執業人數：{" "}
            {isLoaded ? (
              total
            ) : (
              <svg
                id="loading"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-arrow-clockwise"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
              </svg>
            )}{" "}
            人
          </h3>
          <p>(資料來源：社團法人中華民國諮商心理師公會全國聯合會)</p>
          <p> *** 請點選地圖查看各縣市資料 *** </p>
          <div>
            <button
              className={
                selection === 0
                  ? buttonClass + " btn-info btn-active "
                  : buttonClass + " btn-warning"
              }
              onClick={() => handleSelect(0)}
            >
              {" "}
              人數{" "}
            </button>
            <button
              className={
                selection === 1
                  ? buttonClass + " btn-info btn-active "
                  : buttonClass + " btn-warning"
              }
              onClick={() => handleSelect(1)}
            >
              {" "}
              各縣市心理師人數/心理師總數{" "}
            </button>
            <button
              className={
                selection === 2
                  ? buttonClass + " btn-info btn-active "
                  : buttonClass + " btn-warning"
              }
              onClick={() => handleSelect(2)}
            >
              {" "}
              各縣市心理師/各縣市人口{" "}
            </button>
          </div>
          <div className="col-sm-6" id="tw" style={styleForTaiwan}>
            <svg className="img-fluid" width="700">
              <g stroke="white" id="twMap" fill="DarkGreen">
                {Features.map((feature) => {
                  return (
                    <MapControl
                      key={county++}
                      feature={feature}
                      addSelected={addSelected}
                      deleteSelected={deleteSelected}
                      re={re}
                      handleReset={handleReset}
                    />
                  );
                })}
              </g>
            </svg>
          </div>

          <div className="col-sm-6" style={styleForBarChart}>
            {componentArr[selection]}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DrawMap;
