import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Model} from "./models/model";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favoriteCars: BehaviorSubject<Model[]> = new BehaviorSubject<Model[]>([]);

  constructor() { }
}
