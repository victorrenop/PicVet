import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginService } from '../../providers/login-service';
import { FormControl, FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
	selector: 'page-register',
	templateUrl: 'register.html',
})
export class RegisterPage {

	private userData = {};

	public error = false;
	public errorText: string;


	private emailPattern: string = '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$';
	private cpfPattern: string = '[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}';
	private registerFormGroup: FormGroup;
	private observable: Observable<any>;

	constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private login: LoginService) {
		this.BuildFormGroup();
	}

	Register() {

		if (this.registerFormGroup.hasError) {
			this.BuildErrorMessage();
			return;
		}

		this.observable = this.login.CreateUser(this.userData);

		this.observable.subscribe((value) => {
			let jsonResponse = JSON.parse(value);

			if(jsonResponse.id)
			{
				this.navCtrl.push('LoginPage');
			}else
			{
				this.BuildErrorCreateMessage();
			}
		});
	}

	BuildErrorMessage() {
		this.error = true;
		this.errorText = 'Preencha todos os campos corretamente'
	}

	BuildErrorCreateMessage() {
		this.error = true;
		this.errorText = 'Um erro inesperado aconteceu ao criar o usuário'
	}

	BuildFormGroup() {
		this.registerFormGroup = this.formBuilder.group({
			email: ['', Validators.compose([Validators.maxLength(300), Validators.pattern(this.emailPattern), Validators.required])],
			password: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(6), Validators.required])],
			name: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(300)])],
			cpf: ['', Validators.compose([Validators.pattern(this.cpfPattern)])]
		});
	}

}
