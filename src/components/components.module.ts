import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ProfilePicComponent } from './profile-pic/profile-pic.component';
import { StoreInfoComponent } from './store-info/store-info.component';
@NgModule({
	declarations: [ProfilePicComponent, StoreInfoComponent],
	imports: [IonicModule],
	exports: [ProfilePicComponent, StoreInfoComponent]
})
export class ComponentsModule {}
