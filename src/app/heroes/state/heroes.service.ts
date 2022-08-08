import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { Hero } from './hero.model';
import { HeroesStore } from './heroes.store';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  constructor(private heroesStore: HeroesStore, private http: HttpClient) {
  }

  urlApi: string = 'http://192.168.0.21:5100/heroes'


  get() {
    return this.http.get<Hero[]>(this.urlApi).pipe(tap(entities => {
      this.heroesStore.set(entities);
    }));
  }

  add(hero: Hero) {
    this.heroesStore.add(hero);
  }

  update(id: number, hero: Partial<Hero>) {
    this.heroesStore.update(id, hero);
  }

  remove(id: ID) {
    this.heroesStore.remove(id);
  }

  getHeroById(id: ID) {
    let resp: any= this.heroesStore.getValue().entities
    if (resp.data) {
      resp = resp.data.find((elem: { id: ID; }) => elem.id === id)
    }else {
      resp = {}
    }    
    return resp;
  }

}
