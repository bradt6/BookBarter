import { Component, OnInit } from '@angular/core';

import { LoginService } from '../login.service';
import { FavouritesService } from '../favourites.service';
import { CheckoutService } from '../checkout.service';

@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

	constructor(private loginService: LoginService,
				private checkoutService: CheckoutService) { }

	ngOnInit() {
	}

}
