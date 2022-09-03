import Head from "next/head";
import React, { useState } from "react";
import PsyGolangService from "../../../api/PsyGolangService";
import NavBar from "../../../component/navbar";
import StroopController from "../../../component/psyPage/stroopEffect/stroopController";
import StroopInstruction from "../../../component/psyPage/stroopEffect/stroopInstruction";

const StroopInteface = () => {
  const [confirm, setConfirm] = useState(false);
  const [information, setInformation] = useState({
    name: "",
    age: "",
    sex: "",
  });

  let psyGolangService = new PsyGolangService();

  const handleInput = (event) => {
    var tmpInfo = { ...information };
    switch (event.target.name) {
      case "nameInput":
        tmpInfo.name = event.target.value;
        setInformation(tmpInfo);
        return;
      case "ageInput":
        tmpInfo.age = event.target.value;
        setInformation(tmpInfo);
        return;
      case "sexInput":
        tmpInfo.sex = event.target.value;
        setInformation(tmpInfo);
        return;
      default:
        return;
    }
  };

  const handleConfirm = (name) => {
    if (name.length === 0) {
      alert("Pease fill in the your name!");
      window.location.reload();
    }

    psyGolangService.saveStroopEffectSubject(name, information).then((res) => {
      if (res.status === 200) {
        setConfirm(true);
      } else {
        alert("The subject name already existed, please use another name.");
        window.location.reload();
      }
    });

    setConfirm(true);
    sessionStorage.setItem("subject", name);
  };

  return (
    <React.Fragment>
      <Head>
        <title>Stroop effect exp</title>
        <meta
          property="og:url"
          content="https://tw-yk.com/psychology/stroop_effect"
        />
        <meta property="og:locale" content="zh_TW" />
        <meta
          property="og:description"
          content="Experiment for stroop effect here"
        />
        <meta property="og:title" content="Stroop effect exp" />
        <meta property="og:type" content="website" />
        <meta property="fb:admins" content="153906327962277" />
        <meta property="og:image" content="https://tw-yk.com/stroop.jpg" />
        <link rel="icon" href="/psy.ico" type="image/x-icon" />
      </Head>
      {confirm ? (
        <StroopController name={information.name} />
      ) : (
        <React.Fragment>
          <NavBar />
          <StroopInstruction
            handleConfirm={handleConfirm}
            handleInput={handleInput}
            information={information}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default StroopInteface;
