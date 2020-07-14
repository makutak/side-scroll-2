import { Vec } from './Vec';

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
}
