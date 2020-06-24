import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState, getIsLoading } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public isLoading: boolean = false;

  constructor(private authService: AuthService, private store:Store<AppState>) {
    this.store.select(getIsLoading).subscribe(isLoading => this.isLoading = isLoading);
   }

  ngOnInit() {
  }

  login(data:NgForm) {
    this.authService.logIn(data.value.email, data.value.password)
  }

}
