import Miku from './images/miku.png';

enum Direcion {
  RIGHT = 'right',
  LEFT = 'left',
}
const MAX_FRAME_COUNT = 4;
const ONE_FRAME_WIDTH = 47;
const MAX_GRAVITY = 10;

export class Player {
  ctx: CanvasRenderingContext2D;
  img: HTMLImageElement = new Image();
  positionX: number;
  positionY: number;
  dx: number = 2;
  dy: number = 2;
  offsetX: number = ONE_FRAME_WIDTH;
  currentFrame: number = 0;
  isJump: boolean = false;
  jumpCnt: number = 0;
  groundPositionY: number;

  direction: Direcion = Direcion.RIGHT;;
  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.ctx = ctx;
    this.img.src = Miku;
    this.img.onload = () => {
      this.positionX = x;
      this.positionY = y - this.img.height;
      this.groundPositionY = this.positionY;
    }
  }

  get height(): number {
    return this.img.height;
  }

  draw(): void {
    //console.log('player draw; ');
    //console.log(this.positionY)
    if (this.direction === Direcion.LEFT) {
      this.ctx.save();
      this.ctx.transform(-1, 0, 0, 1, 0, 0);
      this.ctx.drawImage(
        this.img,
        this.offsetX,
        0,
        ONE_FRAME_WIDTH,
        this.height,
        -this.positionX - this.height,
        this.positionY,
        this.height,
        this.height
      );
      this.ctx.restore();
    }
    if (this.direction === Direcion.RIGHT) {
      this.ctx.drawImage(
        this.img,
        this.offsetX,
        0,
        ONE_FRAME_WIDTH,
        this.height,
        this.positionX,
        this.positionY,
        this.height,
        this.height
      );
    }
  }

  move(
    rightPressed: boolean,
    leftPressed: boolean,
    upPressed: boolean,
    downPressed: boolean
  ): void {
    if (rightPressed) {
      this.direction = Direcion.RIGHT;
      this.positionX += this.dx;
      this.makeFrameByFrame();
    }

    if (leftPressed) {
      this.direction = Direcion.LEFT;
      this.positionX -= this.dx;
      this.makeFrameByFrame();
    }

    if (upPressed) {
      console.log('↑↑↑↑↑↑↑↑ upPressed ↑↑↑↑↑↑↑↑↑');

      if (!this.isJump) {
        this.isJump = true;
        this.dy = 16;
      }
      this.makeFrameByFrame();
    }

    if (this.isJump) {
      this.positionY -= this.dy;
      if (this.jumpCnt++ % 2 === 0) {
        this.dy -= 2;

        // タイマーセット
        if (this.dy < -MAX_GRAVITY) {
          this.dy = -MAX_GRAVITY;
        }

        // 地面に着いた
        if (this.positionY >= this.groundPositionY) {
          this.dy = 0;
          this.positionY = this.groundPositionY;
          this.isJump = false;
        }
      }
      this.makeFrameByFrame();  
    }

    if (downPressed) {
      console.log('↓↓↓↓↓↓↓↓ upPressed ↓↓↓↓↓↓↓↓↓');
    }
  }

  private makeFrameByFrame(): void {
    if (this.currentFrame++ >= MAX_FRAME_COUNT) {
      if (this.offsetX % ONE_FRAME_WIDTH === 0 && this.offsetX !== ONE_FRAME_WIDTH * 5) {
        this.offsetX += ONE_FRAME_WIDTH;
      } else {
        this.offsetX = 0;
      }
      this.currentFrame = 0;
    }
  }
}
