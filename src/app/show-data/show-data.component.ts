import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-show-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-data.component.html',
  styleUrl: './show-data.component.css'
})
export class ShowDataComponent implements OnInit {
  userData: any = [];

  constructor(private router: Router, private services: ApiService) {}

  ngOnInit(): void {
    this.currentEntity();  
  }
currentEntity() {
    this.services.getCompanies().subscribe(
      (data: any) => {
        console.log("API Response:", data);
        this.userData = this.transformData(data); 
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
  }

  deleteCompany(id: number) {
    if (confirm("Are you sure you want to delete this company?")) {
      this.services.deleteCompany(id).subscribe(
        () => {
          alert("Company deleted successfully!");  // Optionally alert the user
          this.currentEntity();  // Refresh the list
        },
        (error) => {
          console.error("Error deleting company:", error);
        }
      );
    }
  }
  
  

  editCompany(id: number) {
    this.router.navigate(['/edit', id]);
  }
  
  private transformData(data: any) {
    const companiesMap = new Map();

    data.forEach((row: any) => {
      if (!companiesMap.has(row.id)) {
        companiesMap.set(row.id, {
          id: row.id,
          company_name: row.company_name,
          country: row.country,
          street: row.street,
          city: row.city,
          state: row.state,
          units: row.units,
        });
      }

      if (row.unit_name) {
        companiesMap.get(row.id).units.push({
          unit_name: row.unit_name,
          unit_quantity: row.unit_quantity,
          unit_price: row.unit_price
        });
      }
    });

    return Array.from(companiesMap.values());
  }
}
