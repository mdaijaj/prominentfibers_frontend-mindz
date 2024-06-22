import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { warehouseListService } from 'src/app/@shared/services/warehouse/warehouse-list.service';
import { ToastrService } from 'ngx-toastr';
import { BayActionComponent } from '../bay-action/bay-action.component';
import { BlockRowTextFieldComponent } from '../block-row-text-field/block-row-text-field.component';

@Component({
  selector: 'app-bay-management',
  templateUrl: './bay-management.component.html',
  styleUrls: ['./bay-management.component.scss']
})
export class BayManagementComponent {
  button1: any;
  button2: any;
  rowClass: any;
  blockListNames : any;
  selectedBlockName: any;
  bayCount: any;
  bayId: any;
  addListResponse: any;
  rowData: any;
  warehouseData: any;
  selectedWarehouse : any;
  selectedWarehouseName : Number;
  selectedPlantName: Number;
  selectedBlockCount : any;
  blockId: any;
  plantData: any;
  isDisabled: any;
  rowDataIsDelete : any;
  constructor( 
    private router: Router,
    private $warehouseList: warehouseListService,
    private toast: ToastrService,
  ) {
    this.rowClass = 'rowClass';
  }

  ngOnInit() {
    this.isDisabled = true;
    this.getWarehouse()
    this.getPlantList()
    this.selectedBlockName = Number(localStorage.getItem("selectedBlock"));
    this.bayCount = localStorage.getItem("bayCount");
    this.bayId = localStorage.getItem("bayId");
    if ( this.bayId ){
      this.getBlockList(this.bayId)
    }
    this.selectedWarehouseName = Number(localStorage.getItem("selectedBlockWarehouse"))
    this.selectedPlantName = Number(localStorage.getItem("selectedBlockPlant"));

    this.selectedBlockCount = Number(localStorage.getItem("selectedBlockCount"))
    this.rowData = []
    if ( this.selectedBlockName && this.selectedBlockName != 0) {
      this.getBlockById(this.selectedBlockName);
      // this.getBayList(true);
    }
    if ( this.selectedBlockName == 0){
      this.bayCount = 0;
      localStorage.setItem("bayCount","0");
    }
  }

  redirect1(){
    this.router.navigate(["master/warehouse-management/block-portal"]);
  }

  redirect2(){
    // this.router.navigate(["master/warehouse-management/warehouse-list/warehouse-list"]);
  }

