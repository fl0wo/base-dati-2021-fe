import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from "../models/user";
import {MessageReponse} from "../models/reponse";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

   httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Authorization':'authkey',
      'userid':'1'
    })
  };

  private REST_API_SERVER = "http://vps-487579d2.vps.ovh.net:5000";

  constructor(private httpClient: HttpClient) { }

  public getAllUsers(){
    return this.httpClient.get<any[]>(this.REST_API_SERVER + '/users', this.httpOptions);
  }

  public registerUser(user : User){
    return this.httpClient.post<MessageReponse>(this.REST_API_SERVER + '/register', user.toRestModel(), this.httpOptions);
  }

}
