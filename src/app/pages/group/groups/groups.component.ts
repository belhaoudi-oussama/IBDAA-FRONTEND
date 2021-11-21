import { Component, Input, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { GroupService } from 'src/app/services/group.service';
import { ColumnItem } from './columnItem';
import { CreateGroupComponent } from './create-group/create-group.component';
import { groups } from './data';
import { IGroup } from './group';

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
  listOfData : IGroup[] = groups;
  listOfDisplayData: IGroup[] ;
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

  constructor( private drawerService: NzDrawerService, private groupService :GroupService) {
    this.listOfDisplayData=[...this.listOfData];
  }
  ngOnInit(): void { 
    this.groupService.getGroups().subscribe(
      next=>{console.log(next)}
    )
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
      nzTitle: 'Create New Group',
      nzContent: CreateGroupComponent,
      nzMaskClosable:false,
      nzWidth : "50%",
      nzContentParams: {
        value : id
      }
    });
  }

}
        