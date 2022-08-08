import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Hero } from './hero.model';

export interface HeroesState extends EntityState<Hero> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'heroes' })
export class HeroesStore extends EntityStore<HeroesState> {

  constructor() {
    super();
  }

}
