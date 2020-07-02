const canvas: HTMLCanvasElement = document.getElementById('app') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

ctx.beginPath();
ctx.arc(10, 10, 10, 0, (Math.PI * 2));
ctx.fillStyle = ('#0095DD');
ctx.fill();
ctx.closePath();
