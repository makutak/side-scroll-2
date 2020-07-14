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
  )
  )
}
