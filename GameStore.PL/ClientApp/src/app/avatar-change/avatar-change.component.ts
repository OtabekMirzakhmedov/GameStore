import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-avatar-change',
  templateUrl: './avatar-change.component.html',
  styleUrls: ['./avatar-change.component.css']
})
export class AvatarChangeComponent implements OnInit {
    CurrentUser: UserModel = JSON.parse(localStorage.getItem('user'));
 
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit() {
  }
    avatarChange(form: NgForm) {
        this.CurrentUser.imageUrl = form.value.imageurl;
        this.http.put<UserModel>(this.baseUrl + 'api/User/' + this.CurrentUser.id, this.CurrentUser).subscribe();
        localStorage.setItem('user', JSON.stringify(this.CurrentUser));
        window.location.reload();

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
