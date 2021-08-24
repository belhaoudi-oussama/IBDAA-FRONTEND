import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})
export class FormationsComponent implements OnInit {
  formationForm!: FormGroup;
  constructor( private fb: FormBuilder ) { }

  groupNameValidator = (control: FormControl) =>
  new Observable((observer: Observer<ValidationErrors | null>) => {
    setTimeout(() => {
      if (control.value === 'G1' || control.value === 'G2' || control.value === 'G3') {
        // you have to return `{error: true}` to mark it as an error event
        observer.next({ error: true, duplicated: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    }, 1000);
  });
  ngOnInit(): void {
    this.formationForm = this.fb.group({
      search : [''],
      groupName: ['', [Validators.required],[this.groupNameValidator]],
      description: ['', [Validators.required]]
    });
  }
  submitForm(value: { groupName: string; description: string; search: string;}): void {
    for (const key in this.formationForm.controls) {
      if (this.formationForm.controls.hasOwnProperty(key)) {
        this.formationForm.controls[key].markAsDirty();
        this.formationForm.controls[key].updateValueAndValidity();
      }
    }
  }

}
