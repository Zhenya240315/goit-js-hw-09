const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

btnStart.addEventListener('click', colorStart);
btnStop.addEventListener('click', getRandomHexColorStop);

// 111

function colorStart() {
  if ((btnStart.disabled = false)) {
    return;
  }
  timeoutId = setInterval(() => {
    btnStart.disabled = true;
    getRandomHexColorStart();
  }, 500);
}

// 222
function getRandomHexColorStart() {
  getRandomHexColor();
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function getRandomHexColorStop() {
  btnStart.disabled = false;
  clearInterval(timeoutId);
}
