const image = require('./images/miku.png');

export class Player {
  ctx: CanvasRenderingContext2D;
  positionX: number;
  positionY: number;
  velocityX: number;
  ballRadius: number = 15;
  img: HTMLImageElement;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
    this.ctx = ctx;
    this.positionX = x;
    this.positionY = y;
    this.ballRadius = r;
    this.img = new Image();
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
    this.img.src = image;
    this.ctx.drawImage(this.img, this.positionX, this.positionY - this.img.height);
    //console.log(this.img);
    //this.ctx.restore()
    //console.log(this.tex)
  }
}
