import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost/company/index.php';

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<any> {
    return this.http.get(`${this.apiUrl}?action=getCompanies`);
  }
  getSpecificOne(id: any) {
    return this.http.get<any>(`${this.apiUrl}?id=${id}`);
}

  insertCompany(data: any): Observable<any> {
    return this.http.post<any>('http://localhost/company/index.php?action=insertCompany', data);
  }

  updateCompany(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}?action=updateCompany&id=${id}`, data, {
        headers: { 'Content-Type': 'application/json' }
    });
}


  deleteCompany(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?action=deleteCompany&id=${id}`);
  }
  
}
