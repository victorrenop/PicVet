import { Component, Input } from '@angular/core';
import { ServiceInterface } from '../../models/service.interface';

@Component({
  selector: 'service-card',
  templateUrl: 'service-card.component.html'
})
export class ServiceCardComponent {
	
	@Input() service: ServiceInterface;	

  constructor() {  }

}
