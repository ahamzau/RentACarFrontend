import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule, LoadingController} from '@ionic/angular';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";
import { ApplicationRef } from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-create-model',
  templateUrl: './create-model.page.html',
  styleUrls: ['./create-model.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule]
})
export class CreateModelPage implements OnInit {
  addModelForm: FormGroup
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private router: Router,
    private appRef: ApplicationRef,
  ) { }
  ngOnInit() {
    this.createAddModelForm();
  }

  createAddModelForm(){
    this.addModelForm = this.formBuilder.group({
      name: ["string", Validators.required],
      dailyPrice: [1000, Validators.required],
      brandId: [1, Validators.required],
      transmissionId: [1, Validators.required],
      fuelId: [1, Validators.required],
      imageUrl: ["string", Validators.required],
      authenticatorCode: [""],
    });
  }

  async createmodel(){
    const loading = await this.loadingController.create({
      message: "Loading"
    })
    await loading.present();

    this.httpClient.post<any>(`${environment.apiUrl}Models`, this.addModelForm.value).subscribe({
      next: (value) => {
        loading.remove()
        this.router.navigateByUrl("")
      },
    })
  }

  goToCreateCar() {
    this.router.navigateByUrl("createcar")
  }
}
