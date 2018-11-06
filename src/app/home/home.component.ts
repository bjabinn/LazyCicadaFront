import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material';
 

export interface PeriodicElement {
  name: string;
  normalH: number;
  extraH: number;
  tlfH: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {normalH: 9, name: 'Daniel González Morillo', extraH: 1, tlfH: 0},
  {normalH: 9, name: 'Cristian Antonio González Robles', extraH: 1, tlfH: 0},
  {normalH: 9, name: 'Ezequiel Pozo Fernandez', extraH: 1, tlfH: 0},
  {normalH: 9, name: 'Ismael Milan Márquez', extraH: 1, tlfH: 0},
  {normalH: 9, name: 'Jose Carlos Gadea Doncel', extraH: 1, tlfH: 0},
  {normalH: 8, name: 'Miguel Sanchez Infante', extraH: 1, tlfH: 1},
  {normalH: 9, name: 'Alfonso García Bellod', extraH: 1, tlfH: 1},
  {normalH: 7, name: 'David Mateos', extraH: 1, tlfH: 1},
  {normalH: 9, name: 'David Panal Cabrera', extraH: 1, tlfH: 1},
  {normalH: 9, name: 'Emilio Jose Palma Barroso', extraH: 1, tlfH: 1},
  {normalH: 9, name: 'Jorge Carlos Lozano Gomez', extraH: 1, tlfH: 1},
  {normalH: 9, name: 'Jose Antonio Beltrán Márquez', extraH: 1, tlfH: 1},
  {normalH: 9, name: 'Verónica Padua Castilleja', extraH: 1, tlfH: 1},
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
    // Recuperamos el mes de la fecha en el datepicker de la página
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
    // Evitamos que Sábados y Domingos sean días elegibles.
    return day !== 0 && day !== 6;
  }

  public pickDate (madao){
    // console.log(sumadre.value);
    let str = madao.value.toString();
    let splitted = str.split("/")[1];
    console.log(splitted);
    return splitted;
    
  }
}
