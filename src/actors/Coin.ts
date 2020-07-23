import { Vec } from './Vec';
import { staticImplements } from '../lib/util';
import { Actor, IActor, ActorType, GameObject } from './base';
import { State } from '../State';

@staticImplements<IActor<Coin>>()
export class Coin extends Actor implements GameObject {
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

  update(time: number, state: State) {
    return this;
  }

  collide(state: State): State{
    return state;
  }

  static create(pos: Vec) {
    const basePos = pos.plus(new Vec(0.2, 0.1));
    return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
  }
}
