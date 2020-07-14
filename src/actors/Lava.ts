import { Vec } from './Vec';
import { staticImplements } from '../lib/util';
import { Actor, IActor, ActorType } from './base';

@staticImplements<IActor<Lava>>()
export class Lava extends Actor {
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
