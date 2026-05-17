import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: HttpClient) { }

  private AllEmployeeapiUrl = 'http://localhost:8080/api/employee/getAll'; 
  private createEmployeeUrl = 'http://localhost:8080/api/employee/createEmployee';
  private deleteEmployeeUrl = 'http://localhost:8080/api/employee/deleteEmployee';

  getAllEmployees():Observable<any>{
    return this.http.get<any>(`${this.AllEmployeeapiUrl}`)
  }

  createEmployee(employeedata:any):Observable<any>{
    return this.http.post<any>(`${this.createEmployeeUrl}`,employeedata)
  }

  deleteEmployee(employeeId: any): Observable<any> {
    return this.http.delete(`${this.deleteEmployeeUrl}/${employeeId}`);
  }
}
