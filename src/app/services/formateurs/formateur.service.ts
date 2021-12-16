import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {
  proxy : string = "/api/";
  formationApi : string = "formateur";

  constructor(private http: HttpClient) {
   }
   
   public getFormateurNames(){
    return this.http.get<any[]>(this.proxy+this.formationApi);
  }
}
