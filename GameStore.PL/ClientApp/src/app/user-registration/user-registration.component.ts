import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../_helpers/must-match.validator';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
    imagesource = "https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg";
    registerForm: FormGroup;
    submitted = false;
    duplicate = false;
    user: UserModel;
    constructor(private formBuilder: FormBuilder, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            userName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email] , [this.duplicationcheck.bind(this)]],
            password: ['', [Validators.required, Validators.minLength(3)]],
            confirmPassword: ['', Validators.required],
            imageUrl: [this.imagesource]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        }        );
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        

        // stop here if form is invalid1
        if (this.registerForm.invalid) {
            return;
        }

        // display form values on success
        this.user = this.registerForm.value;
        console.log(this.user);
      
     
        

        //if (this.duplicate) {
        //    return;
        //}

        if (!this.duplicate) {
            this.http.post(this.baseUrl + 'api/User', this.user).subscribe((res) => console.log(res));



            alert('The registration has been successful' + JSON.stringify(this.registerForm.value, null, 4));
            this.router.navigateByUrl('/');


        }
       
    }

    duplicationcheck(control: FormControl) {
        
        console.log(control.value);

        setTimeout(() => {
            this.http.get(this.baseUrl + 'api/User/email/' + control.value, { responseType: 'text' }).
            subscribe(res => {

                if (res === 'duplicate') {
                    this.duplicate = true;


                } else {
                    this.duplicate = false;
                }
            },
                err => {

                    console.log(err);


                }
            );

        })
    }


    onReset() {
        this.submitted = false;
        this.registerForm.reset();
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
