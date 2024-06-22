import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AddProductDilogComponent } from '../add-product-dilog/add-product-dilog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';
import Swal from 'sweetalert2';
import { RemarkDilogComponent } from '../../to-be-approved/remark-dilog/remark-dilog.component';
import { DepartmentBudgetService } from 'src/app/@shared/services/department-budget.service';
import { environment } from 'src/app/environments/environment';
import { AddServiceDialogComponent } from '../add-service-dialog/add-service-dialog.component';


@Component({
  selector: 'app-create-pr',
  templateUrl: './create-pr.component.html',
  styleUrls: ['./create-pr.component.scss'],
})
export class CreatePrComponent {
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  createPrForm: FormGroup;
  createServiceForm: FormGroup;
  prForm: FormGroup;
  getEmpData: any;
  imagePath: any;
  imageToUpload: any;
  editDocData: any;
  productData: any;
  resdata: any;
  submitted: boolean = false;
  id: any;
  status: any;
  remarkData: any;
  singlePrData: any;
  editedata: any;
  getData: any;
  budgetAvailable: number = 200000;
  totalPRValue: number;
  dept: any;
  financialYear: any;
  budgetAmount: any;
  remainingAmount: number;
  dept_po: any;
  // requestAmount: number;
  // AfterReq_PR_amount: number;

