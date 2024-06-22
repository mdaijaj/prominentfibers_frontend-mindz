import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Observable, Subject } from 'rxjs'
const databaseKey: any = environment.servralUrl;
const routes = {
  auditor_evaluation: {
    create_auditorEvaluation: () => `${databaseKey}/api/v1/create_auditor_evoluation`,
    getAll_auditorMapping: () => `${databaseKey}/api/v1/getAll_auditorMapping`,


    //receivedMandays
  },
  auditorBooking: {
    receivedMandays: () => `${databaseKey}/api/v1/lead_management`,
    getAuditorList: () => `${databaseKey}/api/v1/get_lead_pre_audit_stage_list`,
  
    
  },
  // LMS_notification: {
  //   create_notification: () => `${databaseKey}/api/v1/LMS_notification`,
  //   get_EmployeeDetails: (id: any) => `${databaseKey}/api/auth/userbyid/${id}`,
  //   getAll_EmployeeDetails: () => `${databaseKey}/api/auth/registrationall`,
  //   edit_notification: (id: any) => `${databaseKey}/api/v1/edit_LMS_notification/${id}`,
  //   get_notification: (id: any) => `${databaseKey}/api/v1/getLMS_notification/${id}`,
  //   delete_notification: () => `${databaseKey}/api/v1/delete_LMS_notification`,
  // },
  // CP_notification: {
  //   create_notificationCP: () => `${databaseKey}/api/v1/cp_notification`,
  //   edit_notificationCP: (id: any) => `${databaseKey}/api/v1/edit_cp_notification/${id}`,
  //   get_notificationCP: (id: any) => `${databaseKey}/api/v1/getcp_notification/${id}`,
  //   delete_notificationCP: () => `${databaseKey}/api/v1/delete_cp_notification`,
  // }
}
@Injectable({
  providedIn: 'root'
})
export class AuditorEvaluationService {
  constructor(private http: HttpClient) { }

  getAll_auditorMapping(data: any): Observable<any> {
    return this.http.post<any>(routes.auditor_evaluation.getAll_auditorMapping(),data);
  }

  create_auditorEvaluation(data:any): Observable<any> {
    return this.http.post<any>(routes.auditor_evaluation.create_auditorEvaluation(),data);
  }

  receivedMandays(data:any): Observable<any> {
    return this.http.post<any>(routes.auditorBooking.receivedMandays(),data);
  }
  getAuditorList(data:any): Observable<any> {
    return this.http.post<any>(routes.auditorBooking.getAuditorList(),data);
  }

  

}
