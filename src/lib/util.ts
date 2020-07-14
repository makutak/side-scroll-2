export const staticImplements = <T>() => {
  return (constructor: T) => { }
};

interface Attr {
  class: string;
}

export const elt = (name: string, attrs: Attr[], ...children: Node[]): HTMLElement => {
  let dom = document.createElement(name);

  for (let attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attr[attr]);
  }

  for (let child of children) {
    dom.appendChild(child);
  }

  return dom;
};
