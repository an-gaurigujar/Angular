import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));




//complex-form

// import { bootstrapApplication } from '@angular/platform-browser';
// import { ComplexFormComponent } from './app/complex-form/complex-form.component';
// import { provideForms } from '@angular/forms';

// bootstrapApplication(ComplexFormComponent, {
//   providers: [provideForms()]
// });
