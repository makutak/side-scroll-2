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
  static create(vec: Vec, ch: string) { return new Coin(); }
  get type(): string { return ActorType.COIN; }
}

@staticImplements<IActor<Lava>>()
class Lava extends Actor {
  static create(vec: Vec, ch: string) { return new Lava(); }
  get type(): string { return ActorType.LAVA; }
}

@staticImplements<IActor<Player>>()
class Player extends Actor {
  static create(vec: Vec, ch: string) { return new Player(); }
  get type(): string { return ActorType.PLAYER; }
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

const level = new Level(simpleLevelPlan);

console.log(level);
