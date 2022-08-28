class SelectiveStimuli {
  condition = [
    ["distraction", "target"],
    ["distraction", "distraction", "target"],
    ["distraction", "distraction", "distraction", "target"],
  ];

  condition = this.randomArr(this.condition);

  male = [
    "劉德華",
    "周杰倫",
    "李小龍",
    "李榮浩",
    "王力宏",
    "胡瓜",
    "金城武",
    "阿信",
    "韓國瑜",
  ];
  female = [
    "呂秀蓮",
    "新垣結衣",
    "林依晨",
    "林志玲",
    "蔡依林",
    "蔡英文",
    "戴資穎",
    "陳意涵",
    "陶晶瑩",
  ];

  stimuli = [
    {
      target: "劉德華",
      distraction: this.male.filter((famous) => {
        if (famous === "劉德華") {
          return null;
        } else {
          return famous;
        }
      }),
    },
    {
      target: "周杰倫",
      distraction: this.male.filter((famous) => {
        if (famous === "周杰倫") {
          return null;
        } else {
          return famous;
        }
      }),
    },
    {
      target: "李小龍",
      distraction: this.male.filter((famous) => {
        if (famous === "李小龍") {
          return null;
        } else {
          return famous;
        }
      }),
    },
    {
      target: "李榮浩",
      distraction: this.male.filter((famous) => {
        if (famous === "李榮浩") {
          return null;
        } else {
          return famous;
        }
      }),
    },
    {
      target: "王力宏",
      distraction: this.male.filter((famous) => {
        if (famous === "王力宏") {
          return null;
        } else {
          return famous;
        }
      }),
    },
    {
      target: "胡瓜",
      distraction: this.male.filter((famous) => {
        if (famous === "胡瓜") {
          return null;
        } else {
          return famous;
        }
      }),
    },
    {
      target: "金城武",
      distraction: this.male.filter((famous) => {
        if (famous === "金城武") {
          return null;
        } else {
          return famous;
        }
      }),
    },
    {
      target: "阿信",
      distraction: this.male.filter((famous) => {
        if (famous === "阿信") {
          return null;
        } else {
          return famous;
        }
      }),
    },
    {
      target: "韓國瑜",
      distraction: this.male.filter((famous) => {
        if (famous === "韓國瑜") {
          return null;
        } else {
          return famous;
        }
      }),
    },
    {
      target: "呂秀蓮",
      distraction: this.female.filter((famous) => {
        if (famous === "呂秀蓮") {
          return null;
        } else {
          return famous;
        }
      }),
    },
    {
      target: "林依晨",
      distraction: this.female.filter((famous) => {
        if (famous === "林依晨") {
          return null;
        } else {
          return famous;
        }
      }),
    },
    {
      target: "林志玲",
      distraction: this.female.filter((famous) => {
        if (famous === "林志玲") {
          return null;
        } else {
          return famous;
        }
      }),
    },
    {
      target: "蔡依林",
      distraction: this.female.filter((famous) => {
        if (famous === "蔡依林") {
          return null;
        } else {
          return famous;
        }
      }),
    },
    {
      target: "蔡英文",
      distraction: this.female.filter((famous) => {
        if (famous === "蔡英文") {
          return null;
        } else {
          return famous;
        }
      }),
    },
    {
      target: "戴資穎",
      distraction: this.female.filter((famous) => {
        if (famous === "戴資穎") {
          return null;
        } else {
          return famous;
        }
      }),
    },
    {
      target: "陳意涵",
      distraction: this.female.filter((famous) => {
        if (famous === "陳意涵") {
          return null;
        } else {
          return famous;
        }
      }),
    },
    {
      target: "陶晶瑩",
      distraction: this.female.filter((famous) => {
        if (famous === "陶晶瑩") {
          return null;
        } else {
          return famous;
        }
      }),
    },
    {
      target: "新垣結衣",
      distraction: this.female.filter((famous) => {
        if (famous === "新垣結衣") {
          return null;
        } else {
          return famous;
        }
      }),
    },
  ];

  numberArr = [0, 1, 2, 3, 4];

  randomShuffle(array) {
    let len = array.length;
    let output = [];

    while (output.length !== len) {
      let index = Math.floor(len * Math.random());
      if (!output.includes(array[index])) output.push(array[index]);
    }

    for (let i = 0; i < len; i++) array[i] = output[i];
  }

  randomArr(array) {
    let len = array.length;
    let output = [];

    while (output.length !== len) {
      let index = Math.floor(len * Math.random());
      if (!output.includes(array[index])) output.push(array[index]);
    }

    for (let i = 0; i < len; i++) array[i] = output[i];

    return output;
  }
}

export default SelectiveStimuli;
