import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListOfPetsPage } from './list-of-pets';

@NgModule({
  declarations: [
    ListOfPetsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListOfPetsPage),
  ],
})

export class ListOfPetsPageModule {}