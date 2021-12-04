import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "../models/User";
import {MessageReponse} from "../models/MessageResponse";
import {map, Observable} from "rxjs";
import {Slot} from "../models/Slot";
import {Response} from "../models/Response";
import {Lesson} from "../models/Lesson";
import {Subscription} from "../models/Subscription";
import {Returnable} from "../models/Returnable";

const STORAGE_USER_TOKEN_KEY = 'user.token';
const STORAGE_USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'x-access-token': 'authkey'
    })
  };

  private LOCAL_HOST = "http://localhost:5000";
  private REST_API_SERVER = "http://vps-487579d2.vps.ovh.net:5000";

  constructor(private httpClient: HttpClient) {}

  public getAllUsers() {
    this.updateToken();
    return this.getMultipleAndMap<User>('/users', this.httpOptions);
  }

  public registerUser(user: User): Observable<MessageReponse> {
    return this.post<MessageReponse>('/register', user.toRestModel(), this.httpOptions);
  }

  public loginUser(user: User): Observable<MessageReponse> {
    let headers = this.httpOptions.headers
      .set("username", user.email)
      .set("password", user.password);

    return this.get<any>('/login', {headers})
      .pipe(map((e) => {
        localStorage.setItem(STORAGE_USER_KEY, JSON.parse(window.atob(e.data.token.split(".")[1])).id);
        localStorage.setItem(STORAGE_USER_TOKEN_KEY, e.data.token);
        return MessageReponse.toMessage(e.data.token);
      }));
  }

  getSlots(): Observable<Slot[]> {
    return this.getMultipleAndMap<Slot>('/slotsReservations', this.httpOptions);
  }

  getMe(): Observable<User> {
    this.updateToken();
    return this.getAndMap<User>('/me', this.httpOptions);
  }

  updateUser(meUpdate: User) {
    this.updateToken();
    const payload = {
      "birth_date" : meUpdate.birth_date,
      "fiscal_code": meUpdate.fiscal_code,
      "phone": meUpdate.phone,
    }
    return this.partialUpdate<MessageReponse>('/me', payload,this.httpOptions);
  }

  makeSlotReservation(idSlot: string) {
    this.updateToken();
    let idUser : string = this.user;
    return this.post<any>('/slots/reservation', {'idSlot': idSlot, 'idUser': idUser}, this.httpOptions);
  }

  getLessons(): Observable<Lesson[]> {
    return this.getMultipleAndMap<Lesson>('/lessonsReservations', this.httpOptions);
  }

  getMySubscription(): Observable<Subscription[]> {
    this.updateToken();
    return this.getMultipleAndMap<Subscription>('/me/subscriptions', this.httpOptions);
  }

  private getMultipleAndMap<T extends Returnable<T>>(url: string, options: { headers: HttpHeaders }) {
    return this.get<T[]>(url, options)
      .pipe(map(response => response.data));
  }

  private getAndMap<T extends Returnable<T>>(url: string, options: { headers: HttpHeaders }) {
    return this.get<T>(url, options)
      .pipe(map(response => response.data));
  }

  private get<T>(url: string, options: { headers: HttpHeaders }) {
    return this.httpClient.get<Response<T>>(this.REST_API_SERVER + url, options);
  }

  private post<T>(url: string, body: any, options: { headers: HttpHeaders }) {
    return this.httpClient.post<Response<T>>(this.REST_API_SERVER + url, body, options);
  }

  private partialUpdate<T>(url: string, body: any, options: { headers: HttpHeaders }) {
    return this.httpClient.patch<Response<T>>(this.REST_API_SERVER + url, body, options);
  }

  get token(): string {
    return localStorage.getItem(STORAGE_USER_TOKEN_KEY) || '';
  }

  get user(): string {
    return localStorage.getItem(STORAGE_USER_KEY) || '';
  }

  public isLogged(): boolean {
    return !!localStorage.getItem(STORAGE_USER_TOKEN_KEY);
  }

  private updateToken() {
    this.httpOptions.headers = this.httpOptions.headers.set("x-access-token", this.token);
  }

}
