import { Actor } from '../actors';
import { Level } from '../Level';

export const staticImplements = <T>() => {
  return (constructor: T) => { }
};

interface Attrs {
  class?: string;
  style?: string;
}

export const elt = (name: string, attrs: Attrs, ...children: Node[]): HTMLElement => {
  let dom = document.createElement(name);

  for (let attr of Object.keys(attrs)) {
    console.log('attr: ', attr);
    console.log('attrs[attr]: ', attrs[attr]);
    dom.setAttribute(attr, attrs[attr]);
  }

  for (let child of children) {
    dom.appendChild(child);
  }

  return dom;
};

export const SCALE = 20;

export const drawGrid = (level: Level): HTMLElement => {
  return elt('table', {
    class: 'background',
    style: `width: ${level.width * SCALE}px`,
  }, ...level.rows.map((row) =>
    elt('tr', { style: `height: ${SCALE}px` },
      ...row.map((type) => elt('td', { class: type })))
  ))
};

export const drawActors = (actors: Actor[]): HTMLElement => {
  return elt('div', {}, ...actors.map((actor: Actor) => {
    let rect = elt('div', { class: `actor ${actor.type}` });
    rect.style.width = `${actor.size.x * SCALE}px`;
    rect.style.height = `${actor.size.y * SCALE}px`;
    rect.style.left = `${actor.pos.x * SCALE}px`;
    rect.style.top = `${actor.pos.y * SCALE}px`;
    return rect;
  }));
};

export const overlap = (actor1: Actor, actor2: Actor) => {
  return actor1.pos.x + actor1.size.x > actor2.pos.x &&
    actor1.pos.x < actor2.pos.x + actor2.size.x &&
    actor1.pos.y + actor1.size.y > actor2.pos.y &&
    actor1.pos.y < actor2.pos.y + actor2.size.y;
};

export const trackKeys = (keys: string[]) => {
  let down = Object.create(null);

  const track = (event: KeyboardEvent) => {
    if (keys.includes(event.key)) {
      down[event.key] = event.type === 'keyDown'
      event.preventDefault();
    }
  }

  window.addEventListener('keyDown', track);
  window.addEventListener('keyup', track);
  return down;
};

export const arrowKeys = trackKeys(['ArrowLeft', 'ArrowRight', 'ArrowUp']);
