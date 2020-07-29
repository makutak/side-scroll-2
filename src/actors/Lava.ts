import { Vec } from './Vec';
import { staticImplements } from '../lib/util';
import { Actor, IActor, ActorType, GameObject } from './base';
import { State, Status } from '../State';

@staticImplements<IActor<Lava>>()
export class Lava extends Actor implements GameObject {
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

  update(time: number, state: State) {
    let newPos = this.pos.plus(this.speed.times(time));

    if (!state.level.touches(newPos, this.size, 'wall')) {
      return new Lava(newPos, this.speed, this.reset);
    } else if (this.reset) {
      return new Lava(this.reset, this.speed, this.reset);
    } else {
      return new Lava(this.pos, this.speed.times(-1));
    }
  }

  collide(state: State): State {
    return new State(state.level, state.actors, Status.LOST);
  }

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
