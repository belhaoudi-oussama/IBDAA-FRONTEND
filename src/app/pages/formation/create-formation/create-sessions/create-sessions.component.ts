import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { Sceance } from 'src/app/pages/group/groups/Sceance';
import { FormateurService } from 'src/app/services/formateurs/formateur.service';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { GroupService } from 'src/app/services/group.service';
import { SessionManagementService } from '../session-management.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

function DateValidation(c: AbstractControl): { [key: string]: boolean } | null {
  const startDateControl = c.get('dateTimeDebut');
  const endDateControl = c.get('dateTimeFin');

  if (Date.parse(startDateControl!.value)  < Date.parse(endDateControl!.value)) {
    return null;
  }
  return { DateVal: true };
}

@Component({
  selector: 'app-create-sessions',
  templateUrl: './create-sessions.component.html',
  styleUrls: ['./create-sessions.component.css']
})
export class CreateSessionsComponent implements OnInit {
  @Input() value : number =0;
  mediaSub: Subscription;
  activeMedia: string='';
  validateForm!: FormGroup;
  sceance!:Sceance;
  listSceance: Sceance[] = [];
  groupsNames: string[]= [];
  size: NzSelectSizeType = 'default';
  multipleValue = ['a10', 'c12'];
  datepipe: DatePipe = new DatePipe('en-US')
  dateDebut:string = '';
  searchChange$ = new BehaviorSubject('');
  optionList: string[] = [];
  selectedUser?: string;
  isLoading = false;
  filteredOptions: string[] = [];


  
  constructor(private drawerRef: NzDrawerRef<string> ,public mediaObserver : MediaObserver,private fb: FormBuilder,private formateurService:FormateurService, private http:HttpClient,
    private groupsServices:GroupService , private sessionMangement : SessionManagementService ,private notification: NzNotificationService) { 
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

  submitSessionForm(): void {
    console.log("submit")
    this.sessionMangement.addSessions(this.listSceance);
    /*for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }*/
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      nom: [null, [Validators.required]],
      sceanceFormateur: [null],
      DateGroup: this.fb.group({
        dateTimeDebut: [null, [Validators.required]],
        dateTimeFin: [null, [Validators.required]],},{validator: DateValidation}
      ),
      groupe: [null],


    });

    this.getFormateursNames();
    this.getGroupsNames();
  }


  onChange(result: Date): void {
    console.log('Selected Time: ', result);
  }

  onOk(result: Date | Date[] | null): void {
    console.log('onOk', result);
  }

  saveSeance(){
  
    this.sceance=this.validateForm.value;
    const datepipe: DatePipe = new DatePipe('en-US')
    let dateDebut =  datepipe.transform(this.validateForm.get('dateTimeDebut')?.value, 'dd-MMM-YYYY HH:mm:ss') as string
    let dateFin = this.datepipe.transform(this.validateForm.get('dateTimeFin')?.value, 'dd-MMM-YYYY HH:mm:ss')as string ;
    if(this.manageDeration(dateDebut,dateFin)){
      this.sceance.dateTimeDebut= dateDebut;
      this.sceance.dateTimeFin=dateFin;
      this.sceance.groupe = "g1"
      this.sceance.sceanceFormateur = "f1"
      this.listSceance.push(this.sceance);
      this.validateForm.reset();
    }else{
      this.notification.create(
        'error',
        'deration error',
        'the deration you entered is not enough to add more sessions u have to submit and increase the deration before'
      );
    }
    
  }
  removeSceanceFromList(sceance:Sceance){
    const index = this.listSceance.indexOf(sceance);
    if (index > -1) {
      let start = new Date(this.listSceance[index].dateTimeDebut)
      let end = new Date(this.listSceance[index].dateTimeFin)
      let deration : any = (end.getTime() - start.getTime()) / (1000 * 3600)
      this.value += (Math.round(deration*100)/100);
      this.listSceance.splice(index, 1);
    }
  }

  onSearch(value: string): void {
    this.isLoading = true;
    this.searchChange$.next(value);
  }

  public getFormateursNames(){
    this.formateurService.getFormateurNames().subscribe((response : string[])=>{this.optionList=response, console.log(this.optionList)});
  }
  
  public getGroupsNames(){
    this.groupsServices.getGroupsNames().subscribe((response:string[])=>{this.groupsNames=response, console.log(this.groupsNames)})
  }

  manageDeration(s : string , e : string):boolean{
    let start = new Date(s)
    let end = new Date(e)
    let deration :number  = (end.getTime() - start.getTime()) / (1000 * 3600);
    if((Math.round(deration*100)/100)  > (Math.round(this.value*100)/100)){
      return false;
    }
    this.value -= (Math.round(deration*100)/100) ;
    return true;
  }
  reset(){
    this.validateForm.reset();
  }

  close(){
    this.drawerRef.close()
  }

}



