import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { CreateSessionsComponent } from './create-sessions/create-sessions.component';

@Component({
  selector: 'app-create-formation',
  templateUrl: './create-formation.component.html',
  styleUrls: ['./create-formation.component.css']
})
export class CreateFormationComponent implements OnInit {

  constructor(private drawerService: NzDrawerService) { }

  ngOnInit(): void {

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
