import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
/*
  formationApi :string =  "http://localhost:8080/api/v1/group";

  constructor(private http : HttpClient) { }
  
  getGroups() : Observable<any[]>{
    return this.http.get<any[]>(this.formationApi);
  }
  getGroupById(id : number) : Observable<IGroup[]>{
    return this.http.get<any[]>(`${this.formationApi}/${id}`);
  }
  
  getGroupsNames() : Observable<string[]>{
    return this.http.get<string[]>(`${this.formationApi}/getGroupeNames`)
  }
  groupExist(group : string): Observable<boolean>{
    return this.http.get<boolean>(`${this.formationApi}/checkgroup/${group}`)
  } 
  createGroup(group : ReqGroup){
      this.http.post<any>(this.formationApi, group).subscribe(
        next=> console.log(next)
      );

  }
*/
}
