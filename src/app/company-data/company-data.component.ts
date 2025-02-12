import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormArray, } from '@angular/forms';

@Component({
  selector: 'app-comapny-data',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './company-data.component.html',
  styleUrl: './company-data.component.css'
})
export class CompanyDataComponent {

 unitForm: FormGroup;
  allData: any = [];
  currentIndex = null;
  constructor(private fb: FormBuilder) {
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
      unitName: [unit ? unit.unitName: '', Validators.required],
      unitQuantity: [unit? unit.unitQuantity : 1, Validators.required],
      unitPrice: [unit ? unit.unitPrice: 0, Validators.required],
      totalPrice:[unit ? unit.unitQuantity * unit.unitPrice : 0],
    });


    this.units.push(unitGroup);
  }

  
  onSubmit() {

    if (this.currentIndex !== null) {


      // this.updateStorageData();


      return;
    }
    // console.log(this.unitForm.value);
    // this.alldata.push(this.unitForm.value);

    let data: any = [];
    const allData = localStorage.getItem('data');

    if (allData) {
      data = JSON.parse(allData);
    } 

    data.push(this.unitForm.value);
    localStorage.setItem('data', JSON.stringify(data));

    this.allData = data;
    this.resetForm()
        // this.addUnit(); // Add a new unit by default on form reset

  }

  resetForm() {
    // Reset the form
    this.unitForm.reset();
    this.units.clear();
    // console.log(this.alldata)
    this.addUnit();
  }
  removeUnit(index: number) {
    this.units.removeAt(index);
  }
}