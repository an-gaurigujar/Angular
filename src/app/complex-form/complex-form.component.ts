import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-complex-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.css']
})
export class ComplexFormComponent implements OnInit {
  form!: FormGroup;
  submittedData: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      companyName: [''],
      country: [''],
      city: [''],
      zip: [''],
      street: [''],
      unitGroups: this.fb.array([]),
    });

    this.addUnitGroup();
  }

  get unitGroups(): FormArray {
    return this.form.get('unitGroups') as FormArray;
  }

  getUnits(groupIndex: number): FormArray {
    return this.unitGroups.at(groupIndex).get('units') as FormArray;
  }

  addUnitGroup() {
    const unitGroup = this.fb.group({
      groupName: [''],
      units: this.fb.array([]),
      groupTotal: [0],
    });

    this.unitGroups.push(unitGroup);
    this.addUnit(this.unitGroups.length - 1);
  }

  addUnit(groupIndex: number) {
    const unit = this.fb.group({
      unitName: [''],
      quantity: [1],
      unitPrice: [0],
      totalSum: [0],
    });

    this.getUnits(groupIndex).push(unit);
  }

  calculateTotal(groupIndex: number, unitIndex: number) {
    const unit = this.getUnits(groupIndex).at(unitIndex);
    const quantity = unit.get('quantity')?.value || 0;
    const unitPrice = unit.get('unitPrice')?.value || 0;
    const totalSum = quantity * unitPrice;
    unit.patchValue({ totalSum });


    this.updateGroupTotal(groupIndex);
  }

  updateGroupTotal(groupIndex: number) {
    let groupTotal = 0;
    this.getUnits(groupIndex).controls.forEach((unit) => {
      groupTotal += unit.get('totalSum')?.value || 0;
    });

    this.unitGroups.at(groupIndex).patchValue({ groupTotal });
  }

  removeUnit(groupIndex: number, unitIndex: number) {
    this.getUnits(groupIndex).removeAt(unitIndex);
    this.updateGroupTotal(groupIndex);
  }

  submitForm() {
    if (this.form.valid) {
      this.submittedData.push(this.form.value);
      console.log('Submitted Data:', this.form.value);
      alert('Form Submitted Successfully!');
    }
  }
}
