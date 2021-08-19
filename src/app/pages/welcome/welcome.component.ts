import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { CreateSessionsComponent } from '../formation/create-formation/create-sessions/create-sessions.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private drawerService: NzDrawerService) { }

  ngOnInit() {
  }

  openCreateGroupComponent(): void {
    this.drawerService.create<CreateSessionsComponent, { value: number | null }, string>({
    nzTitle: 'Create New Sessions',
    nzContent: CreateSessionsComponent,
    nzMaskClosable:false,
    nzWidth : "50%",
    nzContentParams: {
      value : null
    }
  });
}
}
