import {Actor, ActorType } from './actors';
import { Level } from './Level';
import { overlap } from './lib/util';
import { GameObject } from './actors/base';

export enum Status {
  WON = 'won',
  LOST = 'lost',
  PLAYING = 'playing',
}

export class State {
  level: Level;
  actors: Actor[];
  status: Status;

  constructor(level: Level, actors: Actor[], status: Status) {
    this.level = level;
    this.actors = actors;
    this.status = status;
  }

  static start(level: Level) {
    return new State(level, level.startActors, Status.PLAYING);
  }

  get player() {
    return this.actors.find((a: Actor) => a.type === ActorType.PLAYER);
  }

  update(time: number, keys: unknown): State {
    let actors = this.actors.map((actor: Actor) => actor.update(time, this, keys));
    let newState = new State(this.level, actors, this.status);

    if (newState.status !== Status.PLAYING) return newState;

    let player = newState.player;
    if (this.level.touches(player.pos, player.size, ActorType.LAVA)) {
      return new State(this.level, actors, Status.LOST);
    }

    for (const actor of actors) {
      if (actor !== player && overlap(actor, player)) {
        newState = (actor as any).collide(newState);
      }
    }

    return newState;
  }
}
