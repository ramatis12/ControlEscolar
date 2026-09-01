import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { InformacionComponent } from './informacion/informacion.component';

@NgModule({
  declarations: [
    ListaComponent,
    FormularioComponent,
    InformacionComponent
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    FormsModule,
  ]
})
export class AlumnosModule { }
