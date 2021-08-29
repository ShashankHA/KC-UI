import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string = ""
  public password: string = ""
  public validationMessage: string = ""
  public isValid: boolean = true;

  constructor(private loginService: LoginService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
  }


  doLogin() {
    this.isValid = this.validateFields();
    if (this.isValid) {
      this.loginService.doLogin(this.username, this.password).subscribe(result => {
        if (result.code != undefined && result.code === "103") {
          this.messageService.add({ severity: 'success', summary: 'Login Successful!' });
          setTimeout(() => {
            this.router.navigateByUrl("dashboard");
          }, 1000);
        }
        else {
          this.isValid = false;
          this.validationMessage = "Login failed!"
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
    return true;
  }




}
