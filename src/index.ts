import { drawActors, elt, SCALE, drawGrid, arrowKeys } from './lib/util';
import { State, Status } from './State';
import { Level } from './Level';

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

class DOMDisplay {
  dom: HTMLElement;
  actorLayer: HTMLElement | null;

  constructor(parent: HTMLElement, level: Level) {
    this.dom = elt('div', { class: 'game' }, drawGrid(level));
    this.actorLayer = null;
    parent.appendChild(this.dom);
  }

  cleaer() { this.dom.remove(); }

  syncState(state: State) {
    if (this.actorLayer) this.actorLayer.remove();
    this.actorLayer = drawActors(state.actors);
    this.dom.appendChild(this.actorLayer);
    this.dom.className = `game ${state.status}`;
    this.scrollPlayerIntoView(state);
  }

  scrollPlayerIntoView(state: State) {
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
}

const simpleLevel = new Level(simpleLevelPlan);
console.log(`${simpleLevel.width} by ${simpleLevel.height}`);
const display = new DOMDisplay(document.body, simpleLevel);
display.syncState(State.start(simpleLevel));

const runAnimation = (frameFunc: (t: number) => boolean) => {
  let lastTime = null;
  const frame = (time: number) => {
    if (lastTime != null) {
      let timeStep = Math.min(time - lastTime, 100) / 1000;
      if (frameFunc(timeStep) === false) return;
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const runLevel = (level: Level, Display: DOMDisplay) => {
  let display = new DOMDisplay(document.body, level);
  let state = State.start(level);
  let ending = 1;

  return new Promise(resolve => {
    runAnimation((time: number) => {
      state = state.update(time, arrowKeys);
      display.syncState(state);
      if (state.status === Status.PLAYING) {
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        display.cleaer();
        resolve(state.status);
        return false;
      }
    });
  });
};

const runGame = async (plans: string[], Display: DOMDisplay) => {
  for (let level = 0; level < plans.length; length++) {
    let status = await runLevel(new Level(plans[level]), Display);

    if (status === Status.WON) level++;
  }
  console.log(`You've won!`);
}

/*
interface DOMDisplay {
  syncState(state: State): void;
  scrollPlayerIntoView(state: State): void;
}

DOMDisplay.prototype.syncState = (state: State) => {
  if (this.actorLayer) this.actorLayer.remove();
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
*/
