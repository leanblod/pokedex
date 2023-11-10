import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@views/home/home.component';

const routes: Routes = [
  {
    path: '' ,
    pathMatch: 'full' ,
    title: 'Home' ,
    component: HomeComponent ,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
