import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HeroesStore } from '../heroes/state/heroes.store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private heroService: HeroService, private heroesStore: HeroesStore) { }

  heroes: Hero[] = [];

  getHeroes(): void {
    // this.heroService.getHeroes()
    //   .subscribe(heroes => this.heroes = heroes.slice(1, 5));
    const resp: any = this.heroesStore.getValue().entities
    this.heroes = resp.data
  }

  ngOnInit(): void {
    this.getHeroes();
  }

}
