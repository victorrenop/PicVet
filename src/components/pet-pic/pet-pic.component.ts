import { Component, Input } from '@angular/core';
import { Pets }  from '../../models/pet.interface';

/**
 * Generated class for the ProfilePicComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pet-pic',
  templateUrl: 'pet-pic.component.html'
})
export class PetPicComponent {

  @Input() pet: Pets;
}
