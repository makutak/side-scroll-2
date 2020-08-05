const image = require('./images/miku.png');
//const image = require('./images/sMario.png');

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
  addNumY: number = 0;
  offsetX: number = ONE_FRAME_WIDTH;
  currentFrame: number = 0;
  isJump: boolean = false;
  jumpCnt: number = 0;
  groundPosY: number;

  direction: Direcion = Direcion.RIGHT;;
  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.ctx = ctx;
    this.img.src = image;
    this.img.onload = () => {
      this.positionX = x;
      this.positionY = y - this.img.height;
      this.groundPosY = this.positionY;
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

  move(rightPressed: boolean, leftPressed: boolean, upPressed: boolean): void {
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
      console.log("########## upPressed!! ###########");
      if (!this.isJump) {
        this.isJump = true;
        if (upPressed) {
          this.addNumY = 19;
        } else {
          this.addNumY = 16;
        }
      }
      if (this.isJump) {
        console.log('########## isJump!!! ############');
        this.positionY -= this.addNumY;


        // タイマー
        if (this.jumpCnt++ % 2 === 0) {
          this.addNumY -= 2;
          if (this.addNumY < -MAX_GRAVITY) {
            this.addNumY = -MAX_GRAVITY;
          }
        }

        // 地面
        if (this.positionY >= this.groundPosY) {
          console.log('###### Ground ######')
          this.addNumY = 0;
          this.positionY = this.groundPosY
          this.isJump = false;
        }
      }
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
