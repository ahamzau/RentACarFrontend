import {Validators} from "@angular/forms";

export interface Model {
  id: number,
  brandId: number,
  fuelId: number,
  transmissionId: number,
  brandName: string,
  transmissionName: string,
  fuelName: string,
  name: string,
  dailyPrice: number,
  imageUrl: string,
}
