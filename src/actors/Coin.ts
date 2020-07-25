import { Vec } from './Vec';
import { staticImplements } from '../lib/util';
import { Actor, IActor, ActorType, GameObject } from './base';
import { State, Status } from '../State';

const WOBBLE_SPEED: number = 8;
const WOBBLE_DIST: number = 0.07;

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

  update(time: number): Coin {
    let wobble = this.wobble + time * WOBBLE_SPEED;
    let wobblePos = Math.sin(wobble) * WOBBLE_DIST;

    return new Coin(this.basePos.plus(new Vec(0, wobblePos)), this.basePos, wobble);
  }

  collide(state: State): State {
    let filterd = state.actors.filter((a: Actor) => a !== this);
    let status = state.status;

    if (!filterd.some(((a: Actor) => a.type !== ActorType.COIN))) {
      status = Status.WON;
    }

    return new State(state.level, filterd, status);
  }

  static create(pos: Vec) {
    const basePos = pos.plus(new Vec(0.2, 0.1));
    return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
  }
}
