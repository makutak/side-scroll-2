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

  update(time: number, state: State, keys: any) {
    let xSpeed = 0;
    if (keys.ArrowLeft) xSpeed -= PLAYER_SPEED;
    if (keys.ArrowRight) xSpeed += PLAYER_SPEED;
    let pos = this.pos;
    let movedX = pos.plus(new Vec(xSpeed * time, 0));

    if (!state.level.touches(movedX, this.size, 'wall')) {
      pos = movedX;
    }

    let ySpeed = this.speed.y + time * GRAVITY;
    let movedY = pos.plus(new Vec(0, ySpeed * time));
    if (!state.level.touches(movedY, this.size, 'wall')) {
      pos = movedY
    } else if (keys.ArrowUp && ySpeed > 0) {
      ySpeed -= 0;
    } else {
      ySpeed = 0;
    }

    return new Player(pos, new Vec(xSpeed, ySpeed));
  }

  static create(pos: Vec) {
    return new Player(pos.plus(new Vec(0, - 0.5)), new Vec(0, 0));
  }
}
