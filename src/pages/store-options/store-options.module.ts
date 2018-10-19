import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreOptionsPage } from './store-options';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    StoreOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(StoreOptionsPage),
    ComponentsModule
  ],
})
export class StoreOptionsPageModule {}
