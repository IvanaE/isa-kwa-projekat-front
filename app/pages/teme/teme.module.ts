import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {TemeComponent} from './teme.component';
import {TemaComponent} from "./tema/tema.component";

export const routes: Routes = [
  {path: '', component: TemeComponent, pathMatch: 'full'},
  {path: ':id', component: TemaComponent}
];

@NgModule({
  declarations: [
    TemeComponent,
    TemaComponent
  ],
  exports: [
    TemeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class TemeModule {
}
