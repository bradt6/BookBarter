import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../login.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm: any;
  errorOccured = '';

  constructor(private router: Router, private registerService: LoginService, private fb: FormBuilder){

  }

  ngOnInit() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  onSubmit() {
    let username = this.userForm.value.username;
    let password = this.userForm.value.password;
    let confirmPassword = this.userForm.value.confirmPassword;

	if (password !== confirmPassword) {
		this.errorOccured = 'Passwords do not match';
		return
	}

    this.registerService.register(username,password).subscribe(data =>{
		if (this.registerService.loggedIn()) {
			this.router.navigate(['/'])
		} else {
			this.errorOccured = data['error']
		}	
	});
  }

}
