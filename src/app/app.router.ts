import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';

export const router: Routes = [
  { path: '', component: RegisterComponent, canActivate: [AuthService] },
  { path: 'user/:username', component: ProfilePageComponent, canActivate: [AuthService] }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
