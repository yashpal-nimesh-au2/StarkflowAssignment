import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(private service: ServiceService, private router: Router, private Auth: AuthService) { }


  isSignIn = false;
  isSignUp = true;
  name = "";
  email = "";
  password = "";
  confirmPassword = "";
  emailError = false;
  passwordError = false;
  emailNewError = false;
  regSuccess = false;
  signSuccess = false;
  isForgot = false;
  isShowForgot = true;
  nameErrors = false;
  emailErrors = false;
  passwordErrors = false
  confirmPasswordErrors = false;
  validEmailError = false;
  matchPasswordError = false;
  isReset=false;



  handleSignUp() {
    this.emailError = false;
    this.passwordError = false;
    this.isSignIn = true;
    this.isSignUp = false;
    this.regSuccess = false;
    this.signSuccess = false;
    this.isForgot = false;
    this.isShowForgot = false;
    this.email = "";
    this.password = "";
    this.nameErrors = false;
    this.emailErrors = false;
    this.passwordErrors = false;
    this.confirmPasswordErrors = false;
    this.validEmailError = false;
    this.emailNewError = false;


  }

  handleSignIn() {
    this.emailError = false;
    this.passwordError = false;
    this.isSignUp = true;
    this.isSignIn = false;
    this.regSuccess = false;
    this.signSuccess = false;
    this.isForgot = false;
    this.isShowForgot = true;
    this.email = "";
    this.password = "";
    this.nameErrors = false;
    this.emailErrors = false;
    this.passwordErrors = false;
    this.confirmPasswordErrors = false;
    this.validEmailError = false;
    this.emailNewError = false;




  }

  onForgot() {

    this.isForgot = true;
    this.isShowForgot = false;
    this.isSignIn = false;
    this.isSignUp = false;
    this.email = "";
    this.password = "";
    this.nameErrors = false;
    this.emailErrors = false;
    this.passwordErrors = false;
    this.confirmPasswordErrors = false;
    this.validEmailError = false;
    this.emailNewError = false;



  }

  onInputName(event: any) {

    if (event === "" || event === undefined || event === null) {
      this.nameErrors = true;

    }
    else {

      this.name = event;
      this.nameErrors = false;

    }


  }

  onInputEmail(event: any) {

    this.emailError = false;

    if (event === "" || event === undefined || event === null) {
      this.emailErrors = true;
      this.validEmailError = false;


    }
    else {

      this.email = event;
      this.emailErrors = false;

      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event)) {

        this.validEmailError = false;


      }


    }




  }

  onInputPassword(event: any) {

    this.passwordError=false;


    if (event === "" || event === undefined || event === null) {
      this.passwordErrors = true;

    }
    else {

      this.password = event;

      this.passwordErrors = false;

    }



  }

  onSignIn() {


    let saveData = true;


    if (this.email === "" || this.email === undefined || this.email === null) {

      this.emailErrors = true;
      saveData = false;



    }

    else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))) {

      this.validEmailError = true;
      saveData = false;


    }


    if (this.password === "" || this.password === undefined || this.password === null) {

      this.passwordErrors = true;

      saveData = false;


    }

    if (saveData) {
      this.emailErrors = false;
      this.passwordErrors = false;
      this.validEmailError = false;


      let obj = {
        email: this.email,
        password: this.password
      }

      this.service.verifyUser(obj)
        .subscribe(data => {
          if (data === 1) {

            this.emailError = true;

          }
          else if (data === 2) {
            this.emailError = false;
            this.passwordError = true;


          }
          else {


            this.emailError = false;
            this.passwordError = false;
            this.signSuccess = true;

            this.router.navigate(['main']);
            this.Auth.setLoggedIn(true);

            let userData = { name: data[0].name, email: data[0].email }

            localStorage.setItem("userData", JSON.stringify(userData));

            this.Auth.setLoggedInData(userData);



          }
        })


    }



  }

  onSignUp() {

    let saveData = true;

    if (this.name === "" || this.name === undefined || this.name === null) {

      this.nameErrors = true;
      saveData = false;

    }

    if (this.email === "" || this.email === undefined || this.email === null) {

      this.emailErrors = true;
      saveData = false;



    }

    else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))) {
      this.validEmailError = true;
      saveData = false;


    }



    if (this.password === "" || this.password === undefined || this.password === null) {

      this.passwordErrors = true;

      saveData = false;


    }
    if (saveData) {
      this.nameErrors = false;
      this.emailErrors = false;
      this.passwordErrors = false;
      this.validEmailError = false;


      let obj = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      this.service.addUser(obj)
        .subscribe(data => {

          if (data) {

            this.emailNewError = true;

          }
          else {

            this.emailNewError = false;

            this.regSuccess = true;


          }


        })





    }

  }


  onInputConfirmPassword(event) {

    if (event === "" || event === undefined || event === null) {
      this.confirmPasswordErrors = true;

    }
    else {

      this.confirmPassword = event;


      this.confirmPasswordErrors = false;

    }

  }

  onResetPassword() {

    let saveData = true;


    if (this.email === "" || this.email === undefined || this.email === null) {

      this.emailErrors = true;
      saveData = false;




    }

    else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))) {
      this.validEmailError = true;
      saveData = false;


    }


    if (this.password === "" || this.password === undefined || this.password === null) {

      this.passwordErrors = true;

      saveData = false;


    }

    if (this.confirmPassword === "" || this.confirmPassword === undefined || this.confirmPassword === null) {

      this.confirmPasswordErrors = true;

      saveData = false;


    }
    if (saveData) {

      let obj = {
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      }


      this.service.verifyUser(obj)
        .subscribe(data => {
          if (data === 1) {

            this.emailError = true;

          }

          else {

            if (this.password === this.confirmPassword) {

              this.matchPasswordError = false;


              this.service.forgotPassword(obj)

              this.isReset=true;


            }
            else {

              this.matchPasswordError = true;

            }

          }

        })







    }




  }



}
