import { Component, HostListener, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material';
 

export interface PeriodicElement {
  name: string;
  position: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Daniel González Morillo'},
  {position: 2, name: 'Cristian Antonio González Robles'},
  {position: 3, name: 'Ezequiel Pozo Fernandez'},
  {position: 4, name: 'Ismael Milan Márquez'},
  {position: 5, name: 'Jose Carlos Gadea Doncel'},
  {position: 6, name: 'Miguel Sanchez Infante'},
  {position: 7, name: 'Alfonso García Bellod'},
  {position: 8, name: 'David Mateos'},
  {position: 9, name: 'David Panal Cabrera'},
  {position: 10, name: 'Emilio Jose Palma Barroso'},
  {position: 11, name: 'Jorge Carlos Lozano Gomez'},
  {position: 12, name: 'Jose Antonio Beltrán Márquez'},
  {position: 13, name: 'Verónica Padua Castilleja'},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class AppHome implements OnInit{
  title = 'HeadCount';
  public NombreDeUsuario: string = "Admin";

  centroControl = new FormControl();
  lineaControl = new FormControl();
  celdaControl = new FormControl();
  estadoControl = new FormControl();
  Centros: string[] = ['Valencia', 'Sevilla', 'Temuco'];
  Lineas: string[] = ['1', '2', '3'];
  Celdas: string[] = ['Tesco', 'BCA', 'Randstad'];
  Estados: string[] = ['Previsión', 'Intermedio', 'Cerrado'];
  seleccionado:number = 1;
  filteredOptionsCentros: Observable<string[]>;
  filteredOptionsLineas: Observable<string[]>;
  filteredOptionsCeldas: Observable<string[]>;
  filteredOptionsEstados: Observable<string[]>;

  daysOfTheMonth: number[];

  displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  ngOnInit(){
    this.getDaysOfTheMonth();
  }

  startObservable(input:number){
    this.seleccionado = input;

    if (this.seleccionado==1) {
      this.filteredOptionsCentros = this.centroControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        ); 
    }

    if (this.seleccionado==2) {
      this.filteredOptionsLineas = this.lineaControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
    }
    if (this.seleccionado==3) {
      this.filteredOptionsCeldas = this.celdaControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
    }
    if (this.seleccionado==4) {
      this.filteredOptionsEstados = this.estadoControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
    }
    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    if (this.seleccionado==1) {
      return this.Centros.filter(option => option.toLowerCase().includes(filterValue));
    }
    else if(this.seleccionado==2){
      return this.Lineas.filter(option => option.toLowerCase().includes(filterValue));
    }
    else if(this.seleccionado==3){
      return this.Celdas.filter(option => option.toLowerCase().includes(filterValue));
    }
    else if(this.seleccionado==4){
      return this.Estados.filter(option => option.toLowerCase().includes(filterValue));
    }
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private getDaysOfTheMonth(): void{
    //recuperamos el mes de la fecha en el date picker de la pagina
    let month :number = new Date().getMonth();
    let year  :number = new Date().getFullYear();
    let monthLength : number = new Date(year, (month + 1), 0).getDate();
    this.daysOfTheMonth = [];
    for(let i = 1; i <= monthLength ; i++)
    {
      this.daysOfTheMonth.push(i);
      this.displayedColumns.push(i.toString());
    }
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  public pickDate (sumadre){
    // console.log(sumadre.value);
    console.log(sumadre.value.toString().split('/',0));
    
  }

}
