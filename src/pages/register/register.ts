import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginService } from '../../providers/login-service';
import { FormControl, FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { UserNoPwd } from '../../models/user-nopwd.interface';
import 'rxjs/add/operator/catch';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

	private username: string;
	private password: string;
	private phone: string;
	private cep: string;
	private name: string;
	private lastName: string;
  private user: UserNoPwd;
  private type: string;

  private validationMsgs = {
  	'email': [
  		{type: 'required', message: 'Preencha um E-mail'},
  		{type: 'minlength', message: 'Minimo de 4 caracteres'},
  		{type: 'maxlength', message: 'Maximo de 30 caracteres'},
  		{type: 'exists', message: 'E-mail ja cadastrado'},
  		{type: 'pattern', message: 'E-mail invalido'}
  	],
  	'password': [
  		{type: 'required', message: 'Preencha uma senha'},
  		{type: 'minlength', message: 'Minimo 6 caracteres'},
  		{type: 'maxlength', message: 'Maximo 30 caracteres'},
  	],
  	'phone': [
  		{type: 'required', message: 'Preencha um numero de telefone'}
  	],
  	'cep': [
  		{type: 'required', message: 'Preencha um CEP valido'},
  		{type: 'pattern', message: 'Preencha um CEP valido'}
  	],
  	'name': [
  		{type: 'required', message: 'Preencha um nome'},
  		{type: 'minlength', message: 'Minimo 1 caracteres'},
  		{type: 'maxlength', message: 'Maximo 30 caracteres'},
  		{type: 'pattern', message: 'Preencha um nome valido'}
  	],
  	'lastName': [
  		{type: 'required', message: 'Preencha um sobrenome'},
  		{type: 'minlength', message: 'Minimo 1 caracteres'},
  		{type: 'maxlength', message: 'Maximo 30 caracteres'},
  		{type: 'pattern', message: 'Preencha um sobrenome valido'}
  	] 
  };

  private errors = [
  	{name: 'email', cond: false, message: ''},
  	{name: 'password', cond: false, message: ''},
  	{name: 'phone', cond: false, message: ''},
  	{name: 'cep', cond: false, message: ''},
  	{name: 'name', cond: false, message: ''},
  	{name: 'lastName', cond: false, message: ''}
  ]; 

  private emailPattern: string = '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$';
  private cepPattern: string = '[0-9]+-[0-9]+';
  private namePattern: string = '[a-zA-Z]+[\ ]*[a-zA-Z]+';
  private loginFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private login: LoginService) {
  	this.loginFormGroup = formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern(this.emailPattern), Validators.required])],
      password: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(6), Validators.required])],
      phone: [''],
      cep: [''],
      name: [''],
      lastName: ['']
    });
    console.log(this.errors);
  }

  getMsg(name, error){
  	if( name == 'email'){
  		return this.validationMsgs.email.filter(data => data.type == error )[0].message;
  	}
  	else if( name == 'password'){
  		return this.validationMsgs.password.filter(data => data.type == error )[0].message;
  	}
  	else if( name == 'phone'){
  		return this.validationMsgs.phone.filter(data => data.type == error )[0].message;
  	}
  	else if( name == 'cep'){
  		return this.validationMsgs.cep.filter(data => data.type == error )[0].message;
  	}
  	else if( name == 'name'){
  		return this.validationMsgs.name.filter(data => data.type == error )[0].message;
  	}
  	else if( name == 'lastName'){
  		return this.validationMsgs.lastName.filter(data => data.type == error )[0].message;
  	}
  }

  getFormValidationErrors() {
	  Object.keys(this.loginFormGroup.controls).forEach(key => {

		  const controlErrors: ValidationErrors = this.loginFormGroup.get(key).errors;
		  if (controlErrors != null) {
		        Object.keys(controlErrors).forEach(keyError => {
		        	console.log(keyError);
		        	let error = this.errors.filter(data => data.name == key)[0];
		        	if( !error.cond ){
			        	error.cond = true;
			        	error.message = this.getMsg(key, keyError);
		        	}
		        });
		      }
	    });
  }

  setAllErrors(condition){
  	this.errors.forEach(element => {
  		element.cond = condition;
  	});
  }

	register(){
		this.setAllErrors(false);
		this.getFormValidationErrors();
	}  

}
