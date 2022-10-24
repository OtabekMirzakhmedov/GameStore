import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-comment-form',
    templateUrl: './comment-form.component.html',
    styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
    CurrentUser: UserModel = JSON.parse(localStorage.getItem('user'));
    @Input() submitLabel!: string;
    @Input() hasCancelButton: boolean = true;
    @Input() initialText: string = '';

    @Output()
    handleSubmit = new EventEmitter<string>();

    @Output()
    handleCancel = new EventEmitter<void>();

    form!: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            title: [this.initialText, [Validators.minLength(0), Validators.maxLength(600)]]
        });
    }

    onSubmit(): void {
        this.handleSubmit.emit(this.form.value.title);
        this.form.reset();
    }
    onCancel() {
        this.form.reset();
        this.handleCancel.emit()
    }
    get f() { return this.form.controls; }

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
