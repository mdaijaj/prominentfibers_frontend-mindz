import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { environment } from 'src/app/environments/environment';
import { CrmService } from 'src/app/@shared/services/crm/crm.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AssignUserService } from 'src/app/@shared/services/crm/assign-user.service';
import { ToastrService } from 'ngx-toastr';
import { ProposalService } from 'src/app/@shared/services/crm/proposal.service';
import { ActivatedRoute } from '@angular/router';
// import { RecruitService } from 'src/app/@service/recruitment.service';
@Component({
  selector: 'app-assign-proposal-dialog',
  templateUrl: './assign-proposal-dialog.component.html',
  styleUrls: ['./assign-proposal-dialog.component.scss'],
})
export class AssignProposalDialogComponent {
  private gridApi!: GridApi<any>;
  singleData: any;
  fileUrl;
  rowData: any = [];
  rowClass: any;
  loading: boolean = false;
  nameSearch: any = '';
  filterControl = new FormControl();
  assignProposalForm: FormGroup = new FormGroup({});
  leadId: any;
  userLoginId: any;
  proposalId: any;
  actionType: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private $crm: CrmService,
    private $proposal: ProposalService,
    private $assignUser: AssignUserService,
    public dialog: MatDialogRef<AssignProposalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fileUrl = environment.fileUrl;
    this.rowClass = 'rowClass';
    this.getProductData();

    this.assignProposalForm = this.fb.group({
      employee_id: new FormControl(null, [Validators.required]),
    });

  }

  ngOnInit(): void {
    this.userLoginId = localStorage.getItem('EmpMainId')
    this.route.queryParams.subscribe((params: any) => {
      this.leadId = params.id;
      this.proposalId = params.proposalId;
      this.actionType = params.actionType;
      if (this.leadId || this.proposalId) {
        this.getEmployee();
      }
    });
  }

  getProductData() {
    this.route.queryParams.subscribe((params: any) => {
      this.proposalId = params?.proposalId;
      this.actionType = params?.actionType;
    });

    this.rowData = this.data?.value?.productDetailList;
    let productList = this.data?.productList;
    this.rowData?.map((item: any) => {
      let obj = productList.find((elem: any) => elem?.id == item?.product_master_id);
      item.product_name = obj?.product_name;
    })
  }

  public columnDefs = [
    {
      headerName: 'S No.',
      valueGetter: 'node.rowIndex + 1',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered ',
      flex: 1,
    },
    {
      headerName: 'Product Name',
      field: 'product_name',
      minWidth: 175,
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Product Code',
      field: 'product_code',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'QTY',
      field: 'qty',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      cellRenderer: this.customHtmlCellRenderer.bind(this),
    },
    {
      headerName: 'Product Price',
      field: 'price_per_unit',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Discount Required (%)',
      field: 'maximum_discount',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
  ];

  customHtmlCellRenderer(params: any): HTMLElement {
    const element = document.createElement('div');
    element.innerHTML = params.value;
    return element;
  }


  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    // 
  }

  onPanelClose() {
    this.filterControl.setValue('');
  }

  // Get user start
  employeeList: any = [];
  getEmployee() {
    try {
      this.$assignUser.getSuperUserList().subscribe((response: any) => {
        if (response) {
          this.employeeList = response.data;
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }
  // Get user end

  createProposal() {
    if (this.assignProposalForm.status === 'INVALID') {
      this.toast.error('Required fields should not be empty', 'Fields Error');
      return;
    }
    let data = {
      ...this.data?.value,
      additional_charges: Number(this.data.value?.additional_charges),
      employee_id: Number(this.assignProposalForm.value?.employee_id),
      create_lead_id: this.leadId,
      login_id: this.userLoginId,
      request_type: 'discount'
    };  
    if(this.actionType == 'edit'){
      data.id = Number(this.proposalId);
      data.create_lead_id = this.data?.create_lead_id;
    }
    this.$proposal.createProposal(data).subscribe((res: any) => {
      if (res) {
        this.toast.success(res.message);
        this.dialog.close();
      }
    },
      (err) => {
        if (err.status == 400) {
          this.toast.error(err?.message);
        } else if (err.status == 403) {
          this.toast.error('Already Exits!');
        }
        else {
          this.toast.error('Something went Wrong');
        }
      }
    );
  }

  // to restrict user from entering strings
  keyPress(event: Event | any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  // Handle discount request
  // createDiscount(event: any, data: any) {
  //   debugger
  //   this.rowData?.map((item: any) => {
  //     if (item?.product_master_id == data?.product_master_id) item.discount_request = Number(event.target.value);
  //   })
  // }

}
