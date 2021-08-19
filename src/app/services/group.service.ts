import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGroup } from '../pages/group/groups/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  groupApi :string =  "http://localhost:8080/api/v1/group";
  constructor(private http : HttpClient) { }
  
  getGroups() : Observable<IGroup[]>{
    return this.http.get<IGroup[]>(this.groupApi);
  }
  getGroupById(id : number) : Observable<IGroup[]>{
    return this.http.get<IGroup[]>(`${this.groupApi}/${id}`);
  }
  
  getGroupsNames() : Observable<string[]>{
    return this.http.get<string[]>(`${this.groupApi}/getGroupeNames`)
  }
  
}
