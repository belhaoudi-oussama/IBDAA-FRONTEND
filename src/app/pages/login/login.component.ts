import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  isLogged :boolean = false;
  isCollapsed = false;
  user!:Utilisateur;
  correct:boolean = true;
  constructor(private fb: FormBuilder, private userService:UtilisateurService,private router: Router) {}

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    this.user=this.validateForm.value;
    console.log(this.user);
    this.login(this.user);
  }

  login(user:Utilisateur){
    this.userService.login(user).subscribe(
      (response)=>{console.log(response);
      if(response !=null){
        this.isLogged=true;
        this.user=response;
        var userInf = JSON.stringify(this.user);
        sessionStorage.setItem("user", userInf);
        this.router.navigate(['/dashboard']);
      }
    },
      (err)=>{
        this.correct=false;
      }
    );
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    });
  }
}
