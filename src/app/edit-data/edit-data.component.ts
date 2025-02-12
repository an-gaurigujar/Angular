import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-data',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './edit-data.component.html',
  styleUrl: './edit-data.component.css'
})
export class EditDataComponent implements OnInit  {


   unitForm: FormGroup;
    allData: any = [];
    currentIndex = null;
    id: any;
    constructor(private fb: FormBuilder,private route: ActivatedRoute,private router: Router) {
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
      console.log("Id=>",this.id);

      const data = localStorage.getItem('data');
      if (data) {
        this.allData = JSON.parse(data);
        console.log(this.allData[this.id]);
      }

      this.unitForm.patchValue({
        companyName: this.allData[this.id].companyName,
        country: this.allData[this.id].country,
        street: this.allData[this.id].street,
        city: this.allData[this.id].city,
        state: this.allData[this.id].state
      });
      if (this.allData[this.id].units && this.allData[this.id].units.length > 0) {
        this.allData[this.id].units.forEach((unit: any) => {
          this.addUnit(unit);            
        });
      }


      
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
  
    
    updateData(){
     
      this.allData[this.id] = this.unitForm.value;
      localStorage.setItem('data', JSON.stringify(this.allData));
      console.log("Updated Data=>",this.allData[this.id]);
      this.resetForm();
      this.router.navigateByUrl('/showdata');

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