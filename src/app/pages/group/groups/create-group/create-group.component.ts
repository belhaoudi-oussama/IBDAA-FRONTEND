import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { Observable, Observer, Subscription } from 'rxjs';
import { GroupService } from 'src/app/services/group.service';
import { ICandidate } from '../candidate';
import { candidate } from '../data';
import { IGroup } from '../group';
import { ReqCandidate } from './reqCandidate';
import { ReqGroup } from './reqGroup';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  @Input() value : number | null = null;
  groupForm!: FormGroup;
  data : ICandidate[] = candidate;
  filteredCadidate : ICandidate[] = [];
  listOfSelectedCandidate : ICandidate[] = [];
  mediaSub: Subscription; 
  activeMedia : string='';
  constructor(private drawerRef: NzDrawerRef<string> , private fb: FormBuilder , public mediaObserver : MediaObserver , private groupService : GroupService ) { 
    this.mediaSub = this.mediaObserver.asObservable().subscribe((res:MediaChange[]) => {
      this.activeMedia=res[0].mqAlias;
      if(this.activeMedia == 'xs'){
        drawerRef.nzPlacement ='bottom';
        drawerRef.nzHeight = "90%";
        drawerRef.nzWidth ="100%"
      }else{
        drawerRef.nzPlacement = 'right';
        drawerRef.nzHeight = "100%";
        drawerRef.nzWidth ="50%"
      }
      
    })
  }
  groupNameValidator = (control: FormControl) =>
  new Observable((observer: Observer<ValidationErrors | null>) => {

    this.groupService.groupExist(control.value).subscribe(
      next=>{
        if(next){
          observer.next({ error: true, duplicated: true })
        }else{
          observer.next(null);
        }
        observer.complete();
    
      }
    )
    /*if (control.value === 'G1' || control.value === 'G2' || control.value === 'G3') {
        // you have to return `{error: true}` to mark it as an error event
        observer.next({ error: true, duplicated: true });
      } else {
        observer.next(null);
      }
      observer.complete();*/
    
  });

  submitForm(value: { groupName: string; description: string; search: string;}): void {
    
    /*for (const key in this.groupForm.controls) {
      if (this.groupForm.controls.hasOwnProperty(key)) {
        this.groupForm.controls[key].markAsDirty();
        this.groupForm.controls[key].updateValueAndValidity();
      }
    }*/
     let candidateList : ReqCandidate[] = this.listOfSelectedCandidate.map((candidate:ICandidate)=>{
      let newCandidate : ReqCandidate = {} ;
      newCandidate.id = candidate.id;
      newCandidate.cin = candidate.CIN;
      newCandidate.nom = candidate.firtName;
      newCandidate.prenom = candidate.lastName;
      newCandidate.email = candidate.email;
      newCandidate.type = candidate.type;
      newCandidate.adresse = candidate.adresse ;
      newCandidate.telephone = candidate.phone;
      newCandidate.formationsCandidat = candidate.formationsCandidat;
      newCandidate.groupe = candidate.groupe;
      return newCandidate
    });

    let group : ReqGroup = {
      nom : value.groupName,
      description : value.description,
      candidats : candidateList
    }
    this.groupService.createGroup(group);
    
  }
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.groupForm.reset();
    for (const key in this.groupForm.controls) {
      if (this.groupForm.controls.hasOwnProperty(key)) {
        this.groupForm.controls[key].markAsPristine();
        this.groupForm.controls[key].updateValueAndValidity();
      }
    }
    this.data = this.data.concat(this.listOfSelectedCandidate);
    this.listOfSelectedCandidate=[];
  }

  onChange(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this.groupService.searchCandidate(value).subscribe(
      next => {
        this.data = next;
        this.filteredCadidate = next;
        this.listOfSelectedCandidate.forEach((element:ICandidate)=>{
          const index = this.filteredCadidate.indexOf(element);
          const index2 = this.data.indexOf(element);
          this.filteredCadidate=this.filteredCadidate.filter(x=>JSON.stringify(x) != JSON.stringify(element));
          this.data=this.data.filter(x=>JSON.stringify(x) != JSON.stringify(element));
        })
        
      }
    )
    /*this.filteredCadidate=[];
    this.filteredCadidate=this.data.filter(x => x.email.toLowerCase().includes(value.toLowerCase()))*/
    
  }
  selectCandidate(candidate: ICandidate):boolean{
    let exist = this.listOfSelectedCandidate.includes(candidate);
    if(!exist){
      this.listOfSelectedCandidate.push(candidate);
      let index = this.filteredCadidate.indexOf(candidate);
      if (index > -1) {
        this.filteredCadidate.splice(index, 1);
      }
      index = this.data.indexOf(candidate);
      if (index > -1) {
        this.data.splice(index, 1);
        this.groupForm.get('search')?.setValue('');
      }
      
    }

    return exist
  }
  removeCandidteFromList(candidate : ICandidate){
    const index = this.listOfSelectedCandidate.indexOf(candidate);
    if (index > -1) {
      this.filteredCadidate.push(candidate);
      this.data.push(candidate);
      this.listOfSelectedCandidate.splice(index, 1);
    }
  }

  ngOnInit(): void {
    this.groupForm = this.fb.group({
      search : [''],
      groupName: ['', [Validators.required],[this.groupNameValidator]],
      description: ['', [Validators.required]]
    });
    if(this.value !== null ){
      this.groupForm.get('groupName')?.setValue("G1");
      this.groupForm.get('description')?.setValue("good Group")

    }
  }
  close(): void {
    this.drawerRef.close();
    
  }

}
