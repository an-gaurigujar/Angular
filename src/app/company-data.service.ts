import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',  
})
export class CompanyDataService { 

  constructor(private http: HttpClient) {}
  getApi(){
    return this.http.get<any>('http://localhost:3004/user');
  }
  postApi(data:any){
    return this.http.post<any>('http://localhost:3004/user',data);
  }
  getSpecificApi(id:any){
    return this.http.get<any>(`http://localhost:3004/user/${id}`);
  }
  deleteApi(id:any){
    return this.http.delete<any>(`http://localhost:3004/user/${id}`);
  }
  updateApi(id:any,data:any){
    return this.http.put<any>(`http://localhost:3004/user/${id}`,data);
  }
}

// GET API = http://localhost:3004/user
