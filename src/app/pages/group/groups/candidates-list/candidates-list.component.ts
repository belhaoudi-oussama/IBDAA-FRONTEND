import { Component, Input, OnInit } from '@angular/core';
import { ICandidate } from '../candidate'

@Component({
  selector: 'app-candidates-list',
  template: `
      <nz-list nzItemLayout="horizontal"  [nzLoading]="loading">
        <nz-list-item *ngFor="let item of data">
          <nz-list-item-meta
            nzAvatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            nzDescription={{item?.email}}
          >
            <nz-list-item-meta-title>
              <a href="https://ng.ant.design">{{ item.firtName }}</a>
            </nz-list-item-meta-title>
          </nz-list-item-meta>
        </nz-list-item>
        <nz-list-empty *ngIf="data.length === 0"></nz-list-empty>
      </nz-list>

  `,
  styles: [
    ``
  ]
})
export class CandidatesListComponent implements OnInit {
  
  @Input() candidates : ICandidate[] = [];
  loading = true;
  data : ICandidate[] =[];
  constructor() { }

  ngOnInit(): void {
    this.loading = true;
    if (this.data.length > 0) {
      setTimeout(() => {
        this.data = [];
        this.loading = false;
      }, 1000);
    } else {
      setTimeout(() => {
        this.data = this.candidates;
        this.loading = false;
      }, 500);
    }
  }

}
