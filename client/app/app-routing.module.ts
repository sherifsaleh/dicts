import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DictDetailsComponent } from './dict-details/dict-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DictAddComponent } from './dict-add/dict-add.component';
import { DictEditComponent } from './dict-edit/dict-edit.component';





const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'add', component: DictAddComponent },
  { path: 'dict/:id', component: DictDetailsComponent },
  { path: 'edit/:id', component: DictEditComponent },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
