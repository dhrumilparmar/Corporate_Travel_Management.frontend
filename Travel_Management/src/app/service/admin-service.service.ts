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
  private updateEmployeeUrl = 'http://localhost:8080/api/employee/updateEmployee';
  private getTravelRequestsUrl = 'http://localhost:8080/travelrequest/requests';
  private deleteTravelReqUrl = 'http://localhost:8080/travelrequest/deleteRequest';
  private createTravelReqUrl = 'http://localhost:8080/travelrequest/createRequest';

  private getEmployeeByIdUrl = 'http://localhost:8080/api/employee/profile';

  private getAllManagers = 'http://localhost:8080/api/employee/getManager';

  private updateReq = 'http://localhost:8080/travelrequest/updateRequest';


  updateTravelReq(updatedata: any): Observable<any> {
    return this.http.put<any>(`${this.updateReq}`, updatedata);
  }

  getEmployeeById(employeeId: any): Observable<any> {
    return this.http.get<any>(`${this.getEmployeeByIdUrl}/${employeeId}`);
  }


  getAllEmployees():Observable<any>{
    return this.http.get<any>(`${this.AllEmployeeapiUrl}`)
  }

  createEmployee(employeedata:any):Observable<any>{
    return this.http.post<any>(`${this.createEmployeeUrl}`,employeedata)
  }

  deleteEmployee(employeeId: any): Observable<any> {
    return this.http.delete(`${this.deleteEmployeeUrl}/${employeeId}`);
  }

  updateEmployee(employeeId: any, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.updateEmployeeUrl}/${employeeId}`, updatedData);
  }
  getTravelRequests(employeeId: any): Observable<any> {
    return this.http.get<any>(`${this.getTravelRequestsUrl}/${employeeId}`)
  }

  deleteTravelReq(travelReq:any): Observable<any>{
    return this.http.delete<any>(`${this.deleteTravelReqUrl}/${travelReq}`)
  }

  createTravelReq(travelFormdata:any): Observable<any>{
    return this.http.post<any>(`${this.createTravelReqUrl}`, travelFormdata)
  }

  getManagers(): Observable<any> {
    return this.http.get<any>(`${this.getAllManagers}`);
  }
}
