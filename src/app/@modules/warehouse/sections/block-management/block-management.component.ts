import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { warehouseListService } from 'src/app/@shared/services/warehouse/warehouse-list.service';
import { ToastrService } from 'ngx-toastr';
import { BlockActionComponent } from '../block-action/block-action.component';
import { BayRowTextFieldComponent } from '../bay-row-text-field/bay-row-text-field.component';

@Component({
  selector: 'app-block-management',
  templateUrl: './block-management.component.html',
  styleUrls: ['./block-management.component.scss']
})
export class BlockManagementComponent {
  button1: any;
  button2: any;
  rowClass: any;
  selectedBlocks: any;
  blockCountInput: any;
  blockList: any;
  addResponse: any;
  rowData: any;

  newBlockCount: Number;
  newWarehouseName: Number;
  newPlantName: Number;


  warehouseData: any;
  plantData: any;
  selectedWarehouseName: any;
  selectedPlantName: any;

  bayId: any;
  rowUpdationData: any;
  rowTextField: any;
  inputRowData: any;
  addResponse2: any;
  constructor(
    private router: Router,
    private $warehouseList: warehouseListService,
    private toast: ToastrService,
  ) {
    this.rowClass = 'rowClass';
  }

  ngOnInit() {

    this.getPlantList();

    if (this.bayId == "null") {
      if (this.blockList.length > 0) localStorage.setItem("bayId", this.blockList[0].bay_id)
    }
    this.bayId = localStorage.getItem("bayId");

    this.blockCountInput = localStorage.getItem("selectedBlockCount");
    if (!this.blockCountInput) {
      this.blockCountInput = 0;
      localStorage.setItem("selectedBlockCount",this.blockCountInput)
    }
    this.selectedWarehouseName = localStorage.getItem("selectedBlockWarehouse");
    this.selectedPlantName = localStorage.getItem("selectedBlockPlant");
    this.newBlockCount = Number(this.blockCountInput);
    this.newWarehouseName = Number(this.selectedWarehouseName)
    this.newPlantName = Number(this.selectedPlantName)
    if(this.newPlantName) {
      this.getWarehouseByPlant()
    }

    this.rowData = [];
    this.rowUpdationData = [];
    this.rowTextField = [];
    this.blockList = [];

    if (this.newBlockCount && (this.bayId != "null")) {
      this.getBlockList(false,true);
    }
  }

  redirect1() {
    // this.router.navigate(["master/warehouse-management/warehouse-list/warehouse-list"]);
  }

  redirect2() {
    this.router.navigate(["master/warehouse-management/bay-management"]);
  }

  public dataSource = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  onSelectedBlocks(event: any) {
    this.blockCountInput = event.value;
    localStorage.setItem("selectedBlockCount", this.blockCountInput);
  }


  save(body: any,flag:any=false) {
    try {
      this.bayId = String(this.bayId)
      if (this.bayId != "null") {
        this.bayId = Number(this.bayId)
        this.$warehouseList.updateBay(body, this.bayId).subscribe((response: any) => {
          if (response) {
            this.addResponse = response;
            this.toast.success('Block list created', 'Block list creation successful');
            if ( !flag )  this.getBlockList(true);
            localStorage.setItem("selectedBlock","0")
          }
        }, (err: any) => {
          this.toast.error('Something went wrong', 'Something went wrong');
          console.log(err);
        })
      } else {
        this.$warehouseList.createBay(body).subscribe((response: any) => {
          if (response) {
            this.addResponse = response;
            localStorage.setItem("selectedBlock","0")
            this.bayId = response.id;
            localStorage.setItem("bayId", response.id)
            let x = localStorage.getItem("bayId")
            this.toast.success('Block list created', 'Block list creation successful');
            if ( !flag )  this.getBlockList(true);
          }
        }, (err: any) => {
          this.toast.error('Something went wrong', 'Something went wrong');
          console.log(err);
        })
      }
    } catch (error) {
      this.toast.error('Something went wrong', 'Something went wrong');
      console.log(error);
    }
  }

