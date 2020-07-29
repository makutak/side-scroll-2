import { Player, Coin, Lava, Actor, Vec } from './actors';

export const levelChars = {
  ".": "empty", "#": "wall", "+": "lava",
  "@": Player, "o": Coin,
  "=": Lava, "|": Lava, "v": Lava
};

export class Level {
  height: number;
  width: number;
  startActors: Actor[];
  rows: string[][];

  constructor(plan: string) {
    let rows = plan.trim().split('\n').map((l) => l.split(''));
    this.height = rows.length;
    this.width = rows[0].length;
    this.startActors = [];

    this.rows = rows.map((row, y) => {
      return row.map((ch, x) => {
        let type = levelChars[ch];
        if (typeof type == 'string') {
          return type;
        }

        this.startActors.push(type.create(new Vec(x, y), ch));
        return 'empty';
      })
    })
  }

  touches(pos: Vec, size: Vec, type: string): boolean {
    const xStart = Math.floor(pos.x);
    const xEnd = Math.floor(pos.x + size.x);
    const yStart = Math.floor(pos.y);
    const yEnd = Math.floor(pos.y + size.y);

    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        let isOutside =
          x < 0 || x >= this.width ||
          y < 0 || y >= this.height;

        let here = isOutside ? 'wall' : this.rows[y][x];
        if (here === type) return true;
      }
      return false;
    }
  }
}
