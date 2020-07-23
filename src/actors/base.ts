import { Vec } from './Vec';
import { State } from '../State';

export enum ActorType {
  COIN = 'coin',
  LAVA = 'lava',
  PLAYER = 'player',
}

export interface IActor<T> {
  create(vec: Vec, ch: string): T;
}

export abstract class Actor {
  abstract pos: Vec;
  abstract size: Vec;
  abstract get type(): string;
  abstract update(time: number, state: State, keys?: unknown) : Actor;
}

export interface GameObject {
  collide(state: State): State;
}
