import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utilisateur } from 'src/app/models/Utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private BASE_URL!:string;

  constructor(private http: HttpClient) {
    this.BASE_URL='http://localhost:8080/api/v1';

   }
   public login(user : Utilisateur){

    return this.http.put<Utilisateur>(`${this.BASE_URL}/login`,user)

   }
}
