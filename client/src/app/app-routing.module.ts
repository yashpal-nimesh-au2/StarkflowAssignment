import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './authComponent/auth.component';
import { MainComponent } from './mainComponent/main.component';
import { AuthGuard } from './auth.guard';




const routes: Routes = [
  { path: "", redirectTo: "auth", pathMatch: "prefix" },
  { path: "auth", component: AuthComponent },
  { path: "main", component: MainComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const route = [AppComponent, AuthComponent, MainComponent];
