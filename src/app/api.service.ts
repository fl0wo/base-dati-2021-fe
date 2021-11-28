import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from "../models/user";
import {MessageReponse, TokenResponse} from "../models/reponse";
import {catchError, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

   httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Authorization':'authkey'
    })
  };

  private REST_API_SERVER = "http://vps-487579d2.vps.ovh.net:5000";

  constructor(private httpClient: HttpClient) { }

  public getAllUsers(){
    return this.httpClient.get<any[]>(this.REST_API_SERVER + '/users', this.httpOptions);
  }

  public registerUser(user : User) : Observable<MessageReponse> {
    return this.httpClient.post<MessageReponse>(this.REST_API_SERVER + '/register', user.toRestModel(), this.httpOptions);
  }

  public loginUser(user : User) : Observable<MessageReponse> {
    let headers = this.httpOptions.headers
      .set("username", user.email)
      .set("password", user.password);

    return this.httpClient.get<TokenResponse>(this.REST_API_SERVER + '/login', {headers}).pipe(
      map((e) => MessageReponse.toMessage(e.token))
    );
  }
}
