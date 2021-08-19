import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {
  private BASE_URL!:string;

  constructor(private http: HttpClient) {
    this.BASE_URL='http://localhost:8080';

   }
   
   public getFormateurNames(){
    return this.http.get<string[]>(`${this.BASE_URL}/api/v1/formateur/names`);
  }
}
