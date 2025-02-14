import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormArray, } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comapny-data',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './company-data.component.html',
  styleUrl: './company-data.component.css'
})
export class CompanyDataComponent {

 unitForm: FormGroup;
 currentEntity: any = [];
  currentIndex = null;
  constructor(private fb: FormBuilder,private Service:ApiService,private router:Router) {
    this.unitForm = this.fb.group({
      companyName: ['', Validators.required],
      country: ['',Validators.required],
      street: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      units: this.fb.array([])
    });
    this.addUnit();
  }

 get units() {
    return this.unitForm.get('units') as FormArray;

  }

  addUnit(unit?: any) {
    const unitGroup = this.fb.group({
      unitName: [ '', Validators.required],
      unitQuantity: [ 1, Validators.required],
      unitPrice: [0, Validators.required],
      totalPrice:[ 0],
    });


    this.units.push(unitGroup);
  }

   async onSubmit() {

     console.log(this.unitForm.value);

    // let userData :any=[];
    // userData.push(this.unitForm.value);
   await this.Service.insertCompany(this.unitForm.value).subscribe(data => {
      // this.currentEntity=userData;
      // console.log(data);
    }
    ) 
    this.resetForm();

  }
  
  resetForm() {

    this.unitForm.reset();
    this.units.clear();

    this.addUnit();
  }
  removeUnit(index: number) {
    this.units.removeAt(index);
  }
}

