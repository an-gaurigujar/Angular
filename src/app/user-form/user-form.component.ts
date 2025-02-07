
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',

})
export class UserFormComponent {

  profileForm = new FormGroup({
    fName: new FormControl('',[Validators.required]),
    lName: new FormControl('',[Validators.required,Validators.minLength(5)]),
   
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    confirmPassword: new FormControl('',[Validators.required]),
    isAgree: new FormControl(false),
  });
   isequalpassword =false;

  userInfo(){
    const userValue = this.profileForm.value;
    alert("Form Submitted");
    
    

  }

}