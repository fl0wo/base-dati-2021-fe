import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {User} from "../models/user";
import {MessageReponse, TokenResponse} from "../models/reponse";
import {catchError, map, Observable, throwError} from "rxjs";
import {Slot} from "../models/Slot";
import {ISlot} from "../models/ISlot";
import {IResponse} from "../models/Response";


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
  private LOCAL_HOST = "http://localhost:5000"

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


  private _objToModel(obj: ISlot): Slot {
    return new Slot(obj.id, obj.date, obj.time_from, obj.time_to, obj.max_capacity, obj.current_reservations);
  }

  private _objsToModels(objs: ISlot[]): Slot[] {
    return objs.map(u => this._objToModel(u));
  }
  /* GET heroes whose name contains search term */
  getSlots() : Observable<Slot[]>{
    return this.httpClient.get<IResponse>(this.REST_API_SERVER + '/slotsReservations').pipe(
      map(response => this._objsToModels(response.data))
    );
  }

}
