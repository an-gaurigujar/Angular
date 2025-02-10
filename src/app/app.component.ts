import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserFormComponent } from "./user-form/user-form.component";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ComplexFormComponent } from './complex-form/complex-form.component';

@Component({
  selector: 'app-root',
  imports: [ UserFormComponent,CommonModule,ComplexFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Reactiveform';
}
