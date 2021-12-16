import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICandidate } from '../pages/group/groups/candidate';
import { ReqCandidate } from '../pages/group/groups/create-group/reqCandidate';
import { ReqGroup } from '../pages/group/groups/create-group/reqGroup';
import { candidate } from '../pages/group/groups/data';
import { IGroup } from '../pages/group/groups/group';


function mapCandidate(candidates : ReqCandidate[]) : ICandidate[]{
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
    newCandidate.groupe = candidate.groupe;
    return newCandidate
  });
}

function mapGroup(groups :ReqGroup[]): IGroup[]{
  return groups.map((group : ReqGroup)=>{
    let newGroup : IGroup = {
      id : group.id ? group.id : -1,
      name : group.nom,
      description : group.description,
      candidates : mapCandidate(group.candidats),
      sessions : group.sceances,
    };
    return newGroup;
  })
}

@Injectable({
  providedIn: 'root'
})



export class GroupService {
  groupApi :string =  "group";
  candidateApi :string =  "candidat";
  proxy : string = "/api/";
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  constructor(private http : HttpClient) { }
  
  getGroups() : Observable<IGroup[]>{
    return this.http.get<any[]>(this.proxy+this.groupApi).pipe(
      map( (groups : ReqGroup[])=>{
        return mapGroup(groups);
      })
    )
  }
  getGroupById(id : number) : Observable<ReqGroup>{
    return this.http.get<ReqGroup>(`${this.proxy+ this.groupApi}/id/${id}`);
  }
  
  getGroupsNames(name : String) : Observable<IGroup>{
    return this.http.get<any>(`${this.proxy + this.groupApi}/name/${name}`).pipe(
      map( (group : ReqGroup)=>{
        return {
          id : group.id ? group.id : -1,
          name : group.nom,
          description : group.description,
          candidates : mapCandidate(group.candidats),
          sessions : group.sceances,
        };
      })
    )
  }
  groupExist(group : string): Observable<boolean>{
    return this.http.get<boolean>(`${this.proxy + this.groupApi}/checkgroup/${group}`)
  } 
  createGroup(group : ReqGroup){
    this.http.post<any>(this.proxy + this.groupApi, group).subscribe();
  }
  editGroup(group : ReqGroup){
    group.sceances=null;
    this.http.put<any>(`${this.proxy + this.groupApi}`,  group).subscribe();
  }
  deleteGroup(group : ReqGroup){
    this.http.delete<any>(`${this.proxy + this.groupApi}`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: group
    }).subscribe();
  }
  searchCandidate(name : string): Observable<ICandidate[]>{
    return this.http.get<ReqCandidate[]>(`${this.proxy + this.candidateApi}/name/${name}`).pipe(
      map( (candidates : ReqCandidate[])=>{
        return mapCandidate(candidates);
      })
    )
  }
  
  /*fillcandidate(){
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
      
    }*/
    
  
}