  constructor(
    private route: Router,
    private toast: ToastrService,
    private activeroute: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private prService: PurchaseRequestService,
    private budgetService: DepartmentBudgetService
  ) {
    this.prForm = this.fb.group({
      selectedPRType: ['item'] // or 'service' based on your default
    });
    this.createPrForm = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required]),
      employee_id: new FormControl(null, [Validators.required]),
      item_detail: new FormArray([]),
      location: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      pin: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      delivery_address: new FormControl(null, [Validators.required]),
      file: new FormControl(null, [Validators.required]),
    });
    this.createServiceForm = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required]),
      employee_id: new FormControl(null, [Validators.required]),
      service_detail: new FormArray([]),
      location: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      pin: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      delivery_address: new FormControl(null, [Validators.required]),
      file: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
    var empData: any = localStorage.getItem('signInUser');
    const singleEmpData = JSON.parse(empData);
    let employee_id = singleEmpData?.employee_id;

    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params.pr_id;
      (this.status = params?.status);
    });

    if (this.id) {
      this.prService.getByIdPR(this.id).subscribe((res: any) => {
        this.singlePrData = res.data;
        this.CF_1['file'].setErrors(null);

        <FormArray>this.CF_1.item_detail.push(
          new FormGroup({
            item_document: new FormControl(this.singlePrData?.item_document),
            item_name: new FormControl(this.singlePrData?.item_name),
            item_code: new FormControl(this.singlePrData?.item_code),
            item_quantity: new FormControl(this.singlePrData?.unit),
            priority: new FormControl(this.singlePrData.priority),
            mvp: new FormControl(this.singlePrData?.mvp),
            asset_category_id: new FormControl(this.singlePrData.asset_id),
          })
        );

        <FormArray>this.CF_2.service_detail.push(
          new FormGroup({
            service_document: new FormControl(this.singlePrData?.service_document),
            service_name: new FormControl(this.singlePrData?.service_name),
            service_code: new FormControl(this.singlePrData?.service_code),
            service_quantity: new FormControl(this.singlePrData?.unit),
            priority: new FormControl(this.singlePrData.priority),
            mvp: new FormControl(this.singlePrData?.mvp),
            service_category_id: new FormControl(this.singlePrData.service_category_id),
          })
        );

        this.createPrForm.patchValue({
          location: this.singlePrData?.location,
          state: this.singlePrData?.state,
          pin: this.singlePrData?.pin,
          city: this.singlePrData?.city,
          delivery_address: this.singlePrData?.delivery_address,
        });
      });
    }

    if (employee_id) {
      this.prService.getEmpById(employee_id).subscribe((res: any) => {
        this.getEmpData = res.data;
        this.dept = res.data[0]?.department
        this.budget_details(this.dept),
          this.createPrForm.patchValue({
            name: this.getEmpData[0]?.fullName,
            department: this.getEmpData[0]?.department,
            employee_id: this.getEmpData[0]?.employee_id,
          });
        this.createServiceForm.patchValue({
          name: this.getEmpData[0]?.fullName,
          department: this.getEmpData[0]?.department,
          employee_id: this.getEmpData[0]?.employee_id,
        });
      });
    }

  }

  budget_details(departmentName: any) {
    console.log(departmentName, "dep Nmae");

    const data = {
      dept_name: departmentName
    }
    console.log(data, "dep Nmae");

    this.budgetService.getByIdDepartments(data).subscribe((res: any) => {
      this.budget_details = res.data
      this.financialYear = res.data.tbl_budget.financial_year_id;
      this.budgetAmount = res.data.tbl_budget.amount;
      this.remainingAmount = res.data.tbl_budget.remainingAmount;
      this.dept_po = res.total_mvp;
      console.log(this.budget_details, "budget Details");
    })
  }

  get CF_1(): any {
    return this.createPrForm.controls;
  }

  get CF_2(): any {
    return this.createServiceForm.controls;
  }

  deleteRow(i: number) {
    <FormArray>this.CF_1.item_detail.removeAt(i);
  }

  deleteServiceRow(i: number) {
    <FormArray>this.CF_2.service_detail.removeAt(i);
  }

  arayEmpty(event: any) {
    if (event.target.value == 'item') {
      this.CF_1.item_detail = new FormArray([])
    }
    else {
      this.CF_2.service_detail = new FormArray([])
    }
  }

  addProduct(e: any) {
    e.preventDefault();
    const dialogRef = this.dialog.open(AddProductDilogComponent, {
      width: '600px',
      data: { cellData: e.data },
    });
    dialogRef.afterClosed().subscribe((result) => {

      this.productData = result;
      console.log(this.productData, "Add Item");

      this.productData?.map((e: any) => {

        if (e) {
          <FormArray>this.CF_1.item_detail.push(
            new FormGroup({
              item_id: new FormControl(e.id),
              item_document: new FormControl(`${environment.servralUrl + '/' + e.item_document}`),
              item_name: new FormControl(e.item_name),
              item_code: new FormControl(e.item_code),
              item_quantity: new FormControl(e.quantity),
              priority: new FormControl(null),
              mvp: new FormControl(e.quantity == null ? 0 : e.quantity * e.MVP),
              asset_category_id: new FormControl(e.asset_id),
            })
          );
        }
        console.log(this.CF_1.item_detail);
      });
    });

  }

  addService(e: any) {
    e.preventDefault();
    const dialogRef = this.dialog.open(AddServiceDialogComponent, {
      width: '600px',
      data: { cellData: e.data },
    });
    dialogRef.afterClosed().subscribe((result) => {

      this.productData = result;
      console.log(this.productData, "Add Service");

      this.productData?.map((e: any) => {

        if (e) {
          <FormArray>this.CF_2.service_detail.push(
            new FormGroup({
              service_id: new FormControl(e.service_id),
              service_document: new FormControl(`${environment.servralUrl + '/' + e.service_document}`),
              service_name: new FormControl(e.service_name),
              service_code: new FormControl(e.service_code),
              service_quantity: new FormControl(e.quantity),
              priority: new FormControl(null),
              mvp: new FormControl(e.quantity == null ? 0 : e.quantity * e.MVP),
              service_category_id: new FormControl(e.service_category_id),
            })
          );
        }
        console.log(this.CF_2.service_detail);
      });
    });

  }


  onChange(e: any) {
    if (e.target.files && e.target.files[0]) {
      const data: FileList = e.target.files;
      this.imageToUpload = data.item(0) || null;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePath = e.target.result;

      };
      reader.readAsDataURL(this.imageToUpload);
    }

  }

  seePreview(path: string, imagePath: any) {
    if (!this.imagePath) {
      if (path) {
        Swal.fire({
          imageUrl: path,
          imageHeight: 250,
          imageAlt: 'Uploaded Document',
          confirmButtonColor: '#8B817D',
          confirmButtonText: 'Ok',
        });
      }
    } else {
      Swal.fire({
        imageUrl: imagePath,
        imageHeight: 250,
        imageAlt: 'Profile Image',
        confirmButtonColor: '#8B817D',
        confirmButtonText: 'Ok',
      });
    }
  }

  seePreviewTable(path: string) {
    if (path) {
      Swal.fire({
        imageUrl: path,
        imageHeight: 250,
        imageAlt: 'Document',
        confirmButtonColor: '#8B817D',
        confirmButtonText: 'Ok',
      });
    }
  }

  onSubmit() {

    let val = this.createPrForm.value;
    const item_detail = this.createPrForm.get('item_detail') as FormArray;
    console.log(val, "createPrForm");

    this.totalPRValue = this.calculateTotalValue(val.item_detail);
    if (this.remainingAmount < this.totalPRValue) {
      this.openBudgetRemainder();
      return;
    }

    if (this.prForm?.value.selectedPRType == 'item') {
      if (this.createPrForm.invalid) {
        this.toast.error('Required fields should not be empty', 'Fields Error');
        return;
      }
    }

    if (this.prForm?.value.selectedPRType == 'item') {
      let formData = new FormData();
      formData.append('department', val.department);
      formData.append('employee_id', val.employee_id);
      formData.append('location', val.location);
      formData.append('state', val.state);
      formData.append('city', val.city);
      formData.append('pin', val.pin);
      formData.append('delivery_address', val.delivery_address);
      let alld = JSON.stringify(val.item_detail);
      formData.append(`item_detail`, alld);
      formData.append('file', this.imageToUpload);
      formData.append(`PR_category`, 'Item PR');
      this.prService.createPr(formData).subscribe((res: any) => {
        this.resdata = res.data;
        if (res.code == 200) {
          this.toast.success(res.message);
          this.route.navigate([
            'master/itticket/purchase-inventory/purchase-request/all-pr-list',
          ]);
        }

      });
    }


    if (this.prForm?.value.selectedPRType == 'service') {
      if (this.createServiceForm.invalid) {
        this.toast.error('Required fields should not be empty', 'Fields Error');
        return;
      }
    }
    if (this.prForm?.value.selectedPRType == 'service') {
      let val2 = this.createServiceForm.value;
      let formData2 = new FormData();
      formData2.append('department', val2.department);
      formData2.append('employee_id', val2.employee_id);
      formData2.append('location', val2.location);
      formData2.append('state', val2.state);
      formData2.append('city', val2.city);
      formData2.append('pin', val2.pin);
      formData2.append('delivery_address', val2.delivery_address);
      let serviceData = JSON.stringify(val2.service_detail);
      formData2.append(`service_detail`, serviceData);
      formData2.append('file', this.imageToUpload);
      formData2.append(`PR_category`, 'Service PR');
      this.prService.createPr(formData2).subscribe((res: any) => {
        this.resdata = res.data;
        if (res.code == 200) {
          this.toast.success(res.message);
          this.route.navigate([
            'master/itticket/purchase-inventory/purchase-request/all-pr-list',
          ]);
        }

      });
    }
  }

  addRemark(e: any) {

    e.preventDefault();
    const dialogRef = this.dialog.open(RemarkDilogComponent, {
      width: '400px',
      data: { cellData: this.singlePrData },
    });
    dialogRef.afterClosed().subscribe((result) => {

      this.remarkData = result;
    });
  }

  onUpdate() {
    let val = this.createPrForm.value;

    const datas = {
      name: val.name,
      department: val.department,
      employee_id: val.employee_id,
      item_name: val.item_detail[0].item_name,
      item_code: val.item_detail[0].item_code,
      unit: val.item_detail[0].unit,
      mvp: val.item_detail[0].mvp,
      location: val.location,
      state: val.state,
      city: val.city,
      pin: val.pin,
      delivery_address: val.delivery_address,
      priority: val.item_detail[0].priority,
    };

    let formData = new FormData();
    formData.append('name', val.name);
    formData.append('department', val.department);
    formData.append('location', val.location);
    formData.append('state', val.state);
    formData.append('pin', val.pin);
    formData.append('city', val.city);
    formData.append('delivery_address', val.delivery_address);
    formData.append('file', this.imageToUpload);
    formData.append('item_name', val.item_detail[0]?.item_name);
    formData.append('item_code', val.item_detail[0]?.item_code);
    formData.append('priority', val.item_detail[0]?.priority);
    formData.append('unit', val.item_detail[0]?.unit);
    formData.append('mvp', val.item_detail[0]?.mvp);
    this.prService.updatePr(this.id, formData).subscribe((res: any) => {
      this.editedata = res.data;
      if (res.code == 200) {
        this.toast.success(res.message);
        this.route.navigate([
          'master/itticket/purchase-inventory/purchase-request/all-pr-list',
        ]);
      }
    });
  }



  calculateTotalValue(products: any): number {
    let totalValue: number = 0;
    for (const product of products) {
      const mvp: number = product.mvp;
      const unit: number = product.unit;
      const productValue: number = mvp * unit;
      totalValue += productValue;
    }
    return totalValue;
  }


  openBudgetRemainder() {
    let dialogRef = this.dialog.open(this.callAPIDialog, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result === 'yes') {
          // TODO: Replace the following line with your code.
          console.log('User clicked yes.');
        } else if (result === 'no') {
          // TODO: Replace the following line with your code.
          console.log('User clicked no.');
        }
      }
    })
  }

}
