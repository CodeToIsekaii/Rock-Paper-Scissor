//nút chuyển trò chơi
const btnChange = document.querySelectorAll(".navtab-btn");
const contentList = document.querySelectorAll(".content-change");
btnChange.forEach((btnOp) => {
  btnOp.addEventListener("click", (event) => {
    btnChange.forEach((_btnOp) => {
      _btnOp.classList.remove("actived");
    });
    event.target.classList.add("actived");
    contentList.forEach((content) => {
      content.classList.remove("actived");
    });
    let id = event.target.id;
    let contentChecked = document.querySelector(
      `.content-change[data-id="${id}"]`
    );
    contentChecked.classList.add("actived");
    //ấn nút chuyển sẽ reset cho chạy lại
    clearInterval(interval);
    interval = setInterval(valueChange, 85);
    playItem.forEach((_item) => {
      _item.classList.remove("actived");
      _item.style.pointerEvents = ""; //cho nhấn lại
    });
    document.querySelector(".notification").textContent = "";
    document.querySelector(".play-again").classList.remove("actived");
  });
});
// 1 player
const VALUES = [
  { id: "scissors", values: "✌️" },
  { id: "rock", values: "✊" },
  { id: "paper", values: "🖐️" },
];
// xử lý computer
let i = 0;
const valueChange = () => {
  let computer = document.querySelector("#computer");
  computer.textContent = VALUES[i].values;
  computer.dataset.id = VALUES[i].id;
  i = i == VALUES.length - 1 ? 0 : ++i;
};
let interval = setInterval(valueChange, 85);
//hàm so sánh giá trị
const compare = (valuePlayer, valueComputer) => {
  let indexPlayer = VALUES.findIndex((item) => item.id == valuePlayer);
  let indexComputer = VALUES.findIndex((item) => item.id == valueComputer);
  let result = indexPlayer - indexComputer;
  if ([-2, 1].includes(result)) return 1;
  else if (result == 0) return 0;
  else return -1;
};
//sự kiện click của người chơi
const playItem = document.querySelectorAll(".user");
playItem.forEach((item) => {
  item.addEventListener("click", (event) => {
    clearInterval(interval);
    let valuePlayer = event.target.id;
    let computer = document.querySelector("#computer");
    let valueComputer = computer.dataset.id;
    let result = compare(valuePlayer, valueComputer);
    //xóa actived
    playItem.forEach((_item) => {
      _item.classList.remove("actived");
      _item.style.pointerEvents = "none";
    });
    event.target.classList.add("actived");
    // báo kết quả
    const alertDiv = document.createElement("div");
    alertDiv.classList.add("alert");
    let msg = "";
    if (result == 1) {
      msg = "YOU WIN";
      alertDiv.classList.add("win");
    } else if (result == 0) {
      msg = "YOU DRAW";
      alertDiv.classList.add("draw");
    } else {
      msg = "YOU LOSE";
      alertDiv.classList.add("lose");
    }
    alertDiv.textContent = msg;
    document.querySelector(".notification").appendChild(alertDiv);
    document.querySelector(".play-again").classList.add("actived");
    // point
    pointUp(result);
  });
});
// tăng điểm
const POINT = [
  { pId: "0", cId: "0", pVal: "0" },
  { pId: "1", cId: "1", pVal: "1" },
  { pId: "2", cId: "2", pVal: "2" },
  { pId: "3", cId: "3", pVal: "3" },
];
let pointP = 1;
let pointC = 1;
const pointUp = (result) => {
  if (result == 1) {
    let pP = document.querySelector("#pointPlay");
    pP.dataset.id = POINT[pointP].pId;
    pP.innerHTML = POINT[pointP].pVal;
    pointP = pointP == POINT.length - 1 ? 0 : ++pointP;
  } else if (result == -1) {
    let cP = document.querySelector("#pointCom");
    cP.dataset.id = POINT[pointC].cId;
    cP.innerHTML = POINT[pointC].pVal;
    pointC = pointC == POINT.length - 1 ? 0 : ++pointC;
  }
};
// click play again
document.querySelector("#btn-play-again").addEventListener("click", (event) => {
  clearInterval(interval);
  interval = setInterval(valueChange, 85);
  playItem.forEach((_item) => {
    _item.classList.remove("actived");
    _item.style.pointerEvents = ""; //cho nhấn lại
  });
  document.querySelector(".notification").textContent = "";
  document.querySelector(".play-again").classList.remove("actived");
  // resetPoint
  let player = document.querySelector("#pointPlay");
  let playId = player.dataset.id;
  let computer = document.querySelector("#pointCom");
  let comId = computer.dataset.id;
  if (playId == 3 || comId == 3) {
    player.dataset.id = POINT[0].pId;
    player.innerHTML = POINT[0].pVal;
    computer.dataset.id = POINT[0].cId;
    computer.innerHTML = POINT[0].pVal;
  }
});
