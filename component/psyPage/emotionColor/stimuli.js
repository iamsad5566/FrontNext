class Stimuli {
  positive = ["快樂", "高興", "愉悅", "興奮"];
  negative = ["悲傷", "沮喪", "難過"];
  neutral = [
    "橋樑",
    "風扇",
    "布鞋",
    "梳子",
    "檯燈",
    "衣服",
    "地板",
    "牆壁",
    "石頭",
    "汽車",
  ];
  notShowed = [
    "項鍊",
    "領帶",
    "樓梯",
    "窗簾",
    "書本",
    "電腦",
    "牙刷",
    "衣櫃",
    "紙箱",
    "欄杆",
  ];

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

export default Stimuli;
