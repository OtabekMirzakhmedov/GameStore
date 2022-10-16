import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    loginCredentials: LoginModel;
    userStatus: string;
    user: UserModel;

    showError: boolean = false;

    constructor(private formBuilder: FormBuilder, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
        private router: Router, private dialogRef: MatDialogRef<UserloginComponent>,) { }
    ngOnInit() {

        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    get f() { return this.loginForm.controls; }
    

    onSubmit() {
        this.submitted = true;
        console.log(this.loginForm);
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loginCredentials = this.loginForm.value
        // display form values on success

        console.log(this.loginCredentials);
        this.http.post(this.baseUrl + 'api/User/login', this.loginCredentials, {responseType: 'text'}).
            subscribe((res) => {
                this.userStatus = res;
                if (this.userStatus === 'error') {
                    this.showError = true;
                }
                if (this.userStatus === 'success') {

                    this.showError = false;
                    localStorage.setItem('userStatus', this.userStatus);
                    this.http.post(this.baseUrl + 'api/User/getuser', this.loginCredentials).subscribe((r) => localStorage.setItem('user', JSON.stringify(r)));
                    this.dialogRef.close();
                    this.router.navigate(["/"]);
                  
                    window.location.reload();
                }
                //console.log()
                //this.router.navigateByUrl('');
                //console.log(this.userStatus);
               
            }, (err) => console.log(err));

        //if (localStorage.getItem('userStatus') === 'success') {
        //    this.router.navigate(['']);
        //}
     

        
    }



}

interface LoginModel {
    userName: string,
    password: string
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
