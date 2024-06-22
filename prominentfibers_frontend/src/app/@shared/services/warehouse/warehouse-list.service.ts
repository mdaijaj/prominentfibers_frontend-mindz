
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/app/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class warehouseListService {
  databaseKey;
  constructor(private http: HttpClient) {
    // this.databaseKey = environment.servralUrl;
    this.databaseKey = "https://emerpapi.elitetraveltech.in"
    // this.databaseKey = "http://192.168.20.232:5000";
  }

  getAllPlants() {
    return this.http.get<any>(`${this.databaseKey}/api/v1/plant_getAll`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }


  getAllRolesByName(query: any) {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getAllRoleMaster/${query}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getAllEmployeesByRole(query: any) {
    return this.http.get<any>(`${this.databaseKey}/api/v1/get_all_employeeBy_User_role/${query}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createWarehouse(body: any) {
    return this.http.post<any>(`${this.databaseKey}/api/v1/createWarehouse`, body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getAllWarehouse() {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getWarehouseList`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  
  editWarehouse(body: any) {
    return this.http.put<any>(`${this.databaseKey}/api/v1/editWarehouse`,body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getWarehouseById(query:any) {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getWarehouseById/${query}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getAllBlocks(query:any) {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getBayBlockList/${query}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createBlockList(body: any) {
    return this.http.post<any>(`${this.databaseKey}/api/v1/getBayBlockList`,body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createBay(body: any) {
    return this.http.post<any>(`${this.databaseKey}/api/v1/createBayManagement`,body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateBay(body: any,bay_id:any=null,block_id:any=null) {
    if ( block_id && bay_id ) {
      return this.http.put<any>(`${this.databaseKey}/api/v1/updateBayManagement?block_id=${block_id}&bay_id=${bay_id}`,body).pipe(
        map((response: any) => {
          return response;
        })
      );
    }else {
      return this.http.put<any>(`${this.databaseKey}/api/v1/updateBayManagement?bay_id=${bay_id}`,body).pipe(
        map((response: any) => {
          return response;
        })
      );
    }
  }

  getBayList(query:any) {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getBayBlockBayList/${query}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getBlockById(query:any) {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getBayBlock/${query}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  editBlock(body:any) {
    return this.http.put<any>(`${this.databaseKey}/api/v1/editBayBlock`,body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getBayById(query:any) {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getBayBlockBay/${query}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  editBayBlockBay(body:any,query:any) {
    return this.http.put<any>(`${this.databaseKey}/api/v1/editBayBlockBay/${query}`,body).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  // /api/v1/getBayManagementList
  getBayManagementList() {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getBayManagementList`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getWarehouseByPlant(query:any) {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getWarehouseByPlant/${query}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getBayManagementByPlantAndWarehouse(plant_id:any,warehouse_id:any) {
    return this.http.get<any>(`${this.databaseKey}/api/v1/getBayManagementByPlantAndWarehouse?plant_id=${plant_id}&warehouse_id=${warehouse_id}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

}
