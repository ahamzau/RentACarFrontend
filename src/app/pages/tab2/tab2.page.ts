import {Component, OnInit, inject, OnDestroy} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {FavoritesService} from 'src/app/favorites.service';
import {CommonModule} from "@angular/common";
import {Model} from "../../models/model";
import {TurkishCurrencyPipe} from "../../pipes/turkish-currency.pipe";
import {BehaviorSubject, map, Observable, Subscription, tap} from "rxjs";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, TurkishCurrencyPipe]
})
export class Tab2Page implements OnInit{
  favoriteCars: Observable<Model[]>
  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    const favoriteCars = localStorage.getItem('favorite-cars') ? JSON.parse(localStorage.getItem("favorite-cars")!) : null
    this.favoriteCars = this.favoritesService.favoriteCars;
    this.favoritesService.favoriteCars.next(favoriteCars)
  }

  delete(carId: number) {
    const favoriteCars: Model[] | null = localStorage.getItem('favorite-cars') ? JSON.parse(localStorage.getItem("favorite-cars")!) : null
    if (favoriteCars) {
      const newCars = favoriteCars!.filter(car => car.id !== carId);
      localStorage.setItem("favorite-cars", JSON.stringify(newCars))
      this.favoritesService.favoriteCars.next(newCars)
    }
  }

}
