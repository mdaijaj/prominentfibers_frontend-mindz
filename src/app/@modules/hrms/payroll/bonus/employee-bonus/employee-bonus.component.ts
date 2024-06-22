import { Component } from '@angular/core';
import {
  GridApi,
  GridReadyEvent
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeBonusActionComponent } from './employee-bonus-action/employee-bonus-action.component';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { EmpBonusDilogComponent } from './emp-bonus-dilog/emp-bonus-dilog.component';
import { MatDialog } from '@angular/material/dialog';
import { ThemeService } from 'ng2-charts';
@Component({
  selector: 'app-employee-bonus',
  templateUrl: './employee-bonus.component.html',
  styleUrls: ['./employee-bonus.component.scss']
})
export class EmployeeBonusComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  public rowData: any;
  public columnDefs = [
    {
      headerName: 'Bonus Id.',
      field: 'Bonus_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Employee Name',
      field: 'epm',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,

    },
    {
      headerName: 'Bonus Type',
      field: 'BonusType',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150,
    },
    // {
    //   headerName: 'Bonus Name',
    //   field: 'bonus_configure.bonus_name', sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   flex:1,
    //   minWidth:150,
    // },
    {
      headerName: 'Bonus Amount',
      field: 'bonus_amount', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150,
    },
    // {
    //   headerName: 'Amount',
    //   field: 'bonus_configure.amount', sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   flex:1,
    //   minWidth:150,
    // },
    {
      headerName: 'Actions',
      field: 'employee_bonus_id', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex: 1,
      minWidth: 150,
      cellRenderer: EmployeeBonusActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false,
      },
      cellClass: "grid-cell-centered",

    },

  ];
  constructor(private route: Router, private fb: FormBuilder,
    private hrServies: HrServiceService, private toast: ToastrService,
    private activeroute: ActivatedRoute, public dialog: MatDialog) {
    this.rowClass = 'rowClass'
  }

  ngOnInit() {
    this.getAllEmpBonus()
  }

  goToEmpBonusCreate(path: any) {
    this.route.navigate([path]);
  }


  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;


  }

  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }

  onCellClicked(e: any) {

    const dialogRef = this.dialog.open(EmpBonusDilogComponent, { width: '400px', data: { id: e.data.Bonus_id } });
    dialogRef.afterClosed().subscribe(result => {

    })
  }

  getAllEmpBonus() {
    let modifiedName: any = []
    this.hrServies.getAllEmpBonus().subscribe((res: any) => {
      this.rowData = res.data;
      var fullNames = this.rowData.map((item: any) => item.add_multiplr_user?.map((user: any) => user.fullName).join(', '));
      console.log(fullNames, "fyfyf");
      for (let a = 0; a < this.rowData.length; a++) {
        this.rowData[a].epm = fullNames[a]
      }
      console.log(this.rowData, "rowdata");
    })
  }


}
