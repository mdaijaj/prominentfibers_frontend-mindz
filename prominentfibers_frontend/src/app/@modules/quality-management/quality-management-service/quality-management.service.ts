import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

const databaseKey: any = environment.servralUrl;

const routes = {
  qualityCheck:{
    getQualityCheckData:(id:any)=>`${databaseKey}/api/v1/getRepeatByIDquality/${id}`,
    updateQualityCheck:(id:any)=>`${databaseKey}/api/v1/updateQuality/${id}`,
    getQualityChartData:(id:any)=>`${databaseKey}/api/v1/getRepeatByIDquality/${id}`
    
  }
}


@Injectable({
  providedIn: 'root'
})
export class QualityManagementService {


  constructor(private _http:HttpClient) { }


 getQualityCheckById(id:any){
  return this._http.get(routes.qualityCheck.getQualityCheckData(id))
 }
 updateQualityCheck(id:any,data:any){
  return this._http.put(routes.qualityCheck.updateQualityCheck(id),data)
 }
  

 getQualityChartData(id:any){
  return this._http.get(routes.qualityCheck.getQualityChartData(id))
 }



}
