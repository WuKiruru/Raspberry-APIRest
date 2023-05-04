import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './Home/home/home.component';
import { ServicesComponent } from './Services/services/services.component';
import { MangasComponent } from './Mangas/mangas/mangas.component';
import { HelpComponent } from './Help/help/help.component';
import { FigurinesComponent } from './Figurines/figurines/figurines.component';
import { ContactComponent } from './Contact/contact/contact.component';
import { FormViewComponent } from './FormView/form-view/form-view.component';
import { ModalComponent } from './Modal/modal/modal.component';

const routes: Routes = [
  {
    path: 'Home', component:HomeComponent,
  },
  {
    path: 'Services', component:ServicesComponent,
  },
  {
    path: 'Mangas', component:MangasComponent,
  },
  {
    path: 'Help', component:HelpComponent,
  },
  {
    path: 'Figurines', component:FigurinesComponent,
  },
  {
    path: 'Contact', component:ContactComponent,
  },
  {
    path: 'formView', component:FormViewComponent,
  },
  {
    path: 'Modal', component:ModalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
