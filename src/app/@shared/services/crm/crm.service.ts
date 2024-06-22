
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/app/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CrmService {

  databaseKey;
  constructor(private http: HttpClient) {
    this.databaseKey = environment.servralUrl;
  }

  getCreateModule() {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getCreateModule`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getLeadFormSetup() {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getLeadFormSetup`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getFieldType() {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getFieldType`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  leadFormSetup(body: any) {
    return this.http.post<any>(`${this.databaseKey}/api/v1/leadFormSetup`, body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getProductName() {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getProductName`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getLeadData(query: any, login_id: any) {
    let queryTitle = '';
    if (query == 1) {
      queryTitle = 'today_follow_up'
    } else if (query.query == 'id') {
      queryTitle = 'id';
      query = query?.id;
    }
    else {
      queryTitle = 'missed_follow_up'
    }
    return this.http.get<any>(`${this.databaseKey}/api/v1/getLeadData?${queryTitle}=${query}&login_id=${login_id}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getStatusData() {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getStatusData`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getFieldName() {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getFiledName`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createLead(body: any) {
    return this.http.post<any>(`${this.databaseKey}/api/v1/createLead`, body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  uploadDoc(body: any) {
    return this.http.post<any>(`${this.databaseKey}/uploadDoc`, body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateLeadFormSetup(body: any) {
    return this.http.patch<any>(`${this.databaseKey}/api/v1/updateLeadFormSetup`, body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createFormFieldValue(body: any, query: any) {
    return this.http.post<any>(`${this.databaseKey}/api/v1/createFormFieldValue?lead_form_id=${query}`, body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getStatusName(query: any) {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getStatusName/${query}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getFormDetails() {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getFormDetails`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  registrationall() {
    return this.http.get<any>(`${this.databaseKey}/api/auth/registrationall`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  viewDescription(query: any) {
    return this.http.get<any>(`${this.databaseKey}/api/v1/viewDescription/${query}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateLeadData(query: any, body: any) {
    return this.http.patch<any>(`${this.databaseKey}/api/v1/updateLeadData/${query}`, body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getLeadSummaryData(data: any, login_id: any) {
    let url = '';
    let user_id = `${data?.user_id ? `user_id=${data?.user_id}&` : ''}`;
    let form_date = `${(data?.from_date && data?.from_date != 'Invalid date') ? `from_date=${data?.from_date}&` : ''}`;
    let to_date = `${(data?.to_date && data?.to_date != 'Invalid date') ? `to_date=${data?.to_date}&` : ''}`;
    let status = `${data?.status ? `status=${data?.status}&` : ''}`;
    url = user_id + form_date + to_date + status;
    return this.http.get<any>(`${this.databaseKey}/api/v1/getLeadSummaryData?${url.slice(0, -1)}&login_id=${login_id}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getLeadStatusData() {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getLeadStatusData`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createLeadSummary(body: any) {
    return this.http.post<any>(`${this.databaseKey}/api/v1/createLeadSummary`, body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  branchSetup_get() {
    return this.http.get<any>(`${this.databaseKey}/api/v1/branchSetup_get`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getByBranchIdroleMaster(query: any) {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getByBranchIdroleMaster/${query}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getAllproduct() {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getAllproduct`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

}
