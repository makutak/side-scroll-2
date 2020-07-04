const canvas: HTMLCanvasElement = document.getElementById('app') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

const ballRadius = 15;
const h = canvas.height - ballRadius;
const w = canvas.width - ballRadius;

let t = 0;
const dt = 1;

const g = 0.4;
const dx = 5;
const dy = 7;
let f = 1;

let rightPressed = false;
let leftPressed = false;
let downPressed = false;
let upPressed = false

const keyCodes = {
  space: "Space",
  right: "ArrowRight",
  left: "ArrowLeft",
  up: "ArrowUp",
  down: "ArrowDown",
};

let isJump = false;

const STAGE = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const STAGE_0 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
];


const blockRowCount = STAGE.length;
const blockColumnCount = STAGE[0].length;
const blockWidth = 30;

//let y = h - blockWidth;
// yには常に +1 下向きに力が加わっているので
const y0 = h - f
//let y = y0 - blockWidth;
let y = 0;
let x = ballRadius;
let prevY = y;

const keyDownHandler = (e: KeyboardEvent) => {
  const pressed = e.code;
  switch (pressed) {
    case keyCodes.right:
      rightPressed = true;
      break;
    case keyCodes.left:
      leftPressed = true;
      break;
    case keyCodes.down:
      downPressed = true;
      break;
    case keyCodes.up:
      upPressed = true;
      break;
    case keyCodes.space:
      upPressed = true;
      break;
    default:
      break;
  }
}

const keyUpHandler = (e: KeyboardEvent) => {
  const pressed = e.code;
  switch (pressed) {
    case keyCodes.right:
      rightPressed = false;
      break;
    case keyCodes.left:
      leftPressed = false;
      break;
    case keyCodes.down:
      downPressed = false;
      break;
    case keyCodes.up:
      upPressed = false;
      break;
    case keyCodes.space:
      upPressed = false;
      break;
    default:
      break;
  }
}

const drawBall = () => {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

const drawBlock = () => {
  for (let c = 0; c < blockColumnCount; c++) {
    for (let r = 0; r < blockRowCount; r++) {
      const blockX = c * blockWidth;
      const blockY = r * blockWidth;

      ctx.beginPath();
      ctx.rect(blockX, blockY, blockWidth, blockWidth)
      //ctx.fillStyle = "#8B4513";
      ctx.strokeStyle = "blue";
      //ctx.fill();
      ctx.stroke();
      ctx.closePath();


      if (STAGE_0[r][c] === 1) {
        // const blockX = c * blockWidth;
        // const blockY = r * blockWidth;
        ctx.beginPath();
        ctx.rect(blockX, blockY, blockWidth, blockWidth)
        ctx.fillStyle = "rgba(55, 27, 7, 0.5)";
        //ctx.strokeStyle = "black";
        ctx.fill();
        //ctx.stroke();
        ctx.closePath();
      }
    }
  }
}

const getPositionFloor = (x: number, y: number): number => {
  // const posX = Math.round(x / blockWidth);
  // const posY = Math.round(y / blockWidth);
  const posX = Math.floor(x / blockWidth);
  const posY = Math.floor((y + ballRadius) / blockWidth);

  ctx.beginPath();
  ctx.rect(posX * blockWidth, posY * blockWidth, blockWidth, blockWidth)
  ctx.fillStyle = "red";
  //ctx.strokeStyle = "#8B4513";
  ctx.fill();

  //console.log(posX, posY);
  console.log(`STAGE_0[${posY}][${posX}]`);
  return STAGE_0[posY][posX];
}

const getPositionRound = (x: number, y: number): number => {
  // const posX = Math.round(x / blockWidth);
  // const posY = Math.round(y / blockWidth);
  const posX = Math.round(x / blockWidth);
  const posY = Math.floor((y + ballRadius) / blockWidth);

  ctx.beginPath();
  ctx.rect(posX * blockWidth, posY * blockWidth, blockWidth, blockWidth)
  ctx.fillStyle = "red";
  //ctx.strokeStyle = "#8B4513";
  ctx.fill();

  //console.log(posX, posY);
  console.log(`STAGE_0[${posY}][${posX}]`);
  return STAGE_0[posY][posX];
}

const getPositionCeil = (x: number, y: number): number => {
  // const posX = Math.round(x / blockWidth);
  // const posY = Math.round(y / blockWidth);
  const posX = Math.ceil(x / blockWidth);
  const posY = Math.floor((y + ballRadius) / blockWidth);

  ctx.beginPath();
  ctx.rect(posX * blockWidth, posY * blockWidth, blockWidth, blockWidth)
  ctx.fillStyle = "red";
  //ctx.strokeStyle = "#8B4513";
  ctx.fill();

  //console.log(posX, posY);
  console.log(`STAGE_0[${posY}][${posX}]`);
  return STAGE_0[posY][posX];
}


const isCollision = (position: number): boolean => {
  //console.log('is collision: ', position === 1);
  return position === 1;
}

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawBlock();

  f = 1;
  if (y < ballRadius) {
    y = ballRadius;
  }

  if (h < y + f) {
    y = y0
    //isJump = false;
  }

  if (w < x + dx) {
    x = w;
  }

  if (x - dx < 0) {
    x = ballRadius;
  }

  if (rightPressed && x + dx <= w) {
    const nextX = x + dx + ballRadius - 1; // 1 は調整用の数値
    if (!isCollision(getPositionFloor(nextX, y))) {
      console.log('want monve right');
      x += dx;
    } else {
      console.log('want monve right, but is collision. ');
    }
  }

  if (leftPressed && x - dx >= ballRadius) {
    const nextX = x - dx - ballRadius;
    if (!isCollision(getPositionFloor(nextX, y))) {
      console.log('want monve left');
      x -= dx;
    } else {
      console.log('want monve left, but is collision. ');
    }
  }

  if (upPressed && (ballRadius < y) && !isJump) {
    isJump = true;
    f = -10;
    console.log('pressed!!!!', isJump);
  }

  if (!upPressed) {
    isJump = false;
  }

  const tempY = y;
  const nextY = (y - prevY) + f;
  y += (y - prevY) + f;
  prevY = tempY;

  requestAnimationFrame(draw);
}

addEventListener('keydown', keyDownHandler, false);
addEventListener('keyup', keyUpHandler, false);
draw();
