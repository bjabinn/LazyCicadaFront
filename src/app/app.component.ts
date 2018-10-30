import { Component, HostListener } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Daniel González Morillo', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Cristian Antonio González Robles', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public NombreDeUsuario: string = "Admin";
  public ScreenWidth;

  //Para la barra de arriba
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.ScreenWidth = window.innerWidth;
  }
  title = 'HeadCount';

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

  displayedColumns: string[] = ['name', 'position', 'position', 'position', 'position', 'position', 'position', 'position', 'position', 'position', 'position', 'position', 'position', 'position', 'position', 'position', 'position', 'position', 'position', 'position', 'position', 'position', 'position', 'position', 'position', 'position', 'position', 'position', 'position', 'position', 'position', 'position'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);


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

}
