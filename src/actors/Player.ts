import { Vec } from './Vec';
import { staticImplements } from '../lib/util';
import { Actor, IActor, ActorType } from './base';
import { State } from '../State';

const PLAYER_SPEED = 7;
const GRAVITY = 30;
const JUMP_SPEED = 17;

@staticImplements<IActor<Player>>()
export class Player extends Actor {
  pos: Vec;
  speed: Vec;
  size: Vec = new Vec(0.8, 1.5);

  constructor(pos: Vec, speed: Vec) {
    super();
    this.pos = pos;
    this.speed = speed;
  }

  get type(): string { return ActorType.PLAYER; }

  update(time: number, state: State) {
    return this;
  }

  static create(pos: Vec) {
    return new Player(pos.plus(new Vec(0, - 0.5)), new Vec(0, 0));
  }
}
