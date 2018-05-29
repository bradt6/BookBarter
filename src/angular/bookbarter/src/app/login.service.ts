import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/share'

import { LocalStorage } from './local-storage';

@Injectable()
export class LoginService {
	private apiUrl = 'http://localhost:5000';

	@LocalStorage
	username: string;
	@LocalStorage
	loginToken: string;

	constructor(private http: HttpClient) { }

	login(username, password) {
		let post = this.http.post(`${this.apiUrl}/login`, {'username': username, 'password': password}).share()
		post.subscribe(data => {
			if (data['result'] == true) {
				this.username = username
				this.loginToken = data['token']
			}
		})
		return post
	}

	logout() {
		this.username = '';
		this.loginToken = '';
	}

	register(username, password) {
		let post = this.http.post(`${this.apiUrl}/register`, {'username': username, 'password': password}).share()
		post.subscribe(data => {
			if (data['result'] == true) {
				this.username = username
				this.loginToken = data['token']
			}
		})
		return post
	}

	loggedIn() {
		return this.loginToken !== ''
	}
}
