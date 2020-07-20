import { Actor, Player, Coin, Lava, Vec, ActorType } from './actors';
import { drawActors, elt, SCALE } from './lib/util';

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
const drawGrid = (level: Node) => {
  return level;
};

class DOMDisplay {
  dom: HTMLElement;
  actorLayer: Node | null;

  constructor(parent: HTMLElement, level: Node) {
    this.dom = elt('div', { class: 'game' }, drawGrid(level));
    this.actorLayer = null;
    parent.appendChild(this.dom);
  }

  cleaer() { this.dom.remove(); }
}

interface DOMDisplay {
  syncState(state: State): void;
  scrollPlayerIntoView(state: State): void;
}

DOMDisplay.prototype.syncState = (state: State) => {
  if (this.actorLayer) this?.actorLayer.remove();
  this.actorLayer = drawActors(state.actors);
  this.dom.appendChild(this.actorLayer);
  this.dom.className = `game ${state.status}`;
  this.scrollPlayerIntoView(state);
}

DOMDisplay.prototype.scrollPlayerIntoView = (state: State) => {
  let width = this.dom.clientWidth;
  let height = this.dom.clientHeight;
  let margin = width / 3;

  // The viewport
  let left = this.dom.scrollLeft, right = left + width;
  let top = this.dom.scrollTop, bottom = top + height;

  let player = state.player;
  let center = player.pos
    .plus(player.size.times(0.5))
    .times(SCALE);

  if (center.x < left + margin) {
    this.dom.scrollLeft = center.x - margin;
  } else if (center.x > right - margin) {
    this.dom.scrollLeft = center.x + margin - width;
  }

  if (center.y < top + margin) {
    this.dom.scrollTop = center.y - margin;
  } else if (center.y > bottom - margin) {
    this.dom.scrollTop = center.y + margin - height;
  }
}

console.log(simpleLevel);
console.log(`${simpleLevel.width} by ${simpleLevel.height}`);
