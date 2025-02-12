import { Routes } from '@angular/router';
import { CompanyDataComponent } from './company-data/company-data.component';
import { EditDataComponent } from './edit-data/edit-data.component';
import { ShowDataComponent } from './show-data/show-data.component';

export const routes: Routes = [
    {
        path: 'company',
        component: CompanyDataComponent,
    },
    {
        path: 'edit/:id',
        component: EditDataComponent,
    },
    // {
    //     path: '',
    //     redirectTo: 'company',
    //     pathMatch: 'full'
    // }
    {
        path: 'show',
        component: ShowDataComponent,
    }
];
