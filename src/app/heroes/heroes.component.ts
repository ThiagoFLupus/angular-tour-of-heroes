import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { HeroesService } from './state/heroes.service';
import { HeroesStore } from './state/heroes.store';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  constructor(private heroService: HeroService, private messageService: MessageService, private heroesService: HeroesService, private heroStore: HeroesStore) { }

  heroes: Hero[] = [];
  response: any;

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  getHeroesFromApi(): void {
    this.heroesService.get()
      .subscribe(
        _ => {
          this.response = this.heroStore.getValue().entities
          this.heroes = this.response.data
        }
      )
  }

  addHeroesFromApi(name: string){
    this.heroesService.addFromApi(name)
      .subscribe(response => console.log(response))
  }

  ngOnInit(): void {
    this.getHeroes();
  }

}