  save() {
    try {
      let reqList: any = [];
      this.rowData?.map((item: any) => {
        item.isDisabled = true;
        reqList.push({ id: item?.id, no_of_racks: item?.no_of_racks })
      });
      this.$warehouseList.editBayBlockBay(reqList,this.blockId).subscribe((response: any) => {
        if (response) {
          this.rowData?.map((item: any) => item.isDisabled = true);
          this.toast.success('Block Updates', 'Block updation successful');
          // this.add(true);
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

  onSelectedBlockName(event: any) {
    this.selectedBlockName = event.value;
    localStorage.setItem("selectedBlock", this.selectedBlockName);
    this.getBlockById(this.selectedBlockName);
    // this.getBayList(true);
  }

  public columnDefs = [
    {
      headerName: 'Bay No',
      field: 'bay_number',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'No of Rack',
      field: 'no_of_racks',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      cellRenderer: BlockRowTextFieldComponent,
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
      cellRenderer: BayActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
        onActionPerform: (data: any) => this.handleActionData2(data),
      },
    },
  ];

  handleActionData = (data: any) => {
    this.rowData?.map((item: any) => {
      if (item?.id == data?.id) {
        item.no_of_racks = data?.no_of_racks;
      }
    })
  }

  handleActionData2 = (data: any) => {
    this.rowData?.map((item: any) => {
      if (item?.id == data?.id) {
        item.isDisabled = false;
      }
    })
  }

  getBlockList(flag = false) {
    try {
      this.$warehouseList.getAllBlocks(this.bayId).subscribe((response: any) => {
        if (response) {
          this.blockListNames = [];
          for ( let i = 0 ; i < this.selectedBlockCount; i++ ) {
            this.blockListNames[i] = response.data[i]
          }
          // if ( this.selectedBlockName == Number("none")) {
          //   this.selectedBlockName = this.blockListNames[0].id
          //   localStorage.setItem("selectedBlock",this.blockListNames[0].id)
          //   this.getBlockById(this.selectedBlockName);
          // }
        }
      }, (err: any) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }
  onBayCountTextBoxChanged() {
    this.bayCount = (document.getElementById('bay_count') as HTMLInputElement)
      .value;
    localStorage.setItem("bayCount", this.bayCount);
  }
  add(){
    this.getBayList(true);
  }

  createBayList(body:any){
    try {
      this.$warehouseList.updateBay(body,this.bayId,this.selectedBlockName).subscribe((response: any) => {
        if (response) {
          this.addListResponse = response.data;
          this.toast.success('Baylist created', 'Baylist creation successful');
          this.getBayList();
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

  getBayList(flag = false) {
    try {
      this.$warehouseList.getBayList(this.selectedBlockName).subscribe((response: any) => {
        if (response) {
          this.rowData = response.data;
          if ( response.data.length >= this.bayCount ) {
            this.rowData = []
            let i = 0;
            for ( i = 0; i < this.bayCount; i++ ) {
              this.rowData[i] = response.data[i]
              this.rowData[i].isDeleted = false;
            }
            this.$warehouseList.editBayBlockBay(this.rowData,this.blockId).subscribe((response: any) => {
              if (response) {
                // this.add(true);
              }
            }, (err: any) => {
              this.toast.error('Something went wrong', 'Something went wrong');
              console.log(err);
            })

            this.rowDataIsDelete = []
            let k = 0;
            for ( let j = i; j < response.data.length; j++ ) {
              this.rowDataIsDelete[k] = response.data[i]
              this.rowDataIsDelete[k].isDeleted = true;
              i++;
              k++;
            }
            this.$warehouseList.editBayBlockBay(this.rowDataIsDelete,this.blockId).subscribe((response: any) => {
              if (response) {
                // this.add(true);
              }
            }, (err: any) => {
              this.toast.error('Something went wrong', 'Something went wrong');
              console.log(err);
            })
          }

          if ( flag == true ) {
            this.rowData = []
            if ( response.data.length >= this.bayCount ) {
              let i = 0;
              for ( i = 0; i < this.bayCount; i++ ) {
                this.rowData[i] = response.data[i]
                this.rowData[i].isDeleted = false;
              }

              this.$warehouseList.editBayBlockBay(this.rowData,this.blockId).subscribe((response: any) => {
                if (response) {
                  // this.add(true);
                }
              }, (err: any) => {
                this.toast.error('Something went wrong', 'Something went wrong');
                console.log(err);
              })

              this.rowDataIsDelete = []
              let k = 0;
              for ( let j = i; j < response.data.length; j++ ) {
                this.rowDataIsDelete[k] = response.data[i]
                this.rowDataIsDelete[k].isDeleted = true;
                i++;
                k++;
              }
              this.$warehouseList.editBayBlockBay(this.rowDataIsDelete,this.blockId).subscribe((response: any) => {
                if (response) {
                  // this.add(true);
                }
              }, (err: any) => {
                this.toast.error('Something went wrong', 'Something went wrong');
                console.log(err);
              })
  
            }
            else {
              let reqBody = {
                "warehouse_id":this.selectedWarehouseName,
                "blockList": [],
                "blockBayList": []
              }
              let rackList:any = []
              for ( let i = response.data.length + 1,k=0; i <= this.bayCount; i++ ) {
                let j = i;
                let temp = "Bay-" + j.toString(); 
                let x = {
                  // "warehouse_name":this.selectedWarehouseName,
                  // "block_name":this.selectedBlockName,
                  "bay_number":temp, 
                  "no_of_racks": 0,
                  "isDeleted": false  
                }
                rackList[k] = x;
                k++;
              }
              reqBody.blockBayList = rackList;
              this.createBayList(reqBody)
            }
          }
        }
      }, (err: any) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  getWarehouse() {
    try {
      this.$warehouseList.getAllWarehouse().subscribe((response: any) => {
        if (response) {
          this.warehouseData = response.data;
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  onSelectedWarehouseName(event: any) {
    this.selectedWarehouseName = Number(event.value)
    localStorage.setItem("selectedWarehouse", event.value);
    // this.getEmployeesList(this.selectedRole);
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
    // this.selectedWarehouseName = Number(event.value)
    // localStorage.setItem("selectedWarehouse", event.value);
    // this.getEmployeesList(this.selectedRole);
  }

  getBlockById(id:any) {
    try {
      this.$warehouseList.getBlockById(id).subscribe((response: any) => {
        if (response) {
          this.bayCount = response.data.no_of_bays;
          localStorage.setItem("bayCount",this.bayCount)
          this.add()
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }
}


