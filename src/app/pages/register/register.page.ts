import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule, LoadingController} from '@ionic/angular';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule]
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      authenticatorCode: [""],
    })
  }

  async register(){
    const loading = await this.loadingController.create({
      message: "Loading"
    })
    await loading.present();

    this.httpClient.post<any>(`${environment.apiUrl}Auth/Register`, this.registerForm.value).subscribe({
      next: (value) => {
        loading.remove()
        this.router.navigateByUrl("")
      },
    })
  }



}
