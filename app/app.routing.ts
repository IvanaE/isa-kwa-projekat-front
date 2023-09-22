import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {PagesComponent} from './pages/pages.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';

export const routes: Routes = [
  {path: '', redirectTo: '/forumi', pathMatch: 'full'},
  {
    path: '',
    component: PagesComponent, children: [
      {path: 'forumi', loadChildren: () => import('./pages/home/forum.module').then(m => m.ForumModule)},
      {
        path: 'teme',
        loadChildren: () => import('./pages/teme/teme.module').then(m => m.TemeModule)
      },
      {path: 'pretplate', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)},
      {path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)},
      {path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)},

    ]
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabledBlocking',
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
