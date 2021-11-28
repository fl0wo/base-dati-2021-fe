import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import {Observable} from "rxjs";

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
    const headers = new Headers;
    headers.set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get<any[]>(this.REST_API_SERVER + '/users', this.httpOptions);
  }

}
