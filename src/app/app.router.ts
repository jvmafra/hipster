import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { TimelineComponent } from './timeline/timeline.component';
import { PostPageComponent } from './post-page/post-page.component';
import { SearchComponent } from './search/search.component';
import { ConfirmationPageComponent } from "./confirmation-page/confirmation-page.component";

export const router: Routes = [
  { path: '', component: TimelineComponent, canActivate: [AuthService] },
  { path: 'confirmation/:token', component: ConfirmationPageComponent},
  { path: 'register', component: RegisterComponent, canActivate: [AuthService] },
  { path: 'search', component: SearchComponent, canActivate: [AuthService] },
  { path: 'user/:username', component: ProfilePageComponent, canActivate: [AuthService] },
  { path: 'post/:id', component: PostPageComponent, canActivate: [AuthService] },
  { path: '**', redirectTo: '' }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
