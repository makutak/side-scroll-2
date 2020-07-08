const image = require('./images/miku.png');
//const image = require('./images/sMario.png');

export class Player {
  ctx: CanvasRenderingContext2D;
  img: HTMLImageElement = new Image();
  positionX: number;
  positionY: number;
  velocityX: number;
  offsetX: number = 50;

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
    // this.ctx.beginPath();
    // //this.ctx.arc(this.positionX, this.positionY, 0, Math.PI * 2, false);
    // this.ctx.arc(
    //   this.positionX,
    //   this.positionY,
    //   this.ballRadius,
    //   0,
    //   Math.PI * 2,
    //   false
    // );
    // this.ctx.fillStyle = '#0095DD';
    // this.ctx.fill();
    // this.ctx.closePath();
    //this.ctx.save();
    //this.ctx.transform(-1, 0, 0, 1, 0, 0)
    //console.log(this.positionY)
    this.ctx.drawImage(this.img, this.offsetX, 0, this.offsetX, this.height, this.positionX, this.positionY, this.height, this.height,);
    //this.ctx.drawImage(this.img, 0, 0, 32, 32, -0 - 32, 416, 32, 32);
    //this.ctx.restore();
    //console.log(this.img);
    //this.ctx.restore()
    //console.log(this.tex)
  }
}
