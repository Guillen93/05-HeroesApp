import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from '../interfaces/heroes.interfaces';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }

  getHeroes() {
    // return this.http.get<Heroe[]>('http://localhost:3000/heroes')
    return this.http.get<Heroe[]>(environment.baseUrl + '/heroes')
  }

  getHeroesPorId(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(environment.baseUrl + '/heroes/' + id);
  }

  getSugerencias(termino: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(environment.baseUrl + '/heroes?q=' + termino + '&_limit=6');
  }

  agregarHeroe(heroe: Heroe):Observable<Heroe>{ //recibe un heroe
    return this.http.post<Heroe>(environment.baseUrl+'/heroes/', heroe); 
    //regresa un         <Heroe>  :Observable<Heroe>
  }
  actualizarHeroe(heroe: Heroe):Observable<Heroe>{ //recibe un heroe
    return this.http.put<Heroe>(environment.baseUrl+'/heroes/'+heroe.id , heroe); 
    //regresa un         <Heroe>  :Observable<Heroe>
  }
  borrarHeroe(id: string):Observable<any>{ //recibe un id, no devuelve nada
    return this.http.delete<any>(environment.baseUrl + '/heroes/' + id);
  }



}
