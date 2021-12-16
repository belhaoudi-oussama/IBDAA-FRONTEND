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
import { FormationService } from 'src/app/services/formation/formation.service';

function DateValidation(c: AbstractControl): { [key: string]: boolean } | null {
  const startDateControl = c.get('dateTimeDebut');
  const endDateControl = c.get('dateTimeFin');
  if (Date.parse(startDateControl!.value)  < Date.parse(endDateControl!.value) && CreateSessionsComponent.manageDeration(startDateControl!.value,endDateControl!.value,c.get('drt')!.value)) {
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
  sceance!: Sceance;
  listSceance: Sceance[] = [];
  groupsNames: string[]= [];
  size: NzSelectSizeType = 'default';
  multipleValue = ['a10', 'c12'];
  datepipe: DatePipe = new DatePipe('en-US')
  dateD:Date | Date[] | null = null;
  dateF:Date | Date[] | null = null;
  searchChange$ = new BehaviorSubject('');
  optionList: string[] = [];
  selectedUser?: string;
  isLoading = false;
  filteredOptions: string[] = [];
  dur! : number ;


  
  constructor(private drawerRef: NzDrawerRef<string> ,public mediaObserver : MediaObserver,private fb: FormBuilder,private formateurService:FormateurService, private http:HttpClient,
    private groupsServices:GroupService , private  sessionMangement : SessionManagementService ,private notification: NzNotificationService ,private fs : FormationService) { 
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
    this.sessionMangement.addSessions(this.listSceance);
    /*for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }*/
    this.drawerRef.close()
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      nom: [null, [Validators.required]],
      sceanceFormateur: [null, [Validators.required]],
      DateGroup: this.fb.group({
        dateTimeDebut: [null, [Validators.required]],
        drt :[this.value],
        dateTimeFin: [null, [Validators.required]],},{validator: DateValidation}
      ),
      groupe: [null],
      


    });
    this.dur = this.value;
    this.getFormateursNames();
    this.getGroupsNames();

  }


  onChange(result: Date): void {
    //console.log('Selected Time: ', result);
  }

  onOk(result: Date | Date[] | null): void {
    //console.log('onOk', result);
  }

  saveSeance(){
  
    this.sceance=this.validateForm.value;
    //DateGroup
    delete this.sceance['DateGroup'];
    const datepipe: DatePipe = new DatePipe('en-US')
    let dateDebut =  datepipe.transform(this.dateD?.toString(), 'dd-MMM-YYYY HH:mm:ss') as string;
    let dateFin = this.datepipe.transform(this.dateF?.toString(), 'dd-MMM-YYYY HH:mm:ss')as string ;
    let dr= this.dur;
    if(CreateSessionsComponent.manageDeration(dateDebut,dateFin,this.dur)){
      let start = new Date(dateDebut)
      let end = new Date(dateFin)
      let deration :number  = (end.getTime() - start.getTime()) / (1000 * 3600);
      console.log("===============",dateDebut)
      this.sceance.dateTimeDebut = dateDebut;
      this.sceance.dateTimeFin = dateFin;
      this.sceance.formation = undefined;
      this.groupsServices.getGroupsNames(this.validateForm.get('groupe')?.value).subscribe(
        next=>{
          this.sceance.groupe = next;
        }
      ) 
      this.sceance.formateur =this.validateForm.value.sceanceFormateur;
      this.listSceance.push(this.sceance);
      this.validateForm.reset();
      this.dur = dr - (Math.round(deration*100)/100);
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
    this.formateurService.getFormateurNames().subscribe((response)=>{
      response.forEach(x=>{
        this.optionList.push(x.nom);
      })
      
    });
  }
  
  public getGroupsNames(){
    this.groupsServices.getGroups().subscribe((response)=>{
      response.forEach(x=>{
        this.groupsNames.push(x.name)
      })
    });
  }
  static manageDeration(s : string , e : string , value : number):boolean{
    let start = new Date(s)
    let end = new Date(e)
    let deration :number  = (end.getTime() - start.getTime()) / (1000 * 3600);
    console.log(s,e,value)
    if((Math.round(deration*100)/100)  > (Math.round(value*100)/100)){
      return false;
    }
    value -= (Math.round(deration*100)/100) ;
    return true;
  }
  reset(){
    this.validateForm.reset();
  }

  close(){
    this.drawerRef.close()
  }

}



