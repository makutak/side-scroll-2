let simpleLevelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`;

class Actor {
  static create(vec, Vec, ch: string) { throw new Error('not yet implimented'); }
}
class Vec { constructor(x: number, y: number) { console.log('not yet implmented') } }

class Coin extends Actor {
  static create(vec: Vec, ch: string) { console.log('create'); }
}

class Lava extends Actor {
  static create(vec: Vec, ch: string) { console.log('create'); }
}

class Player extends Actor {
  static create(vec: Vec, ch: string) { console.log('create'); }
}

const levelChars = {
  ".": "empty", "#": "wall", "+": "lava",
  "@": Player, "o": Coin,
  "=": Lava, "|": Lava, "v": Lava
};

class Level {
  constructor(plan: string) {
    console.log(plan);
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

  height: number;
  width: number;
  startActors: Actor[];
  rows: string[][];
}

const level = new Level(simpleLevelPlan);

console.log(level);
