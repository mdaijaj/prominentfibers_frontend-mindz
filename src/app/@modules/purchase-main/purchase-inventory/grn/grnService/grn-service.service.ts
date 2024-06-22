import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';




const databaseKey: any = environment.servralUrl;

const routes = {
  getPoList:{
    getAllPoList:()=>`${databaseKey}/api/v1/get_all_po`,
    getPoListById:(id:any)=>`${databaseKey}/api/v1/get_all_po_id/${id}`
  },
  createCode:{
    createCodeStatus:(id:any)=>`${databaseKey}/api/v1/createCode/${id}`
  },
  createGrnItem:{
    createItemGrn:()=>`${databaseKey}/api/v1/createdata_grn`,
    getAllGrnItems:(id:any)=>`${databaseKey}/api/v1/get_all_po_id/${id}`
  },
  createGrnData:{
    createGrnData:()=>`${databaseKey}/api/v1/createGRN`,
    updateGrnItem:(id:any)=>`${databaseKey}/api/v1/updateData_GRN/${id}`
    
  },
  getByIdItem:{
    getByIdItem:(id:any)=>`${databaseKey}/api/v1/get_all_grnItem_id/${id}`
  }
 
}

@Injectable({
  providedIn: 'root'
})
export class GrnServiceService {

  constructor(private _httpClint:HttpClient) { }


getAllPoList(){
  return this._httpClint.get(routes.getPoList.getAllPoList())
}


getPoListById(id:any){
  return this._httpClint.get(routes.getPoList.getPoListById(id))
}
createCode(id:any){
  return this._httpClint.get(routes.createCode.createCodeStatus(id))
}


createGrnItem(data:any){
    return this._httpClint.post(routes.createGrnItem.createItemGrn(),data)
}

getAllGrnItems(id:any){
  return this._httpClint.get(routes.createGrnItem.getAllGrnItems(id))
}

createGrnData(data:any){
  return this._httpClint.post(routes.createGrnData.createGrnData(),data)
}

getByIdItem(id:any){
  return this._httpClint.get(routes.getByIdItem.getByIdItem(id))
}
updateGrnItem(id:any,data:any){
  return this._httpClint.put(routes.createGrnData.updateGrnItem(id),data)
}

}
