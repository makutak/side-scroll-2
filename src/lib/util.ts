import { Actor } from '../actors';
import { Level } from '../index';

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
    dom.setAttribute(attr, attr[attr]);
  }

  for (let child of children) {
    dom.appendChild(child);
  }

  return dom;
};

const scale = 20;

export const drawGrid = (level: Level) => {
  return elt('table', {
    class: 'background',
    style: `width: ${level.width * scale}px`,
  }, ...level.rows.map((row) =>
    elt('tr', {
      style: `height: ${scale}px`,
      ...row.map((type) => elt('td', { class: type }))
    })
  ))
};

export const drawActors = (actors: Actor[]) => {
  return elt('div', {}, ...actors.map((actor: Actor) => {
    let rect = elt('div', {class: `actor ${actor.type}`});
    rect.style.width = `${actor.size.x * scale}px`;
    rect.style.height = `${actor.size.y * scale}px`;
    rect.style.left = `${actor.pos.x * scale}px`;
    rect.style.top = `${actor.pos.y * scale}px`;
    return rect;
  }));
};
