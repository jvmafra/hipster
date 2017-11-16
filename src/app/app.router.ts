import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RegisterComponent } from './register/register.component';

export const router: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'user/:username', component: ProfilePageComponent },
  { path: '**', redirectTo: '' }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
