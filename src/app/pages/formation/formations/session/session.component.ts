import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sceance } from 'src/app/pages/group/groups/Sceance';
import { FormationService } from 'src/app/services/formation/formation.service';

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
  formationID : string | null = null;
  constructor(private formationService : FormationService , private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.formationID = this.route.snapshot.paramMap.get('id');
    this.formationService.getFormationSession(this.formationID).subscribe(
      next=>{
        this.listOfData = next;
        this.listOfDisplayData = [...this.listOfData];

      }
    )
    setTimeout(async() => {
      await this.listOfData.forEach(x => {
        this.formationService.getGroupName(x.id).subscribe(
          next => {
            x.groupReq = next;
          }
        );
      })
      this.listOfDisplayData = [...this.listOfData];
    }, 500);
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
