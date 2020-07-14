import { Actor, Player, Coin, Lava, Vec, ActorType } from './actors';

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

enum Status {
  WON = 'won',
  LOST = 'lost',
  PLAYING = 'playing',
}

class State {
  level: Level;
  actors: Actor[];
  status: Status;

  constructor(level: Level, actors: Actor[], status: Status) {
    this.level = level;
    this.actors = actors;
    this.status = status;
  }

  static start(level: Level) {
    return new State(level, level.startActors, Status.PLAYING);
  }

  get player() {
    return this.actors.find((a: Actor) => a.type === ActorType.PLAYER);
  }
}

const simpleLevel = new Level(simpleLevelPlan);

console.log(simpleLevel);
console.log(`${simpleLevel.width} by ${simpleLevel.height}`);
