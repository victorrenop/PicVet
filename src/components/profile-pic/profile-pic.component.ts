import { Component, Input } from '@angular/core';
import { UserNoPwd }  from '../../models/user-nopwd.interface';

/**
 * Generated class for the ProfilePicComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile-pic',
  templateUrl: 'profile-pic.component.html'
})
export class ProfilePicComponent {

  @Input() user: UserNoPwd;

}
