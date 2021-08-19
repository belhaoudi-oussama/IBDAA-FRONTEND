import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { Sceance } from 'src/app/pages/group/groups/Sceance';
import { FormateurService } from 'src/app/services/formateurs/formateur.service';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-create-sessions',
  templateUrl: './create-sessions.component.html',
  styleUrls: ['./create-sessions.component.css']
})
export class CreateSessionsComponent implements OnInit {
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
    private groupsServices:GroupService) { 
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

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      nom: [null, [Validators.required]],
      sceanceFormateur: [null, [Validators.required]],
      dateTimeDebut: [null, [Validators.required]],
      dateTimeFin: [null, [Validators.required]],
      groupe: [null, [Validators.required]],

      

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
    console.log(this.validateForm.value);
    this.sceance=this.validateForm.value;
    const datepipe: DatePipe = new DatePipe('en-US')
    let dateDebut =  datepipe.transform(this.validateForm.get('dateTimeFin')?.value, 'DD-MMM-YYYY HH:mm:ss') as string
    let dateFin = this.datepipe.transform(this.validateForm.get('dateTimeFin')?.value, 'DD-MMM-YYYY HH:mm:ss')as string ;
    this.sceance.dateTimeDebut= dateDebut;
    this.sceance.dateTimeFin=dateFin;
    this.listSceance.push(this.sceance);
    this.validateForm.reset();
  
  }
  removeSceanceFromList(sceance:Sceance){
    const index = this.listSceance.indexOf(sceance);
    if (index > -1) {
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
}



