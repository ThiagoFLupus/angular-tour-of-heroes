import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Hero } from './hero.model';
import { HeroesStore } from './heroes.store';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  constructor(private heroesStore: HeroesStore, private http: HttpClient) {
  }

  urlApi: string = 'http://192.168.0.21:5100'


  get() {
    return this.http.get<Hero[]>("/echo/api/heroes").pipe(tap(entities => {
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

  searchByName(name: string) {
    let resp: any= this.heroesStore.getValue().entities
    const returnArray: Hero[] = []
    if (resp.data) {
      resp.data.forEach((elem: Hero) => {
        if (elem.name.includes(name)) returnArray.push(elem);
      })
    }
    return returnArray
  }

  addFromApi(name: string) {
    return this.http.post<any>("/echo/api/create-hero", {'name': name}, 
      {
        headers: new HttpHeaders(
          {'Content-Type': 'application/json'},
        )
      }).pipe(
        tap(entities => {
          this.heroesStore.set(entities.data);
        })
    )
  }

  updateFromApi(hero: Hero) {
    const data = {
      'hero': hero
    }
    return this.http.put<any>("/echo/api/update-hero", data, 
      {
        headers: new HttpHeaders(
          {'Content-Type': 'application/json'},
        )
      }).pipe(
        tap(entities => {
          this.heroesStore.set(entities.data);
        })
    )
  }
}
