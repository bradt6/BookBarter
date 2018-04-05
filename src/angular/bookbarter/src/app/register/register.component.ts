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
  errorOccured = false;

  constructor(private router: Router, private registerService: LoginService, private fb: FormBuilder){

  }

  ngOnInit() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', Validators.required]
    })
  }

  onSubmit(){
    let username = this.userForm.value.username;
    let password = this.userForm.value.password;
    this.registerService.register(username,password).subscribe (() =>{
      this.router.navigate(['/'])
     }
    )
  }

}
