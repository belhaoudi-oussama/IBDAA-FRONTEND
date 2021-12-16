import { Component, Input, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { GroupService } from 'src/app/services/group.service';
import { ColumnItem } from './columnItem';
import { CreateGroupComponent } from './create-group/create-group.component';
import { IGroup } from './group';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ReqCandidate } from './create-group/reqCandidate';
import { ICandidate } from './candidate';
import { ReqGroup } from './create-group/reqGroup';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  size: NzButtonSize = 'large';
  expandSet = new Set<number>();
  searchValue = '';
  selectedFilterField : string = "name";
  filterFields : { [key: string]: string; } = {'name': '', 'description': '', 'numberOfCandidate': ''};
  listOfData : IGroup[] = [];
  listOfDisplayData: IGroup[] = [];
  listOfColumns: ColumnItem[] = [
    {
      name: 'name',
      sortOrder: null,
      sortFn: (a: IGroup, b: IGroup) => a.name.localeCompare(b.name),
      priority : 3
    },
    {
      name: 'description',
      sortOrder: null,
      sortFn: (a: IGroup, b: IGroup) => a.description.localeCompare(b.description),
      priority : 1
    },
    {
      name: 'numberOfCandidate',
      sortOrder: null,
      sortFn: (a: IGroup, b: IGroup) => a.candidates.length - b.candidates.length,
      priority : 2
    },
    
  ]

  constructor( private drawerService: NzDrawerService, private groupService :GroupService, private nzMessageService: NzMessageService) {
    this.groupService.getGroups().subscribe(
      next=>{
        this.listOfData = next;
        this.listOfDisplayData=[...this.listOfData];
      }
    )
    
  }
  ngOnInit(): void { 

  }
  search(): void {
    this.filterFields[this.selectedFilterField] = this.searchValue;
    this.searchValue = '';
    this.filter();
  }
  reset(): void {
    this.filterFields[this.selectedFilterField] = '';
    this.search();
  }
  setFilterField(field: string): void{
    this.selectedFilterField = field;
    this.searchValue = this.filterFields[this.selectedFilterField];
    console.log(this.selectedFilterField)
  }
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }
  filter():void{
    let filteredData : IGroup[];
    filteredData = this.listOfData.filter((item: IGroup) => item.name.indexOf(this.filterFields['name']) !== -1);
    filteredData = filteredData.filter((item: IGroup) => item.description.indexOf(this.filterFields['description']) !== -1);
    filteredData = filteredData.filter((item: IGroup) => {
      if(this.filterFields['numberOfCandidate'] === ''){
        return true;
      }
      return item.candidates.length === +this.filterFields['numberOfCandidate'];
    })
    this.listOfDisplayData = filteredData;
  }
  mainFilter(){
    console.log("dont click me");
  }
  openCreateGroupComponent(): void {
      this.drawerService.create<CreateGroupComponent, { value: number | null }, string>({
      nzTitle: 'Create New Group',
      nzContent: CreateGroupComponent,
      nzMaskClosable:false,
      nzWidth : "50%",
      nzContentParams: {
        value : null
      }
      
    });
  }
  openEditGroupComponent(id:number):void{
      this.drawerService.create<CreateGroupComponent, { value: number | null }, string>({
      nzTitle: 'Edit Group',
      nzContent: CreateGroupComponent,
      nzMaskClosable:false,
      nzWidth : "50%",
      nzContentParams: {
        value : id
      }
    });
  }
  cancel(): void {
    this.nzMessageService.info('delete canceled');
  }

  confirm(group : IGroup): void {


    let gp : ReqGroup = {
      id : group.id,
      nom : group.name,
      description : group.description,
      candidats : group.candidates.map((candidate:ICandidate)=>{
        let newCandidate : ReqCandidate = {} ;
        newCandidate.id = candidate.id;
        newCandidate.cin = candidate.CIN;
        newCandidate.nom = candidate.firtName;
        newCandidate.prenom = candidate.lastName;
        newCandidate.email = candidate.email;
        newCandidate.type = candidate.type;
        newCandidate.adresse = candidate.adresse ;
        newCandidate.telephone = candidate.phone;
        /*if(!candidate.groupe){
          newCandidate.groupe = null;
        }else{
          newCandidate.groupe = candidate.groupe;
        }*/
        return newCandidate
      }),
    }
    this.nzMessageService.info('Group deleted');
    this.groupService.deleteGroup(gp);
  }
}
        