import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagePetPage } from './managepet';

@NgModule({
  declarations: [
    ManagePetPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagePetPage),
  ],
})

export class ManagePetPageModule {}