class StroopStimuli {
  colorArray = [
    {
      target: { string: "紅", color: "blue" },
      interference: { string: "藍", color: "red" },
    },
    {
      target: { string: "藍", color: "red" },
      interference: { string: "紅", color: "blue" },
    },
    {
      target: { string: "綠", color: "gold" },
      interference: { string: "黃", color: "green" },
    },
    {
      target: { string: "黃", color: "green" },
      interference: { string: "綠", color: "gold" },
    },
    {
      target: { string: "紅", color: "red" },
      interference: { string: "藍", color: "blue" },
    },
    {
      target: { string: "藍", color: "blue" },
      interference: { string: "紅", color: "red" },
    },
    {
      target: { string: "綠", color: "green" },
      interference: { string: "黃", color: "gold" },
    },
    {
      target: { string: "黃", color: "gold" },
      interference: { string: "綠", color: "green" },
    },
  ];

  colorAnswer(question, response) {
    switch (question) {
      case "藍":
        if (response === "blue") {
          return "correct";
        } else {
          return "wrong";
        }
      case "紅":
        if (response === "red") {
          return "correct";
        } else {
          return "wrong";
        }
      case "綠":
        if (response === "green") {
          return "correct";
        } else {
          return "wrong";
        }
      case "黃":
        if (response === "gold") {
          return "correct";
        } else {
          return "wrong";
        }
      default:
        return "wrong";
    }
  }

  semanticAnswer(question, response) {
    switch (question) {
      case "藍":
        if (response === "藍") {
          return "correct";
        } else {
          return "wrong";
        }
      case "紅":
        if (response === "紅") {
          return "correct";
        } else {
          return "wrong";
        }
      case "綠":
        if (response === "綠") {
          return "correct";
        } else {
          return "wrong";
        }
      case "黃":
        if (response === "黃") {
          return "correct";
        } else {
          return "wrong";
        }
      default:
        return "wrong";
    }
  }

  isConsistent(target) {
    if (target.string === "紅" && target.color === "red") {
      return "consistent";
    } else if (target.string === "藍" && target.color === "blue") {
      return "consistent";
    } else if (target.string === "綠" && target.color === "green") {
      return "consistent";
    } else if (target.string === "黃" && target.color === "gold") {
      return "consistent";
    } else {
      return "inconsistent";
    }
  }

  randomShuffle(array) {
    let len = array.length;
    let output = [];

    while (output.length !== len) {
      let index = Math.floor(len * Math.random());
      if (!output.includes(array[index])) output.push(array[index]);
    }

    for (let i = 0; i < len; i++) array[i] = output[i];
  }
}

export default StroopStimuli;
