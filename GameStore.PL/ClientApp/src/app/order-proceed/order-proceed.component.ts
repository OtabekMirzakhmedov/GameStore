import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-order-proceed',
  templateUrl: './order-proceed.component.html',
  styleUrls: ['./order-proceed.component.css']
})
export class OrderProceedComponent implements OnInit {
    form: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group(
            {
                firstname: ['', Validators.required],
                lastname: ['', [Validators.required]],
                email: ['', [Validators.required, Validators.email]],
                phone: ['', [Validators.required]],
                comments: ['', [Validators.maxLength(600)]],
                paymentdropdown: ['', [Validators.required]],
                acceptTerms: [false, Validators.requiredTrue]
            }
        );
    }

    get f(){
        return this.form.controls;
    }

    onSubmit(): void {
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }
        
        console.log(JSON.stringify(this.form.value, null, 2));
    }

    onReset(): void {
        this.submitted = false;
        this.form.reset();
    }
}
