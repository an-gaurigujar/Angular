import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-data',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './show-data.component.html',
  styleUrl: './show-data.component.css'
})
export class ShowDataComponent {
  data: any=[];
  constructor(private router: Router) {
    // this.data = JSON.parse(localStorage.getItem('data'));
    // console.log(this.data);
    // this.data.forEach(unit => {
    //   this.addUnit(unit);
    // });
    const data = localStorage.getItem('data');
    if(data){
      this.data = JSON.parse(data);
    }

   }
   editTable(index: number): void {
    console.log('Edit table at index:', index);
    this.router.navigateByUrl(`/edit/${index}`)


  }
  deleteData(index: number): void {
    console.log('Delete table at index:', index);
    this.data.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(this.data));
  }
  clearAll(): void {
    localStorage.clear();
    this.data = [];
  }
}