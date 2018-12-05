import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ProfilePicComponent } from './profile-pic/profile-pic.component';
import { StoreInfoComponent } from './store-info/store-info.component';
import { StorePicComponent } from './store-pic/store-pic.component';
import { ServiceCardComponent } from './service-card/service-card.component';
import { PetPicComponent } from './pet-pic/pet-pic.component';

@NgModule({
	declarations: [
		PetPicComponent,
		ProfilePicComponent, 
		StoreInfoComponent,
	    StorePicComponent,
	    ServiceCardComponent
	],
	imports: [IonicModule],
	exports: [
		PetPicComponent,
		ProfilePicComponent, 
		StoreInfoComponent,
	    StorePicComponent,
	    ServiceCardComponent,
	]
})
export class ComponentsModule {}
