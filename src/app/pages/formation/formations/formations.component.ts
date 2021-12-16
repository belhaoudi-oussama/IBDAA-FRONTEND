import { Component, OnInit } from '@angular/core';
import { FormationService } from 'src/app/services/formation/formation.service';
import { IFormation } from './IFormation';


@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})
export class FormationsComponent implements OnInit {
  searchValue = '';
  visible = false;
  listOfData: IFormation[] = [];
  listOfDisplayData = [...this.listOfData];

  constructor(private formationService : FormationService) { }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: IFormation) => item.name.indexOf(this.searchValue) !== -1);
  }
  
  ngOnInit(): void {
    this.formationService.getFormation().subscribe(
      next => {
        console.log(next)
        this.listOfData = next;
        this.listOfDisplayData = [...this.listOfData]
      }
    );
  }


}
