import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: HttpClient) { }

  private LoginUrl = 'http://localhost:8080/rest/auth/login';

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

  private getAllFinanceApproved = 'http://localhost:8080/travelrequest/expenseList';


  private addExpenseUrl = 'http://localhost:8080/travelrequest/expenses';


  //manger

  private getAllTrReqViewUrl= 'http://localhost:8080/rest/manager/{managerId}/pending-requests';
  
  getTravelReqView(managerId: any): Observable<any> {
    return this.http.get<any>(`${this.getAllTrReqViewUrl.replace('{managerId}', managerId)}`);
  }


  private approveReqUrl = 'http://localhost:8080/rest/manager/process-approval';

  approveRequest(approvalData: any): Observable<any> {
    return this.http.post<any>(this.approveReqUrl, approvalData);
  }

  private getAllTrForManagerUrl = 'http://localhost:8080/rest/manager/allrequest';



  getAllManagerReq(managerId: any): Observable<any> {
    return this.http.get<any>(`${this.getAllTrForManagerUrl}/${managerId}`);
  }

  //EMPLOYYEE N travelrequest
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


  getAllFinanceApprovedExpense(employeeid: any): Observable<any> {
    return this.http.get<any>(`${this.getAllFinanceApproved}/${employeeid}`);
  }

  saveExpenseById(bills: any): Observable<any>{
    return this.http.post<any>(`${this.addExpenseUrl}`, bills);
  }


  //finance


  private getAllTrReqFinanceUrl = 'http://localhost:8080/rest/finance/manager-approved-pending';

  getAllManagerApprovedReq(): Observable<any> {
    return this.http.get<any>(`${this.getAllTrReqFinanceUrl}`);
  }

  private processFinanceReqUrl = 'http://localhost:8080/rest/finance/process-approval';

  processFinanceRequest(requestData: any): Observable<any> {
    return this.http.post<any>(`${this.processFinanceReqUrl}`, requestData);
  }

  private getAllTrReqFinanceApprovedUrl = 'http://localhost:8080/rest/finance/AllApprovedReq';
  getAllFinanceApprovedReq(financeId: any): Observable<any> {
    return this.http.get<any>(`${this.getAllTrReqFinanceApprovedUrl}/${financeId}`);
  }



    login(data: any): Observable<any> {
    return this.http.post<any>(`${this.LoginUrl}`, data);
  }

    saveLoginData(response: any): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('employeeId', response.employeeId.toString());
    localStorage.setItem('employeeName', response.employeeName);
    localStorage.setItem('userEmail', response.userEmail);
    localStorage.setItem('role', response.role);
  }

    getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.clear();
  }
}
