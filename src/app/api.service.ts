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
import {Course} from "../models/Course";

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
  private REST_API_SERVER = this.LOCAL_HOST; //"http://vps-487579d2.vps.ovh.net:5000";

  constructor(private httpClient: HttpClient) {}

  public getAllUsers() {
    this.updateToken();
    return this.getMultipleAndMap<User>('/users', this.httpOptions);
  }

  public registerUser(user: User): Observable<MessageReponse> {
    return this.post<any>('/register', user.toRestModel(), this.httpOptions)
      .pipe(map((e) => {
        if (e.status==200) {
          return MessageReponse.toMessage(e.data.token).withStatus(200);
        }
        return MessageReponse.toMessage(e.message).withStatus(400);
      }));
  }

  public loginUser(user: User): Observable<MessageReponse> {
    let headers = this.httpOptions.headers
      .set("username", user.email)
      .set("password", user.password);

    return this
      .get<any>('/login', {headers})
      .pipe(map((e) => {
        if (e.status==200) {
          localStorage.setItem(STORAGE_USER_KEY, JSON.parse(window.atob(e.data.token.split(".")[1])).id);
          localStorage.setItem(STORAGE_USER_TOKEN_KEY, e.data.token);
          return MessageReponse.toMessage(e.data.token).withStatus(200);
        }
        return MessageReponse.toMessage(e.message).withStatus(400);
      }));
  }

  getSlots(): Observable<Slot[]> {
    return this.getMultipleAndMap<Slot>('/slots/reservations', this.httpOptions);
  }

  getMe(): Observable<User> {
    this.updateToken();
    return this.getAndMap<User>('/me', this.httpOptions);
  }

  updateUser(meUpdate: User) {
    this.updateToken();

    function date2String(dateStr: any) {
      let date = new Date(dateStr);
      return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
    }

    const payload = {
      "birth_date" : date2String(meUpdate.birth_date),
      "fiscal_code": meUpdate.fiscal_code,
      "phone": meUpdate.phone,
    }
    return this.post<MessageReponse>('/me', payload,this.httpOptions);
  }


  addSlot(newSlot: any) {
    this.updateToken();
    return this.post<MessageReponse>('/slots/add', newSlot, this.httpOptions);
  }

  makeSlotReservation(idSlot: string) {
    this.updateToken();
    let idUser : string = this.user;
    return this.post<any>('/slots/reservation', {'idSlot': idSlot, 'idUser': idUser}, this.httpOptions);
  }

  updateProfilePic(formData: FormData) {
    this.updateToken();
    return this.httpClient
      .post<Response<MessageReponse>>(this.REST_API_SERVER + '/me/profilepic',
        formData, this.httpOptions);
  }

  getProfilePic():Observable<Blob> {
    this.updateToken();
    let headers = this.httpOptions.headers;

    return this.httpClient
      .get(this.REST_API_SERVER + '/me/profilepic',{
        headers : headers,
        responseType: 'blob'
      });
  }

  getLessons(): Observable<Lesson[]> {
    return this.getMultipleAndMap<Lesson>('/lessons/reservations', this.httpOptions);
  }

  getMySubscription(): Observable<Subscription[]> {
    this.updateToken();
    return this.getMultipleAndMap<Subscription>('/me/reservations', this.httpOptions);
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

  public getCourses(): Observable<Course[]> {
    this.updateToken()
    return this.getMultipleAndMap<Course>('/courses/all', this.httpOptions);
  }

  addLesson(newLesson: any) {
      this.updateToken();
      return this.post<MessageReponse>('/lessons/add', newLesson, this.httpOptions);
  }
}
