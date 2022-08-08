import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HeroesService } from '../heroes/state/heroes.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private heroesService: HeroesService,
    private router: Router,
  ) { }

  @Input() hero?: Hero;

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
        .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

  getHeroById(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const respHero = this.heroesService.getHeroById(id)
    if (Object.keys(respHero).length == 0){
      this.router.navigate(['/heroes']);
    }else{
      this.hero = respHero;
    }
  }

  ngOnInit(): void {
    // this.getHero();
    this.getHeroById();
  }

}
