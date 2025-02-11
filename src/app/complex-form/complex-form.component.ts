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
  editingIndex: number | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
   this.resetForm();
  }

resetForm(){
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

  deleteUnit(groupIndex: number, unitIndex: number) {
    this.getUnits(groupIndex).removeAt(unitIndex);
    this.updateGroupTotal(groupIndex);
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

  submitForm() {
    if (this.form.valid) {
      if (this.editingIndex !== null) {

        this.submittedData[this.editingIndex] = { ...this.form.value };
        this.editingIndex = null;
      } else {

        this.submittedData.push({ ...this.form.value });
      }
      console.log('Submitted Data:', this.form.value);
      alert('Form Submitted Successfully!');
      this.resetForm();
    }
  }

  editForm(index: number) {
    this.editingIndex = index;
    const selectedData = this.submittedData[index];

    this.form.reset();
    this.form.patchValue(selectedData);

    this.unitGroups.clear();
    selectedData.unitGroups.forEach((group: any) => {
      const groupForm = this.fb.group({
        groupName: [group.groupName],
        units: this.fb.array([]),
        groupTotal: [group.groupTotal]
      });

      group.units.forEach((unit: any) => {
        const unitForm = this.fb.group({
          unitName: [unit.unitName],
          quantity: [unit.quantity],
          unitPrice: [unit.unitPrice],
          totalSum: [unit.totalSum]
        });

        (groupForm.get('units') as FormArray).push(unitForm);
      });

      this.unitGroups.push(groupForm);
    });
  }
}
