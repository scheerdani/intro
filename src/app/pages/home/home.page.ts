import { AuthGuardService } from './../../services/auth-guard.service';
import { Component, AfterContentInit } from '@angular/core';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements AfterContentInit {
  authState: any;
  // including AuthGuardService here so that it´s avaiable to listen to auth event
  authService: AuthGuardService

  constructor(public events: Events, public guard: AuthGuardService) {
    this.authState = {loggedIn: false};
    this.authService = guard;
   }

  ngOnInit() {
  }

  ngAfterContentInit(){
    this.events.publish('data:AuthState', this.authState);
  }

  login(){
    this.authState.loggedIn = true;
    this.events.publish('data:AuthState', this.authState)
    console.log("login");
  }

  logout(){
    this.authState.loggedIn = false;
    this.events.publish('data:AuthState', this.authState)
    console.log("logout");
  }

}
