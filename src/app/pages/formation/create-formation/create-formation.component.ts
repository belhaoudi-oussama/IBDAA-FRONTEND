import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { CreateSessionsComponent } from './create-sessions/create-sessions.component';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { NzTabPosition } from 'ng-zorro-antd/tabs';
import { ISession } from './session';
import { SessionManagementService } from './session-management.service'
import { Sceance } from '../../group/groups/Sceance';

@Component({
  selector: 'app-create-formation',
  templateUrl: './create-formation.component.html',
  styleUrls: ['./create-formation.component.css']
})
export class CreateFormationComponent implements OnInit {
  formationForm!: FormGroup;
  searchValue = '';
  visible = false;
  nzTabPosition: NzTabPosition = 'left';
  selectedIndex = 0;
  listOfData: Sceance[] = [];
  currentDeration : number = 0;

  listOfDisplayData = [...this.listOfData];

  constructor( private fb: FormBuilder ,private drawerService: NzDrawerService , private sessionService : SessionManagementService) { 
    
  }

  groupNameValidator = (control: FormControl) =>
  new Observable((observer: Observer<ValidationErrors | null>) => {
    setTimeout(() => {
      if (control.value === 'G1' || control.value === 'G2' || control.value === 'G3') {
        // you have to return `{error: true}` to mark it as an error event
        observer.next({ error: true, duplicated: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    }, 1000);
  });
  ngOnInit(): void {
    this.formationForm = this.fb.group({
      search : [''],
      name: ['', [Validators.required],[this.groupNameValidator]],
      type : ['pre'],
      status : ['open'],
      deration : [this.currentDeration,[Validators.required]],
      description: ['', [Validators.required]]
    });
    this.sessionService.sessionList$.subscribe(
      data => {
        this.listOfData = data
        this.listOfDisplayData = [...this.listOfData];
        this.currentDeration = this.sessionService.deration;
        console.log(this.sessionService.deration)
      }
    )
  }
  submitForm(value: { groupName: string; description: string; search: string;}): void {
    for (const key in this.formationForm.controls) {
      if (this.formationForm.controls.hasOwnProperty(key)) {
        this.formationForm.controls[key].markAsDirty();
        this.formationForm.controls[key].updateValueAndValidity();
      }
    }
  }

  openCreateGroupComponent(): void {
    this.drawerService.create<CreateSessionsComponent, { value: number }, string>({
    nzTitle: 'Create New Sessions',
    nzContent: CreateSessionsComponent,
    nzMaskClosable:false,
    nzWidth : "50%",
    nzContentParams: {
      value : this.formationForm.value.deration
    }
  });
}

reset(): void {
  this.searchValue = '';
  this.search();
}

search(): void {
  this.visible = false;
  this.listOfDisplayData = this.listOfData.filter((item: Sceance) => item.nom.indexOf(this.searchValue) !== -1);
}

}
