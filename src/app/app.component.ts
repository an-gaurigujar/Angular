import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { EditDataComponent } from './edit-data/edit-data.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, RouterLink,],
})
export class AppComponent {
  title = 'Angular App';
}
