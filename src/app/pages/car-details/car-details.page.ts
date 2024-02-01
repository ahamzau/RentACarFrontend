import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms';
import {AlertController, IonicModule} from '@ionic/angular';
import {ActivatedRoute} from "@angular/router";
import {Car} from 'src/app/models/car';
import {Model} from 'src/app/models/model';
import {Brand} from 'src/app/models/brand';
import {Fuel} from 'src/app/models/fuel';
import {Color} from 'src/app/models/color';
import {PaginatedResult} from "../../models/paginatedResult";
import {environment} from "../../../environments/environment";
import {Transmission} from "../../models/transmission";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.page.html',
  styleUrls: ['./car-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class CarDetailsPage implements OnInit {
  car: Car;
  model: Model;
  color: Color;
  brand: Brand;
  fuel: Fuel;
  transmission: Transmission
  constructor(private httpClient: HttpClient, private readonly activatedRoute: ActivatedRoute, private readonly alertController: AlertController) {
  }

  ngOnInit() {
    console.log(this.car)
    this.activatedRoute.params.subscribe(params => {
      const carId = params['carId'];
      this.httpClient.get<Car>(`${environment.apiUrl}Cars/${carId}`).subscribe({
        next: (value) => {
          this.car = value
          const modelId = value.modelId;
          const colorId = value.colorId
          this.httpClient.get<Model>(`${environment.apiUrl}Models/${modelId}`).subscribe({
            next: (value) => {
              this.model = value;
              const brandId = value.brandId
              const fuelId = value.fuelId
              const transmissionId = value.transmissionId
              this.httpClient.get<Brand>(`${environment.apiUrl}Brands/${brandId}`).subscribe({
                next: (value) => {
                  this.brand = value
                }
              })
              this.httpClient.get<Fuel>(`${environment.apiUrl}Fuels/${fuelId}`).subscribe({
                next: (value) => {
                  this.fuel = value
                }
              })
              this.httpClient.get<Transmission>(`${environment.apiUrl}Transmissions/${transmissionId}`).subscribe({
                next: (value) => {
                  this.transmission = value
                }
              })
            }
          })
          this.httpClient.get<Color>(`${environment.apiUrl}Colors/${colorId}`).subscribe({
            next: (value) => {
              this.color = value
            }
          })
        }
      })
    });
  }
}
