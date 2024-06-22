import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Subject } from 'rxjs'
const databaseKey: any = environment.servralUrl;
const routes = {
  SalesRequest: {
    getData_byBR: (br: any) => `${databaseKey}/api/v1/br_numberbyleadId/${br}`,
    getBR_byID: (id: any) => `${databaseKey}/api/v1/getbr_numberbyIdnewlocation/${id}`,
    parentLeadID: (id: any) => `${databaseKey}/api/v1/getleaddatabyleadId/${id}`,
    createSalesRequest:()=> `${databaseKey}/api/v1/create_sales_requestone`,
    getAllData: () => `${databaseKey}/api/v1/getAll_salesrequest`,
    Auditorlist: () => `${databaseKey}/api/v1/get_All_Auditor_Qualification`,
    getbyID_SalesRequest: (id: any) => `${databaseKey}/api/v1/getbyid_salesreqauditor_bookingsuest/${id}`,
    getParentData: (id: any) => `${databaseKey}/api/v1/getleaddatabyleadId/${id}`,
    AuditorBooking: () => `${databaseKey}/api/v1/create_auditor_booking`,
    auditorlist_byID: (id: any) => `${databaseKey}/api/v1/get_auditor_data_by_id/${id}`,
    //
    auditorList_idwise: (id: any) => `${databaseKey}/api/v1/getbyidauditorbooking/${id}`,
    getLocationGetbyID: (id: any) => `${databaseKey}/api/v1/getbyid_salesrequest_location/${id}`,

    getSalesRequestData:() => `${databaseKey}/api/v1/getbyleadandemployeeid_sales_requestone`,

    sendNotification:() => `${databaseKey}/api/v1/sales_Request_notification`,
    
    //
  }
}
@Injectable({
  providedIn: 'root'
})
export class SalesRequestService {


  constructor(private http: HttpClient) { }
//auditorList_idwise
auditorList_idwise(id: any): Observable<any> {
  return this.http.get<any>(routes.SalesRequest.auditorList_idwise(id));
}

getLocationGetbyID(id:any):Observable<any>{
  return this.http.get<any>(routes.SalesRequest.getLocationGetbyID(id))


}

  // createFile(document_master_id: any, data: any): Observable<any> {
  //   return this.http.put<any>(routes.SalesRequest.createFile(), data);
  // }
  getBR_byID(id: any): Observable<any> {
    return this.http.get<any>(routes.SalesRequest.getBR_byID(id));
  }
  getData_byBR(br: any): Observable<any> {
    return this.http.get<any>(routes.SalesRequest.getData_byBR(br));
  }
  createSalesRequest(data:any): Observable<any> {
    return this.http.post<any>(routes.SalesRequest.createSalesRequest(),data);
  }
  getAllData(): Observable<any> {
    return this.http.get<any>(routes.SalesRequest.getAllData());
  }
  Auditorlist(): Observable<any> {
    return this.http.get<any>(routes.SalesRequest.Auditorlist());
  }
  getbyID_SalesRequest(id: any): Observable<any> {
    return this.http.get<any>(routes.SalesRequest.getbyID_SalesRequest(id));
  }
  getParentData(id: any): Observable<any> {
    return this.http.get<any>(routes.SalesRequest.getParentData(id));
  }
  AuditorBooking(data: any): Observable<any> {
    return this.http.post<any>(routes.SalesRequest.AuditorBooking(),data);
  }
  auditorlist_byID(id: any): Observable<any> {
    return this.http.get<any>(routes.SalesRequest.auditorlist_byID(id));
  }
  getSalesRequestData(data: any): Observable<any> {
    return this.http.post<any>(routes.SalesRequest.getSalesRequestData(),data);
  }

  sendNotificationForSalesRequest(data: any): Observable<any> {
    return this.http.post<any>(routes.SalesRequest.sendNotification(),data);
  }
  //
}