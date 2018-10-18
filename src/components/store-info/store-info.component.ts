import { Component, Input } from '@angular/core';
import { StoreInterface } from '../../models/store.interface';

@Component({
  selector: 'store-info',
  templateUrl: 'store-info.component.html'
})
export class StoreInfoComponent {
	@Input() store: StoreInterface;
	private numberStars: number = 5;
	private stars: string[] = [];

	ngOnChanges(){
		let i;
		let aux = this.store.meanRating;
		for(i=0; i<this.numberStars; i++, aux-- ){
			if( aux >= 1 )
				this.stars.push("star");
			else if( aux > 0 && aux < 1 )
				this.stars.push("star-half");
			else
				this.stars.push("star-outline");
		}
	}
}
