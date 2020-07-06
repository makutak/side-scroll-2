import { requestNextAnimationFrame, calculateFps } from './requestNextAnimationFrame';
import { Player } from './Player';

const canvas: HTMLCanvasElement = document.getElementById('app') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

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

// const STAGE = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
//   [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
//   [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
//   [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
//   [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// ];

const STAGE = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
];


const blockRowCount = STAGE.length;
const blockColumnCount = STAGE[0].length;
const blockWidth = 30;

//let y = h - blockWidth;
// yには常に +1 下向きに力が加わっているので
//const y0 = h - f
///let y = y0 - blockWidth;

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

// const drawBall = () => {
//   ctx.beginPath();
//   ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
//   ctx.fillStyle = "#0095DDbb";
//   ctx.fill();
//   ctx.closePath();
// }

// const drawBlock = () => {
//   for (let c = 0; c < blockColumnCount; c++) {
//     for (let r = 0; r < blockRowCount; r++) {
//       const blockX = c * blockWidth;
//       const blockY = r * blockWidth;

//       // FOR DBUG
//       ctx.beginPath();
//       ctx.rect(blockX, blockY, blockWidth, blockWidth)
//       //ctx.fillStyle = "#8B4513";
//       ctx.strokeStyle = "blue";
//       //ctx.fill();
//       ctx.stroke();
//       ctx.closePath();


//       if (STAGE[r][c] === 1) {
//         // const blockX = c * blockWidth;
//         // const blockY = r * blockWidth;
//         ctx.beginPath();
//         ctx.rect(blockX, blockY, blockWidth, blockWidth)
//         ctx.fillStyle = "rgba(55, 27, 7, 0.5)";
//         //ctx.strokeStyle = "black";
//         ctx.fill();
//         //ctx.stroke();
//         ctx.closePath();
//       }
//     }
//   }
// }

// const getPositionFloor = (x: number, y: number): number => {
//   if (0 > y) return;
//   // const posX = Math.round(x / blockWidth);
//   // const posY = Math.round(y / blockWidth);
//   const posX = Math.floor(x / blockWidth);
//   const tempY = Math.floor(y / blockWidth);

//   const posY = tempY >= 10 ? 10 : tempY;

//   /* FOR DEBUG
//   ctx.beginPath();
//   ctx.rect(posX * blockWidth, posY * blockWidth, blockWidth, blockWidth)
//   ctx.fillStyle = "red";
//   //ctx.strokeStyle = "#8B4513";
//   ctx.fill();
//   */
//   //console.log(posX, posY);
//   //console.log(`STAGE_0[${posY}][${posX}]`);
//   return STAGE[posY][posX];
// }

// const isCollision = (x: number, y: number): boolean => {
//   //console.log(getPositionFloor(x, y) === 1)
//   return getPositionFloor(x, y) === 1;
// }

/*
const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawBlock();

  f = 1;

  if (rightPressed && x + dx <= w) {
    const nextX = x + dx + ballRadius - 1; // 1 は調整用の数値
    if (!isCollision(nextX, y)) {
      x += dx;
    }
  }

  if (leftPressed && x - dx >= ballRadius) {
    const nextX = x - dx - ballRadius;
    if (!isCollision(nextX, y)) {
      x -= dx;
    }
  }

  if (upPressed && (ballRadius < y) && !isJump) {
    isJump = true;
    f = -10;
  }

  const tempY = y;
  const tempNextY = y + (y - prevY) + f;
  const nextY = isJump ? tempNextY : tempNextY + ballRadius;
  if (isCollision(x, nextY)) {
    y = prevY;
    isJump = false;
    f = 0;
  } else {
    y += (y - prevY) + f;
    prevY = tempY;
  }

  if (h <= y + f) {
    y = h;
    isJump = false;
  }

  if (y < ballRadius) {
    y = ballRadius;
  }

  if (w < x + dx) {
    x = w;
  }

  if (x - dx < 0) {
    x = ballRadius;
  }


  //requestAnimationFrame(draw);
}
*/
addEventListener('keydown', keyDownHandler, false);
addEventListener('keyup', keyUpHandler, false);


let fps: number;
const ballRadius = 15;
const y0 = canvas.height - ballRadius;
const x0 = ballRadius;
let prevY = 0;
const player = new Player(ctx, x0, y0, ballRadius);


const animate = (now: number) => {
  fps = calculateFps(now);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();

  requestNextAnimationFrame(animate);
  //requestAnimationFrame(animate);
}

requestNextAnimationFrame(animate);
//animate(fps);
