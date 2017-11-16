import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

export const router: Routes = [
  { path: '', component: ProfilePageComponent },
  { path: 'user/:username', component: ProfilePageComponent },
  { path: '**', redirectTo: '' }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
