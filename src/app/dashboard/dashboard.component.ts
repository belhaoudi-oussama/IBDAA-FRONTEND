import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../models/Utilisateur';
import { AuthService } from '../services/authentification/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isCollapsed = false;
  user!:Utilisateur;
  third = false ;
  seco = "Groups";
  Title = " Groups"
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    var userr = sessionStorage.getItem('user') as string;
    this.user=JSON.parse(userr);
  }

  log(): void {
    console.log('click dropdown button');
  }

  logOut(){
    this.authService.logOut();  }
    
  manage(){
      this.third = true;
  }
  sec(s : string){
    this.seco = s;
    this.Title = s;
    this.third = false;
  }

}
