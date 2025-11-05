import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ApiService {
 
  constructor(private readonly httpClient: HttpClient) {}
 
  private apiGatewayHost: string = 'http://localhost:8080';
 
  get<T>(resource: string,  options?: object): Observable<T> {
    return this.httpClient.get<T>(`${this.apiGatewayHost}${resource}`, options);
  }
 
  post<T>(resource: string, body: any, options?: object): Observable<T> {
    return this.httpClient.post<T>(`${this.apiGatewayHost}${resource}`, body, options);
  }
 
  put<T>(resource: string, body: any, options?: object): Observable<T> {
    return this.httpClient.put<T>(`${this.apiGatewayHost}${resource}`, body, options);
  }
 
  delete<T>(resource: string, options?: object): Observable<T> {
    return this.httpClient.delete<T>(`${this.apiGatewayHost}${resource}`, options);
  }
 
}