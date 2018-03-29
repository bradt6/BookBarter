import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

	constructor(private http: HttpClient,
				private fb: FormBuilder) { }

	ngOnInit() {
		this.userForm = this.fb.group({
			username: ['', [Validators.required, Validators.maxLength(20)]],
			password: ['', Validators.required]
		})
	}

	onSubmit() {
		this.http.post('http://localhost:5000/login', this.userForm.value).subscribe(response => {
			console.log(response)	
		});
	}

}
