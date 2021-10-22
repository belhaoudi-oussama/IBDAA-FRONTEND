import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Sceance } from '../../group/groups/Sceance';
import { ISession } from './session';

@Injectable({
  providedIn: 'root'
})
export class SessionManagementService {
  private sessionList = new Subject<Sceance[]>();
  private sessionListRecord : Sceance[]= [];
  sessionList$ = this.sessionList.asObservable();
  deration : number = 0;
  constructor() { 

  }
  addSessions(sessions : Sceance[]){
    this.sessionListRecord = this.sessionListRecord.concat(sessions)
    this.calculateDeration();
    this.sessionList.next(this.sessionListRecord);
  }

  public updateSessionList(sessions : Sceance[]) {
    this.sessionListRecord = sessions;
    this.calculateDeration();
    this.sessionList.next(sessions);
  }

  calculateDeration(){
    let duration =0;
    this.sessionListRecord.forEach( x => {
      let start = new Date(x.dateTimeDebut);
      let end = new Date(x.dateTimeFin);
      duration = duration + (end.getTime() - start.getTime());
    });
    this.deration = duration / (1000 * 3600);
  }
}
