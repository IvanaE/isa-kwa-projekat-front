import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {AccountComponent} from './account.component';
import {PretplateComponent} from './pretplate/pretplate.component';

export const routes: Routes = [
  {
    path: '',
    component: AccountComponent, children: [
      // {path: '', redirectTo: 'profile', pathMatch: 'full'},
      {path: '', component: PretplateComponent},
    ]
  }
];

@NgModule({
  declarations: [
    AccountComponent,
    PretplateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class AccountModule {
}
