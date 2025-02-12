import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserFormComponent } from "./user-form/user-form.component";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ComplexFormComponent } from './complex-form/complex-form.component';
import { CompanyDataComponent } from './company-data/company-data.component';

@Component({
  selector: 'app-root',
  imports: [ CompanyDataComponent,CommonModule,ComplexFormComponent,RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Reactiveform';
}
