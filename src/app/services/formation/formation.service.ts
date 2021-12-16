import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFormation } from 'src/app/pages/formation/formations/IFormation';
import { ReqFormation } from 'src/app/pages/formation/formations/ReqFormation';
import { ReqGroup } from 'src/app/pages/group/groups/create-group/reqGroup';
import { Sceance } from 'src/app/pages/group/groups/Sceance';


export interface ReqSceance {
  nom:string,
  dateTimeDebut:string,
  dateTimeFin:string,
  sceanceFormateur:string,
  groupe : ReqGroup ,
  formation? : ReqFormation;
}

function convFormation(foramtion :IFormation): ReqFormation{
    return {
      id : foramtion.id,
      nom : foramtion.name,
      description : foramtion.descreption,
      duree : foramtion.duration,
      etat : foramtion.state,
      type : foramtion.type,
      formationSceances : foramtion.formationSceances
    }
}
function mapFormation(formation :ReqFormation[]): IFormation[]{
  return formation.map((formation : ReqFormation)=>{
    let newFormation : IFormation = {
      id : formation.id ? formation.id : -1,
      name : formation.nom,
      descreption : formation.description,
      duration : formation.duree,
      state : formation.etat,
      type : formation.type,
      formationSceances : formation.formationSceances,
    };
    return newFormation;
  })
}


@Injectable({
  providedIn: 'root'
})
export class FormationService {

  proxy : string = "/api/";
  formationApi : string = "formation";
  sessionApi : string = "sceance";

  constructor(private http : HttpClient) { }

  createFormation(formation : IFormation){
    console.log(formation)
    this.http.post<any>(this.proxy + this.formationApi, convFormation(formation)).subscribe();
  }
  getFormation() : Observable<IFormation[]>{
    return this.http.get<any[]>(this.proxy+this.formationApi).pipe(
      map( (formations : ReqFormation[])=>{
        return mapFormation(formations);
      })
    )
  }
  getFormationSession(id : string | null) : Observable<any>{
    return this.http.get<any>(this.proxy+this.formationApi+"/session/"+id)
    
  }
  getGroupName(id : any): Observable<ReqGroup>{
    return this.http.get<any>(this.proxy+this.formationApi+"/gp/"+id)
  }
  getSession() : Observable<Sceance[]>{
    return this.http.get<any[]>(this.proxy+this.sessionApi)
    
  }

/*
  formationApi :string =  "http://localhost:8080/api/v1/group";

  
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
fillcandidate(){
  for (let index = 0; index < 10; index++) {
    let c : any = {};
    c.cin = `EE75278${index}`;
    c.nom = `candidate-${index}`;
    c.prenom = `lastname-${index}`;
    c.email = `${c.nom}@gmail.com`;
    c.adresse =`adresse-${index}`;
    c.telephone = `065236553${index}`;
    this.http.post<any>(this.proxy + "formateur", c).subscribe();
    
  }
}
}
