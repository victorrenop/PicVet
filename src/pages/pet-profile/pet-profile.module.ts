import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PetProfilePage } from './pet-profile';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PetProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(PetProfilePage),
    ComponentsModule
  ],
})
export class PetProfilePageModule {}
