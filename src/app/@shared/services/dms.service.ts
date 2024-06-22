import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import {Subject} from 'rxjs'
import {HttpResponse} from '@angular/common/http';
// import {Http, ResponseContentType} from '@angular/http';
const databaseKey: any = environment.servralUrl;
const routes = {
  DMS: {
  //dqsdevapi.elitetraveltech.in/api/auth/userbyid/2
    list: () => `${databaseKey}/api/v1/getDocumentMaster`,
    createFile: () => `${databaseKey}/api/v1/createDocumentMaster`,
    updateFile: (document_master_id: any) =>`${databaseKey}/api/v1/editDocumentMaster/${document_master_id}`,
    downloadbyID: (document_master_id: any) => `${databaseKey}/api/v1/downloadDocumentMaster/${document_master_id}`,  
    getById: (document_master_id: any) => `${databaseKey}/api/v1/getByIdDocumentMaster/${document_master_id}`,
    deleteFile: (document_master_id: any) => `${databaseKey}/api/v1/deleteDocumentMaster/${document_master_id}`,
    downloadSingleFile: (fileName: any) => `${databaseKey}/api/v1/downloadDocumentMaster/${fileName}`,  
    loginID: (id: any) => `${databaseKey}/api/auth/userbyid/${id}`,
    
    // getById: (candidate_id: any) => `${databaseKey}/api/test/getByIdCondidate/${candidate_id}`,
    // createPdf: (bvg_id: any) => `${databaseKey}/api/test/getByIdDocumentMaster/${bvg_id}`,
    // createCandidate: () => `${databaseKey}/api/v1/createCandidates`,
    // createPdf: (bvg_id: any) => `${databaseKey}/api/v1/addUpdateDocumentMaster/${bvg_id}`,
    // userGetById: (document_master_id: any) => `${databaseKey}/api/v1/addUpdateDocumentMaster/${document_master_id}`,
  }
}
@Injectable({
  providedIn: 'root'
})
export class DMSService {

// public formFolder:any=new BehaviorSubject<any>('vrajesh');
 
// setFolderFormData(data:any){
//   this.formFolder.next(data)
// }
// getFolderFormData(){
// return this.formFolder;
// }

public formFolder:any=new Subject<any>();
 
setFolderFormData(data:any){
  this.formFolder.next(data)
}
getFolderFormData(){
return this.formFolder;
}

  // constructor(private http:HttpClient) { }
  // upload(file:any):Observable<any>{
  //   const formData=new FormData();
  //   formData.append('file',file,file.name);
  //   return this.http.post(this.baseUrl,formData)
  // }
    // urlHR="https://dqsapi.elitetraveltech.in/api/test/getAllCondidateProfile";
  // sendData(){
  //   return this.http.get<any>('urlHR');
  // }
 //DMS Api
 constructor(private http: HttpClient) { }


//  createPdf(bvg_id: any, file: File): Observable<any> {
//   const formData = new FormData();
  // this.newData = data.previousJobRow
  // this.newData = JSON.stringify(this.newData);
  // formData.append("precious_job_status",this.newData );
  // if (file) {
  //   formData.append('others_documents', file, file.name);
  // } else {
  //   formData.append('others_documents', 'undefined');
  // }
  // for (let key in data) {
  //   formData.append(`${key}`, data[key]);
  // }
  // formData.delete('previousJobRow');
  // 
  // 
  
  // return this.http.put(routes.DMS.createPdf(bvg_id),formData);
// }
getList():Observable<any>{
  return this.http.get<any>(routes.DMS.list());
}

createFileAndFoler(data:any):Observable<any>{
 return this.http.post<any>(routes.DMS.createFile(),data)
}
 AddById(document_master_id: any):Observable<any> {
   return this.http.get<any>(routes.DMS.getById(document_master_id));
 } 
 downloadbyID(document_master_id: any):Observable<any> {
  return this.http.get<any>(routes.DMS.downloadbyID(document_master_id));
}
downloadFile(): any {
  return this.http.get('http://localhost:8080/employees/download', {responseType: 'blob'});
}
updateFileAndFolder(id: any, data: any): Observable<any> {
  return this.http.put(routes.DMS.updateFile(id),data);
}
deleteFiles(document_master_id: any,data:any):Observable<any> {
  return this.http.put<any>(routes.DMS.deleteFile(document_master_id),data);
}
downloadSingleFiles(fileName: any):Observable<any> {
  return this.http.get<any>(routes.DMS.downloadSingleFile(fileName));
}
get_logIn_Admin_name(id: any):Observable<any> {
  return this.http.get<any>(routes.DMS.loginID(id));
} 
}