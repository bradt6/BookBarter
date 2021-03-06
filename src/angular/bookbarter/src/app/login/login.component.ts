import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
	userForm: any
	errorOccured = '';

	constructor(private router: Router,
				private loginService: LoginService,
				private fb: FormBuilder) { }

	ngOnInit() {
		this.userForm = this.fb.group({
			username: ['', [Validators.required, Validators.maxLength(20)]],
			password: ['', Validators.required]
		})
	}

	onSubmit() {
		let username = this.userForm.value.username
		let password = this.userForm.value.password
		this.loginService.login(username, password).subscribe(data => {
			if (this.loginService.loggedIn()) {
				//TODO Make a login success page?
				this.errorOccured = 'Login successful'
				setTimeout(() => { this.router.navigate(['/']) }, 2000);
			} else {
				this.errorOccured = data['error'];	
			}
		})
	}

}
