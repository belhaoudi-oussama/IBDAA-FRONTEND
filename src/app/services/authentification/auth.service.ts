import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { UtilisateurService } from '../utilisateur/utilisateur.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!:Utilisateur;
  constructor(private userService:UtilisateurService,private router: Router) { }

  isLoggedIn(){
    let user = sessionStorage.getItem('user');
    console.log(!(user === null));
    return !(user === null);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("Auth Guard hehe");
    if (this.isLoggedIn()) return true;
    this.router.navigate(['login']);
    return false;
  }

  logOut() {
    sessionStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
