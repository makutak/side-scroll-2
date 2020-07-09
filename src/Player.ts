const image = require('./images/miku.png');
//const image = require('./images/sMario.png');

enum Direcion {
  RIGHT = 'right',
  LEFT = 'left',
}

export class Player {
  ctx: CanvasRenderingContext2D;
  img: HTMLImageElement = new Image();
  positionX: number;
  positionY: number;
  velocityX: number;
  offsetX: number = 50;
  direction: Direcion = Direcion.RIGHT;;
  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.ctx = ctx;
    this.img.src = image;
    this.img.onload = () => {
      this.positionX = x;
      this.positionY = y - this.img.height;
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
        this.offsetX,
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
        this.offsetX,
        this.height,
        this.positionX,
        this.positionY,
        this.height,
        this.height
      );
    }
  }

  move(rightPressed: boolean, leftPressed: boolean): void {
    if (rightPressed) {
      this.direction = Direcion.RIGHT;
    }

    if (leftPressed) {
      this.direction = Direcion.LEFT;
    }
  }
}
