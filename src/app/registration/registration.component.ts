import { Component, OnInit } from '@angular/core';
import { LoginService } from './../services/login.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public username: string = ""
  public email: string = ""
  public password: string = ""
  public validationMessage: string = ""
  public isValid: boolean = true;

  constructor(private loginService: LoginService,private router : Router, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  register() {
    this.isValid = this.validateFields();
    if (this.isValid) {
      this.loginService.register(this.username, this.password,this.email).subscribe(result => {
          if(result.code != undefined && result.code === "103"){
            this.messageService.add({ severity: 'success', summary: 'Registration Successful!' });
            setTimeout(() => {
              this.router.navigateByUrl("login");
            }, 1000);
          }
          else if (result.code != undefined && result.code === "101"){
            this.messageService.add({ severity: 'error', summary: 'User Already Exists' });
            this.username ="";
          }
          else{
            this.isValid = false;
            this.validationMessage = "Registration failed!"
          }
      })
    }
  }

  validateFields(): boolean {
    if (this.username.length == 0) {
      this.validationMessage = "Please fill all the fields";
      return false;
    }
    if (this.password.length == 0) {
      this.validationMessage = "Please fill all the fields";
      return false;
    }

    if (this.email.length == 0) {
      this.validationMessage = "Please fill all the fields";
      return false;
    }

    if (!this.validateEmail(this.email)) {
      this.validationMessage = "Invalid Email-Address";
      return false;
    }
    return true;
  }

  validateEmail(email:string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

}
