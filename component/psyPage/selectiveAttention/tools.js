class Tools {
  randomShuffle = (array) => {
    let len = array.length;
    let output = [];

    while (output.length !== len) {
      let index = Math.floor(len * Math.random());
      if (!output.includes(array[index])) output.push(array[index]);
    }

    for (let i = 0; i < len; i++) array[i] = output[i];
  };

  randomizeCondition = (array, target) => {
    let randomIndex = Math.floor(array.length * Math.random());
    let targetIndex = array.indexOf(target);

    while (targetIndex === randomIndex) {
      randomIndex = Math.floor(array.length * Math.random());
    }
    let tmp = array[randomIndex];
    array[randomIndex] = target;
    array[targetIndex] = tmp;
  };

  randomSelect = (num) => {
    let newNum = Math.ceil(num * Math.random());
    return newNum;
  };
}

export default Tools;
