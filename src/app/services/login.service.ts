import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient) { }

  doLogin(username : string , password : string) : Observable<any>{
    let loginUrl = "http://localhost:8080/user/login";
    let loginRequest = { "userName" : username , "password" : password};
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(loginUrl,loginRequest,httpOptions);
  }

  register(username : string , password : string, email: string) : Observable<any>{
    let loginUrl = "http://localhost:8080/user/register";
    let loginRequest = { "userName" : username , "password" : password,"email": email};
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(loginUrl,loginRequest,httpOptions);
  }

  authorizeLogin(){
    let url =  "http://localhost:8080/user/authorizeUser";
    return this.http.get<any>(url).toPromise<any>();
  }


}
