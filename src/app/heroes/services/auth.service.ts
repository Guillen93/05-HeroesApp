import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Auth } from 'src/app/auth/interfaces/auth';
import { Observable, map, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined; //puede ser nula

  constructor(private http: HttpClient) { }

  verificaAutenticacion(): Observable<boolean> {
	if (!localStorage.getItem('token')) {
  	return of(false); //para convertir el false en un observable
  	//y poder utilizar el método pipe y tap en auth.guard.ts
	}

	//Debemos verificar si el token hace match con la base de datos
	return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
  	.pipe(
    	map(auth => {
      	console.log('map', auth); // todos los datos del usuario 1
      	this._auth = auth;  //para ver el nombre del usuario
      	return true; //el get ya devuelve un observable
    	})
  	);
  }

  login() {
	return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
  	.pipe(
    	tap(resp => this._auth = resp),
    	tap(resp => localStorage.setItem('token', resp.id)),
  	);
  }

  get auth(): Auth {  //metodo publico, devuelve del tipo Auth
	return { ...this._auth! } //para que sea de solo lectura
	//! para que confie en mi, siempre va a tener un valor
  }

  logout() {
	this._auth = undefined;
  }

}
