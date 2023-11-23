import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/heroes/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private authservice: AuthService) { }
  login() {
    this.authservice.login().subscribe(resp => {
      console.log(resp);
      if (resp.id) {
        this.router.navigate(['./heroes']);
      }
    })

    // this.router.navigate(['./heroes']);
  }
  ingresarSinLogin(){
    this.authservice.logout();
    console.log('Ingresar sin login(token)',this.authservice.auth.id);
    this.router.navigate(['./heroes']);   	 
     }
  

}
