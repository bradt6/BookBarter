import { Component } from '@angular/core';

import { LoginService } from './login.service';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BookBarter';

  constructor(private loginService: LoginService,
  			  private checkoutService: CheckoutService) {}
}
