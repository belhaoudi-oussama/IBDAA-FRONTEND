import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICandidate } from '../pages/group/groups/candidate';
import { ReqCandidate } from '../pages/group/groups/create-group/reqCandidate';
import { ReqGroup } from '../pages/group/groups/create-group/reqGroup';
import { candidate } from '../pages/group/groups/data';
import { IGroup } from '../pages/group/groups/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  groupApi :string =  "http://localhost:8080/api/v1/group";
  candidateApi :string =  "http://localhost:8080/api/v1/candidat";
  constructor(private http : HttpClient) { }
  
  getGroups() : Observable<any[]>{
    return this.http.get<any[]>(this.groupApi);
  }
  getGroupById(id : number) : Observable<IGroup[]>{
    return this.http.get<IGroup[]>(`${this.groupApi}/${id}`);
  }
  
  getGroupsNames() : Observable<string[]>{
    return this.http.get<string[]>(`${this.groupApi}/getGroupeNames`)
  }
  groupExist(group : string): Observable<boolean>{
    return this.http.get<boolean>(`${this.groupApi}/checkgroup/${group}`)
  } 
  createGroup(group : ReqGroup){
      this.http.post<any>(this.groupApi, group).subscribe();

  }
  searchCandidate(name : string): Observable<ICandidate[]>{
    return this.http.get<ReqCandidate[]>(`${this.candidateApi}/name/${name}`).pipe(
     
      map( (candidates : ReqCandidate[])=>{
        return candidates.map((candidate : ReqCandidate) => {
          let newCandidate : ICandidate = {};
          newCandidate.id = candidate.id;
          newCandidate.CIN = candidate.cin;
          newCandidate.firtName = candidate.nom;
          newCandidate.lastName = candidate.prenom;
          newCandidate.email = candidate.email;
          newCandidate.type = candidate.type;
          newCandidate.adresse = candidate.adresse;
          newCandidate.phone = candidate.telephone;
          newCandidate.formationsCandidat = candidate.formationsCandidat;
          newCandidate.groupe = candidate.groupe;
          return newCandidate
         });

      })
    )
  }
  
  fillcandidate(){
    for (let index = 0; index < 10; index++) {
      let c : ReqCandidate = {};
      c.cin = `EE75278${index}`;
      c.nom = `candidate-${index}`;
      c.prenom = `lastname-${index}`;
      c.email = `${c.nom}@gmail.com`;
      c.type = `post`;
      c.adresse =`adresse-${index}`;
      c.telephone = `065236553${index}`;
      this.http.post<any>(this.candidateApi, c).subscribe(
        next=> console.log(next)
        );
      }
      
    }
    
  
}
