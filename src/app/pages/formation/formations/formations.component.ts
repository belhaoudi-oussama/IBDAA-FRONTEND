import { Component, OnInit } from '@angular/core';
import { IFormation } from './IFormation';


@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})
export class FormationsComponent implements OnInit {
  searchValue = '';
  visible = false;
  listOfData: IFormation[] = [
    {
      id : 1,
      name : "F1",
      descreption : "its A good formation ",
      duration : 10,
      state : "available",
      type : "positive"
    },
    {
      id : 2,
      name : "F2",
      descreption : "its A good formation ",
      duration : 100,
      state : "available",
      type : "positive"
    },
    {
      id : 3,
      name : "F3",
      descreption : "its A good formation ",
      duration :30,
      state : "not available",
      type : "positive"
    },
    {
      id : 4,
      name : "F4",
      descreption : "its A good formation ",
      duration : 10,
      state : " not available",
      type : "positive"
    },
    {
      id : 5,
      name : "F5",
      descreption : "stop waiting for bad formation ",
      duration : 10,
      state : "available",
      type : "positive"
    }
  ];
  listOfDisplayData = [...this.listOfData];

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: IFormation) => item.name.indexOf(this.searchValue) !== -1);
  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
