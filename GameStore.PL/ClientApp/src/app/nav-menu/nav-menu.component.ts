import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';

import { UserloginComponent } from '../userlogin/userlogin.component';
import { AvatarChangeComponent } from '../avatar-change/avatar-change.component';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})


export class NavMenuComponent implements OnInit{
    public registration: boolean = true;
    CurrentUser: UserModel = JSON.parse( localStorage.getItem('user'));

   
    constructor(private dialog: MatDialog, private router: Router) { }

    loggedIn() {
        if (localStorage.getItem('userStatus') === 'success') {
            
            return true;
        }
    }
    ngOnInit(): void {
    
      
  }
  isExpanded = false;
  
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
    }

    Register() {
        this.registration = false;
    }

    onLogin() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;

        this.dialog.open(UserloginComponent, dialogConfig);
    }

    changeAvatar() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;

        this.dialog.open(AvatarChangeComponent, dialogConfig);
    }

    onLogout() {
        localStorage.removeItem('userStatus');
        localStorage.removeItem('user');
        this.router.navigate(["/"]);
    }

    
}

interface UserModel {
    id: number,
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    imageUrl: string

}
