import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {ForumiComponent} from './forumi.component';
import {TemeComponent} from "../teme/teme.component";

export const routes: Routes = [
  {path: '', component: ForumiComponent, pathMatch: 'full'},
  {path: ':id', component: TemeComponent}
];

@NgModule({
  declarations: [
    ForumiComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ForumModule {
}
