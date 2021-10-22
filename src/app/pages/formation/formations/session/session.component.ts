import { Component, OnInit } from '@angular/core';
import { Sceance } from 'src/app/pages/group/groups/Sceance';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  searchValue = '';
  visible = false;
  listOfData: Sceance[] = []
  listOfDisplayData = [...this.listOfData];
  constructor() { }

  ngOnInit(): void {
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
