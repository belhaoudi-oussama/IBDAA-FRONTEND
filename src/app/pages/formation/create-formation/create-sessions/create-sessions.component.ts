import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-sessions',
  templateUrl: './create-sessions.component.html',
  styleUrls: ['./create-sessions.component.css']
})
export class CreateSessionsComponent implements OnInit {
  mediaSub: Subscription;
  activeMedia: string='';

  constructor(private drawerRef: NzDrawerRef<string> ,public mediaObserver : MediaObserver) { 
    this.mediaSub = this.mediaObserver.asObservable().subscribe((res:MediaChange[]) => {
      this.activeMedia=res[0].mqAlias;
      if(this.activeMedia == 'xs'){
        this.drawerRef.nzPlacement ='bottom';
        this.drawerRef.nzHeight = "90%";
        this.drawerRef.nzWidth ="100%"
      }else{
        this.drawerRef.nzPlacement = 'right';
        this.drawerRef.nzHeight = "100%";
        this.drawerRef.nzWidth ="50%"
      }
      
    })
  }

  ngOnInit(): void {
  }

}
