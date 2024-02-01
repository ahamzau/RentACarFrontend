import {Component, inject, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {PaginatedResult} from "../../models/paginatedResult";
import {User} from "../../models/user";
import {environment} from "../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertController, IonicModule} from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, HttpClientModule, CommonModule],
})
export class Tab3Page implements OnInit {
  user: User
  router: Router = inject(Router)

  constructor(private httpClient: HttpClient,private readonly activatedRoute: ActivatedRoute) {
  }

//ngOnInit() {
//     this.activatedRoute.params.subscribe({
//       next: (params) => {
//         this.alertController.create({
//           header: "ARABA ID",
//           message: params["carId"],
//           buttons: ["TAMAM"]
//         }).then(controller => controller.present())
//       }
//     })
//   }

  ngOnInit() {
    this.httpClient.get<User>(`${environment.apiUrl}Users/GetFromAuth`).subscribe({
      next: (user) => {
        this.user = user;
        console.log(user)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


}

//this.httpClient.get<PaginatedResult<User>>(`${environment.apiUrl}Users/{Id}`).subscribe({
//       next: (user) => {
//         this.paginatedUserResult = user;
//         console.log(user)
//       },
//       error: (error) => {
//         console.log(error);
//       }
//     });