  createBayManagement(body:any,flag:any=false){
    this.$warehouseList.createBay(body).subscribe((response: any) => {
      let x = response;
      if (response) {
        this.addResponse2 = response;
        localStorage.setItem("selectedBlock","0")
        this.bayId = response.id;
        localStorage.setItem("bayId", response.id)
        let x = localStorage.getItem("bayId")
        if ( !flag ) {
          this.getBlockList(true);
        } else {
          this.getBlockList(true,true);
        }
        this.toast.success('Bay Management created', 'Bay Management creation successful');
      }
    }, (err: any) => {
      this.toast.error('Something went wrong', 'Something went wrong');
      console.log(err);
    })
  }

  public columnDefs = [
    {
      headerName: 'Block Name',
      field: 'block_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'No of Bay',
      field: 'no_of_bays',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      cellRenderer: BayRowTextFieldComponent,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
        onActionPerform: (data: any) => this.handleActionData(data),
      },
    },
    {
      headerName: 'Action',
      field: 'not decided',
      flex: 1,
      minWidth: 150,
      cellRenderer: BlockActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
        onActionPerform: (data: any, singleRowData: any) => this.handleActionData2(data),
      },
    },
  ];

  handleActionData(data: any) {
    this.rowData?.map((item: any) => {
      if (item?.id == data?.id) {
        item.no_of_bays = data?.no_of_bays;
      }
    })
  }

  handleActionData2(data: any) {
    this.rowData?.map((item: any) => {
      if (item?.id == data?.id) {
        item.isDisabled = false;
      }
    })
  }

  saveButton() {
    try {
      let reqList: any = [];
      this.rowData?.map((item: any) => {
        item.isDisabled = true;
        reqList.push({ id: item?.id, no_of_bays: item?.no_of_bays })
      });
      this.$warehouseList.editBlock(reqList).subscribe((response: any) => {
        if (response) {
          this.rowData?.map((item: any) => item.isDisabled = true);
          this.toast.success('Block Updates', 'Block updation successful');
          this.add(true);
        }
      }, (err: any) => {
        this.toast.error('Something went wrong', 'Something went wrong');
        console.log(err);
      })
    } catch (error) {
      this.toast.error('Something went wrong', 'Something went wrong');
      console.log(error);
    }

  }

  add(toBeDisabled:any=false) {
    localStorage.setItem("selectedBlock","0")
      if (this.blockList?.length < this.blockCountInput) {
        let reqBody = {
          "total_no_of_block": this.blockCountInput,
          "warehouse_id": this.selectedWarehouseName,
          "plant_id": this.selectedPlantName,
          "blockList": [],
          "blockBayList": []
        }
        let reqBodyBlockList: any = []
        let reqBodyRackList: any = []
        for (let i = this.blockList.length + 1, j = 0; i <= this.blockCountInput; i++) {
          //create block with name i
          let x = {
            block_name: "Block" + i.toString(),
            no_of_bays: null,
            isDeleted: false
          }
          reqBodyBlockList[j] = x;
          j++;
        }
        reqBody.blockList = reqBodyBlockList;
        reqBody.blockBayList = reqBodyRackList;
        this.save(reqBody)
      } else {
        this.rowData = []
        this.inputRowData = []
        let i = 0;
        for (i = 1; i <= this.blockCountInput; i++) {
          this.rowData[i - 1] = this.blockList[i - 1];
          this.rowData[i - 1].isDeleted = false;
          if ( toBeDisabled == false ) {
            this.rowData[i - 1].isDisabled = false;
          }
          if ( toBeDisabled == true ) {
            this.rowData[i - 1].isDisabled = true;
          }

          this.$warehouseList.editBlock(this.rowData).subscribe((response: any) => {
            if (response) {
             
            }
          }, (err: any) => {
            this.toast.error('Something went wrong', 'Something went wrong');
            console.log(err);
          })

        }

        let reqBodyBlockList: any = []
        let k = 0;
        for ( let j = i; j <= this.blockList.length; j++ ) {
          let x = {
            id: this.blockList[j-1].id,
            block_name: this.blockList[j-1].block_name,
            no_of_bays: this.blockList[j-1].no_of_bays,
            isDeleted: true
          }
          reqBodyBlockList[k] = x;
          k++;
        }
        this.$warehouseList.editBlock(reqBodyBlockList).subscribe((response: any) => {
          if (response) {
           
          }
        }, (err: any) => {
          this.toast.error('Something went wrong', 'Something went wrong');
          console.log(err);
        })
      }
  }

  refresh() {
    this.rowData = []
      if (this.blockList?.length < this.blockCountInput){
        for (let i = 0; i < this.blockList.length; i++) {
          this.rowData[i] = this.blockList[i];
          this.rowData[i].isDisabled = false;
        }
      } else {
        this.rowData = []
        for (let i = 1; i <= this.blockCountInput; i++) {
          this.rowData[i - 1] = this.blockList[i - 1];
          this.rowData[i - 1].isDisabled = false;
        }
      }
  }

  getBlockList(flag = false,isRefresh=false) {
    this.$warehouseList.getAllBlocks(this.bayId).subscribe((response: any) => {
      if (response) {
        this.blockList = response.data;
        if ( isRefresh ){
          this.refresh()
        }else {
          this.add(false);
        }
      }
    })
  }

  getWarehouseByPlant() {
    try {
      this.$warehouseList.getWarehouseByPlant(this.newPlantName).subscribe((response: any) => {
        if (response) {
          this.warehouseData = response.data;
        }
      }, (err: any) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }



  getPlantList() {
    try {
      this.$warehouseList.getAllPlants().subscribe((response: any) => {
        if (response) {
          this.plantData = response.data;
        }
      }, (err: any) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  onSelectedPlantName(event: any) {
    this.selectedPlantName = event.value
    localStorage.setItem("selectedBlockPlant", this.selectedPlantName);
    this.getWarehouseByPlant()
    // this.createBayManagement(reqBody)
    // this.getEmployeesList(this.selectedRole);
  }

  onSelectedWarehouseName(event: any) {
    this.selectedWarehouseName = event.value
    localStorage.setItem("selectedBlockWarehouse", this.selectedWarehouseName);
    this.getBayManagementFromPlantAndWarehouse();

    this.blockCountInput = 0;
    this.blockList = [];
    this.rowData = [];
    this.newBlockCount = Number(this.blockCountInput)
    localStorage.setItem("selectedBlockCount",this.blockCountInput);

    // this.getEmployeesList(this.selectedRole);
    let reqBody = {
      "total_no_of_block": null,
      "warehouse_id": this.selectedWarehouseName,
      "plant_id": this.selectedPlantName,
      "blockList": [],
      "blockBayList": []
    }
    // this.createBayManagement(reqBody)
  }

  getBayManagementFromPlantAndWarehouse(){
    try {
      this.$warehouseList.getBayManagementByPlantAndWarehouse(this.newPlantName,this.newWarehouseName).subscribe((response: any) => {
        if (response) {
          if ( !response.data ) {
            let reqBody = {
              "total_no_of_block": null,
              "warehouse_id": this.selectedWarehouseName,
              "plant_id": this.selectedPlantName,
              "blockList": [],
              "blockBayList": []
            }
            this.createBayManagement(reqBody,true)
          }else {
            localStorage.setItem("bayId", response.data.id)
            this.bayId = response.data.id;
            this.toast.success('Bay Id updates', 'Bay Id fetch successful');
            this.getBlockList(true);
          }
        }
      }, (err: any) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    } 
  }

}


