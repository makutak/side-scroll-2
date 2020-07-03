const canvas: HTMLCanvasElement = document.getElementById('app') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

const ballRadius = 10;
const h = canvas.height - ballRadius;
const w = canvas.width - ballRadius;

let t = 0;
const dt = 1;

const g = 0.4;
const dx = 5;
const dy = 7;

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

const blockRowCount = STAGE.length;
const blockColumnCount = STAGE[0].length;
const blockWidth = 30;

//let y = h - blockWidth;
let y = h;
let x = ballRadius;

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
      if (STAGE[r][c] === 1) {
        const blockX = c * blockWidth;
        const blockY = r * blockWidth;
        ctx.beginPath();
        ctx.rect(blockX, blockY, blockWidth, blockWidth)
        ctx.fillStyle = "#8B4513";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  //drawBlock();

  if (y < ballRadius) {
    y = ballRadius;
  }

  if (h < y) {
    y = h;
    isJump = false;
  }

  if (w < x + dx) {
    x = w;
  }

  if (x - dx < 0) {
    x = ballRadius;
  }

  if (rightPressed && x + dx <= w) {
    x += dx;
  }

  if (leftPressed && x - dx >= ballRadius) {
    x -= dx;
  }

  if (upPressed && !isJump && (ballRadius < y)) {
    t = 0;
    isJump = true;
  }

  if (isJump) {
    y = 1 / 2 * g * (t * t) - (dy * t) + (h - blockWidth);
  }

  t += dt;
  requestAnimationFrame(draw);
}

addEventListener('keydown', keyDownHandler, false);
addEventListener('keyup', keyUpHandler, false);
draw();
