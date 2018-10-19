import { Component, Input } from '@angular/core';
import { StoreInterface } from '../../models/store.interface';
/**
 * Generated class for the StorePicComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'store-pic',
  templateUrl: 'store-pic.component.html'
})
export class StorePicComponent {

	@Input() store: StoreInterface;

}
