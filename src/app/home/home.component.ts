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

let selectedMonth: number;
let selectedYear: number;

const ELEMENT_DATA: PeriodicElement[] = [
  {normalH: 9, name: 'Daniel González Morillo', extraH: 1, tlfH: 0},
  {normalH: 9, name: 'Cristian Antonio González Robles', extraH: 1, tlfH: 0},
  {normalH: 9, name: 'Ezequiel Pozo Fernández', extraH: 1, tlfH: 0},
  {normalH: 9, name: 'Ismael Milan Márquez', extraH: 1, tlfH: 0},
  {normalH: 9, name: 'Jose Carlos Gadea Doncel', extraH: 1, tlfH: 0},
  {normalH: 8, name: 'Miguel Sánchez Infante', extraH: 1, tlfH: 1},
  {normalH: 9, name: 'Alfonso García Bellod', extraH: 1, tlfH: 1},
  {normalH: 7, name: 'David Mateos', extraH: 1, tlfH: 1},
  {normalH: 9, name: 'David Panal Cabrera', extraH: 1, tlfH: 1},
  {normalH: 9, name: 'Emilio José Palma Barroso', extraH: 1, tlfH: 1},
  {normalH: 9, name: 'Jorge Carlos Lozano Gómez', extraH: 1, tlfH: 1},
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

  centroControl = new FormControl();
  lineaControl = new FormControl();
  celdaControl = new FormControl();
  estadoControl = new FormControl();
  horasControl = new FormControl();
  Centros: string[] = ['Valencia', 'Sevilla', 'Temuco'];
  Lineas: string[] = ['1', '2', '3'];
  Celdas: string[] = ['Tesco', 'BCA', 'Randstad'];
  Estados: string[] = ['Previsión', 'Intermedio', 'Cerrado'];
  Horas: string[] = ['Normales', 'Extra', 'TLF'];
  seleccionado:number = 1;
  filteredOptionsCentros: Observable<string[]>;
  filteredOptionsLineas: Observable<string[]>;
  filteredOptionsCeldas: Observable<string[]>;
  filteredOptionsEstados: Observable<string[]>;
  filteredOptionsHoras: Observable<string[]>;

  daysOfTheMonth: number[];

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  ngOnInit(){
    
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
    if (this.seleccionado==5) {
      this.filteredOptionsHoras = this.horasControl.valueChanges
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
    else if(this.seleccionado==5){
      return this.Horas.filter(option => option.toLowerCase().includes(filterValue));
    }
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public getDaysOfTheMonth(): void{
    this.daysOfTheMonth = [];
    this.displayedColumns = [];
    // Recuperamos el mes de la fecha en el datepicker de la página
    let month :number; 
    month = selectedMonth; 
    let year  :number = selectedYear;
    let monthLength : number = new Date(year, month, 0).getDate();

    if (selectedMonth != undefined && selectedYear != undefined && this.horasControl.value != null) {
      this.displayedColumns = ['name'];
      for(let i = 1; i <= monthLength ; i++)
      {
        this.daysOfTheMonth.push(i);
        this.displayedColumns.push(i.toString());
      }
      
    }else if (selectedYear == undefined) {
      this.displayedColumns = [];
    }
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Evitamos que Sábados y Domingos sean días elegibles.
    return day !== 0 && day !== 6;
  }

  public pickYear (madao){
    let strYear = madao.value.toString();
    let splittedYear = strYear.split("/")[2];
    selectedYear = splittedYear;
    return splittedYear;
    
  }

  public pickMonth (madao){
    let strMonth = madao.value.toString();
    let splittedMonth = strMonth.split("/")[0];
    selectedMonth = splittedMonth;
    return splittedMonth;
    
  }
}
