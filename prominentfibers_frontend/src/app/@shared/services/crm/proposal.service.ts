
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/app/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  databaseKey;
  constructor(private http: HttpClient) {
    this.databaseKey = environment.servralUrl;
  }

  createProposal(body: any) {
    return this.http.post<any>(`${this.databaseKey}/api/v1/createProposal`, body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getProposalCompanyData(query: any) {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getProposalCompanyData/${query}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getProposalList(query: any, type: any, login_id: any) {
    let url = ""
    if (query && type == "status") url = `status=${query}`;
    if (query && type == "proposal_no") url = `id=${query}`;
    return this.http.get<any>(`${this.databaseKey}/api/v1/getProposalList?${url}${url ? '&' : ''}login_id=${login_id}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateProposalStatus(body: any) {
    return this.http.patch<any>(`${this.databaseKey}/api/v1/updateProposalStatus`, body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createProposalPayment(body: any) {
    return this.http.post<any>(`${this.databaseKey}/api/v1/createProposalPayment`, body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateProposalPayment(body: any) {
    return this.http.patch<any>(`${this.databaseKey}/api/v1/updateProposalPayment`, body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  deleteProposalPayment(body: any) {
    return this.http.delete<any>(`${this.databaseKey}/api/v1/deleteProposalPayment?id=${body?.id}&proposal_id=${body?.proposal_id}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getProposalPaymentList(query: any) {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getProposalPaymentList/${query}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createBilling(body: any) {
    return this.http.post<any>(`${this.databaseKey}/api/v1/createBilling`, body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createInvoice(body: any) {
    return this.http.post<any>(`${this.databaseKey}/api/v1/createInvoice`, body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getInvoiceList(query: any) {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getInvoiceList/${query}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getUpdatedAddress() {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getUpdatedAddress`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  proposalVersionList( proposal_id: any) {
    return this.http.get<any>(`${this.databaseKey}/api/v1/proposalVersionList?id=${proposal_id}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  dealCloseVersionByLeadId(lead_id: any, login_id: any) {
    return this.http.get<any>(`${this.databaseKey}/api/v1/dealCloseVersionByLeadId?lead_id=${lead_id}&login_id=${login_id}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createDealClosed(body: any) {
    return this.http.post<any>(`${this.databaseKey}/api/v1/createDealClosed`, body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getDealClosedList(login_id: any) {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getDealClosedList?login_id=${login_id}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  proposalVersionListById(version_id: any, proposal_id: any) {
    return this.http.get<any>(`${this.databaseKey}/api/v1/proposalVersionListById?id=${version_id}&proposal_id=${proposal_id}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

}
