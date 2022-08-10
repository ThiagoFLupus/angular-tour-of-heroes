import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HeroesService } from '../heroes/state/heroes.service';
import { HeroesStore } from '../heroes/state/heroes.store';
 

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  constructor(private heroService: HeroService, private heroesService: HeroesService) { }

  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  foundHeroes: Hero[] = [];

  // Push a search term into the observable stream.
  search(term: string): void {
    // this.searchTerms.next(term);
    if (term.length > 1){
      const resp = this.heroesService.searchByName(term)
      this.foundHeroes = resp;
    }else{
      this.foundHeroes = [];
    }
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(300),
  
        // ignore new term if same as previous term
        distinctUntilChanged(),
  
        // switch to new search observable each time the term changes
        switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

}
