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

interface IActor<T> {
  create(vec: Vec, ch: string): T;
}

abstract class Actor {
  abstract pos: Vec;
  abstract size: Vec;
  abstract get type(): string;
}

function staticImplements<T>() {
  return (constructor: T) => { }
}

class Vec {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  plus(other: Vec): Vec {
    return new Vec(this.x + other.x, this.y + other.y);
  }

  times(factor: number): Vec {
    return new Vec(this.x * factor, this.y * factor);
  }
}


enum ActorType {
  COIN = 'coin',
  LAVA = 'lava',
  PLAYER = 'player',
}

@staticImplements<IActor<Coin>>()
class Coin extends Actor {
  pos: Vec;
  basePos: Vec;
  wobble: number;
  size: Vec = new Vec(0.6, 0.6);

  constructor(pos: Vec, basePos: Vec, wobble: number) {
    super();
    this.pos = pos;
    this.basePos = basePos;
    this.wobble = wobble;
  }

  get type(): string { return ActorType.COIN; }

  static create(pos: Vec) {
    const basePos = pos.plus(new Vec(0.2, 0.1));
    return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
  }
}

@staticImplements<IActor<Lava>>()
class Lava extends Actor {
  pos: Vec;
  speed: Vec;
  reset?: Vec;
  size: Vec = new Vec(1, 1);

  constructor(pos: Vec, speed: Vec, reset?: Vec) {
    super();
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
  }

  get type(): string { return ActorType.LAVA; }

  static create(pos: Vec, ch: string) {
    if (ch === '=') {
      return new Lava(pos, new Vec(2, 0));
    } else if (ch === '|') {
      return new Lava(pos, new Vec(0, 2));
    } else if (ch === 'v') {
      return new Lava(pos, new Vec(0, 3), pos);
    }
  }
}

@staticImplements<IActor<Player>>()
class Player extends Actor {
  pos: Vec;
  speed: Vec;
  size: Vec = new Vec(0.8, 1.5);

  constructor(pos: Vec, speed: Vec) {
    super();
    this.pos = pos;
    this.speed = speed;
  }

  get type(): string { return ActorType.PLAYER; }

  static create(pos: Vec) {
    return new Player(pos.plus(new Vec(0, - 0.5)), new Vec(0, 0));
  }
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
