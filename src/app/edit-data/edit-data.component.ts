import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-edit-data',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './edit-data.component.html',
  styleUrl: './edit-data.component.css'
})
export class EditDataComponent implements OnInit  {

   unitForm: FormGroup;
    currentIndex = null;
    id: any;
    constructor(private fb: FormBuilder,private route: ActivatedRoute,private router: Router, private service:ApiService) {
      this.unitForm = this.fb.group({
        companyName: ['', Validators.required],
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        units: this.fb.array([])
      });
    
    }
  
    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id')

      this.service.getSpecificOne(this.id).subscribe((data:any)=>{

        const currentEntity = data.find((x: any)=> Number(x.id) === Number(this.id));
        if (currentEntity) {
          this.unitForm.patchValue({
            companyName: currentEntity.company_name,
            country: currentEntity.country,
            street: currentEntity.street,
            city: currentEntity.city,
            state: currentEntity.state
          });
          if (currentEntity.units && currentEntity.units.length > 0) {
            currentEntity.units.forEach((unit: any) => {
              this.addUnit(unit);            
            });
          }
        }
      })
    }

   get units() {
      return this.unitForm.get('units') as FormArray;
  
    }
  
    addUnit(unit?: any) {
      const unitGroup = this.fb.group({
        unitName: [unit ? unit.unit_name: '', Validators.required],
        unitQuantity: [unit? unit.unit_quantity : 1, Validators.required],
        unitPrice: [unit ? unit.unit_price: 0, Validators.required],
        totalPrice:[unit ? unit.unit_quantity * unit.unit_price : 0],
      });
  
      this.units.push(unitGroup);
    }
  
    updateData() {
      if (this.unitForm.valid) {
          this.service.updateCompany(this.id, this.unitForm.value).subscribe({
              next: (response) => {
                  console.log('Update successful', response);
                  alert('Company updated successfully!');
  
                  this.router.navigateByUrl('/showdata', { skipLocationChange: true }).then(() => {
                      this.router.navigate(['/showdata']);
                  });
              },
              error: (error) => {
                  console.error('Update failed', error);
                  alert('Failed to update company');
              }
          });
      } else {
          console.log('Form is invalid', this.unitForm.errors);
          alert('Please fill all required fields');
      }
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
