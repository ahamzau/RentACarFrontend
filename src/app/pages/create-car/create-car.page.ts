import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule, LoadingController} from '@ionic/angular';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.page.html',
  styleUrls: ['./create-car.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule]
})
export class CreateCarPage implements OnInit {
  addCarForm: FormGroup

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createAddCarForm();
  }

  createAddCarForm(){
    this.addCarForm = this.formBuilder.group({
      colorId: [1, Validators.required],
      modelId: [1, Validators.required],
      rentalBranchId: [1, Validators.required],
      carState: [1, Validators.required],
      kilometer: [0, Validators.required],
      modelYear: [0, Validators.required],
      plate: ['', Validators.required],
      minFindeksCreditRate: [1, Validators.required],
      authenticatorCode: [""],
    });
  }

  async createcar(){
    const loading = await this.loadingController.create({
      message: "Loading"
    })
    await loading.present();

    this.httpClient.post<any>(`${environment.apiUrl}Cars`, this.addCarForm.value).subscribe({
      next: (value) => {
        loading.remove()
        this.router.navigateByUrl("")
      },
    })
  }
  goToCreateModel(){
    this.router.navigateByUrl("createmodel")
  }

}
