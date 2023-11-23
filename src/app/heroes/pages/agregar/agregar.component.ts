import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }
  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    // this.heroesService.getHeroesPorId(this.activatedRoute.snapshot.params['id'])
    //   .subscribe(heroe => this.heroe = heroe);     // FUNCIONA

    if (this.router.url.includes("editar")) {
      this.activatedRoute.params.pipe(
        switchMap(({ id }) => this.heroesService.getHeroesPorId(id)))
        .subscribe(heroe => this.heroe = heroe);
    }

    // this.activatedRoute.params.pipe(
    //   switchMap(({ id }) => this.heroesService.getHeroesPorId(id))).subscribe(heroe => this.heroe = heroe);

  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) { return; }

    if (this.heroe.id) {
      // Actualizaremos el registro
      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe(heroe => {
          console.log('Actualizando', heroe);
          this.heroe = heroe;
          this.mostrarSnackBar("Registro Actualizado")
        })
    } else {
      // Crearemos un nuevo registro
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          console.log('Agregando', heroe);

          this.router.navigate(['/heroes/editar', heroe.id]);
          this.mostrarSnackBar("Registro Creado")
        })
    }
  }
  borrarHeroe() {

    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    })

    dialog.afterClosed().subscribe(
      (result) => {
        console.log(result);
        this.heroesService.borrarHeroe(this.heroe.id!)
            .subscribe(resp => {
              console.log('Registro borrado', this.heroe);
              this.router.navigate(['/heroes']);
              this.mostrarSnackBar("Registro Borrado")
            })
      }
    )

  }

  // borrarHeroe() {
  //   this.heroesService.borrarHeroe(this.heroe.id!)
  //     .subscribe(resp => {
  //       console.log('Registro borrado', this.heroe);
  //       this.router.navigate(['/heroes']);
  //       this.mostrarSnackBar("Registro Borrado")
  //     })
  // }
  mostrarSnackBar(mensaje: string): void {
    //recibe un string y no regresa nada
    this.snackBar.open(mensaje, 'Cerrar', { duration: 2500 });
  }


}
