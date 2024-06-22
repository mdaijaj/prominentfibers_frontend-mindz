import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AddProductDilogComponent } from '../../../purchase-request/all-pr/add-product-dilog/add-product-dilog.component';
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
import { RemarkDilogComponent } from '../../../purchase-request/to-be-approved/remark-dilog/remark-dilog.component';
import { DepartmentBudgetService } from 'src/app/@shared/services/department-budget.service';
import { environment } from 'src/app/environments/environment';
import { AddServiceDialogComponent } from '../../../purchase-request/all-pr/add-service-dialog/add-service-dialog.component';
import { AddBomDialogComponent } from '../../../purchase-request/all-pr/add-bom-dialog/add-bom-dialog.component';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { VendorManagementService } from 'src/app/@shared/services/vendor-management.service';

@Component({
  selector: 'app-create-po',
  templateUrl: './create-po.component.html',
  styleUrls: ['./create-po.component.scss']
})
export class CreatePoComponent {
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
  itemData: any;
  noOfBom: any;
  values = '';
  eventKeyUp: any;
  totalbomValue: any;
  totleAmountPrice: any;
  totalAmountPrice: any;
  totalAmountService: any;
  totalAmountItem: any;
  branchId: any;
  branchList: any;
  departmentList: any;
  vendorList: any;
  employee_id: any;
  itemcontrolData: any;
  serviceControlData: any;
  // requestAmount: number;
  // AfterReq_PR_amount: number;

  constructor(
    private route: Router,
    private toast: ToastrService,
    private activeroute: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private prService: PurchaseRequestService,
    private _configurationalMasterService: ConfigurationalmasterService,
    private budgetService: DepartmentBudgetService,
    private vendorService: VendorManagementService
  ) {
    this.prForm = this.fb.group({
      selectedPRType: ['item'] // or 'service' based on your default
    });
    this.createPrForm = this.fb.group({
      branchName: new FormControl(null, [Validators.required]),
      branchCode: new FormControl(null, [Validators.required]),
      gstNo: new FormControl(null, [Validators.required]),
      branchAddress: new FormControl(null, [Validators.required]),
      delivery_branch: new FormControl(null, [Validators.required]),
      department_name: new FormControl(null, [Validators.required]),
      po_type: new FormControl(null, [Validators.required]),
      financial_year: new FormControl(null, [Validators.required]),
      po_date: new FormControl(null, [Validators.required]),
      po_number: new FormControl(null, [Validators.required]),
      po_supplier_vendor_name: new FormControl(null, [Validators.required]),
      employee_id: new FormControl(null,),
      item_detail: new FormArray([]),
      po_remark: new FormControl(null, [Validators.required]),
      po_attached_doc: new FormControl(null),
    });
    this.createServiceForm = this.fb.group({
      branchName: new FormControl(null, [Validators.required]),
      branchCode: new FormControl(null, [Validators.required]),
      gstNo: new FormControl(null, [Validators.required]),
      branchAddress: new FormControl(null, [Validators.required]),
      delivery_branch: new FormControl(null, [Validators.required]),
      department_name: new FormControl(null, [Validators.required]),
      po_type: new FormControl(null, [Validators.required]),
      financial_year: new FormControl(null, [Validators.required]),
      po_date: new FormControl(null, [Validators.required]),
      po_number: new FormControl(null, [Validators.required]),
      po_supplier_vendor_name: new FormControl(null, [Validators.required]),
      employee_id: new FormControl(null,),
      service_detail: new FormArray([]),
      po_remark: new FormControl(null, [Validators.required]),
      po_attached_doc: new FormControl(null),
    });
  }

  ngOnInit() {
    var empData: any = localStorage.getItem('signInUser');
    const singleEmpData = JSON.parse(empData);
    this.employee_id = singleEmpData?.employee_id;
    // let employee_id = singleEmpData?.employee_id;

    this.activeroute.queryParams.subscribe((params: any) => {
      console.log(params, 'params');
      this.branchId = params.id;
      this.id = params.pr_id;
      (this.status = params?.status);
      // this.getByPr();
    });

    if (this.branchId) {
      this._configurationalMasterService.branchSetupGetById(this.branchId).subscribe((res: any) => {
        this.getData = res.data;
        console.log(this.getData, "branch data");
        this.createPrForm.patchValue({
          branchName: this.getData?.branch_name,
          branchCode: this.getData?.branch_code,
          gstNo: this.getData?.branch_gstnumber,
          branchAddress: this.getData?.branch_address,
        });
        this.createServiceForm.patchValue({
          branchName: this.getData?.branch_name,
          branchCode: this.getData?.branch_code,
          gstNo: this.getData?.branch_gstnumber,
          branchAddress: this.getData?.branch_address,
        });
      })
      this._configurationalMasterService.getListBranchSetup().subscribe((res: any) => {
        this.branchList = res.data;
      })
      this._configurationalMasterService.getDepartment().subscribe((res: any) => {
        this.departmentList = res.data;
      })
      this.vendorService.getUnAppVendor().subscribe((res: any) => {
        this.vendorList = res.data;
      })
    }


  }

  typeChange(e: any) {
    if (e.value) {
      let ponumberData = {
        "po_type": e.value
      }
      this.prService.generatePo(ponumberData).subscribe((res: any) => {
        if (this.prForm?.value.selectedPRType == 'item') {
          this.createPrForm.patchValue({
            po_number: res?.data // Replace 'YourValueHere' with the value you want to patch
          });
        }
        if (this.prForm?.value.selectedPRType == 'service') {
          this.createServiceForm.patchValue({
            po_number: res?.data // Replace 'YourValueHere' with the value you want to patch
          });
        }
      });
    }
  }

  // getByPr() {
  //   this.prService.getByPr(this.id).subscribe((res: any) => {
  //     console.log(res, 'ressss');

  //   })
  // }

  budget_details() {
    if (this.prForm?.value.selectedPRType == 'item') {
      let val = this.createPrForm.value
      if (val.department_name == null) {
        return this.toast.error("Please Fill Department!");
      } else if (val.po_type == null) {
        return this.toast.error("Please Fill Po Type!");
      } else if (val.financial_year == null) {
        return this.toast.error("Please Fill Financial Year!");
      }
      let data = {
        department_name: val.department_name,
        po_type: val.po_type,
        financial_year: val.financial_year,
      }
      console.log(data, "dep Nmae");
      this.budgetService.getBudgetTypeFinancialDepartment(data).subscribe((res: any) => {
        console.log(res, 'bget data');

        // this.budget_details = res.data
        this.financialYear = res.data.financial_year_id;
        this.budgetAmount = res.data.amount;
        this.remainingAmount = res.data.remainingAmount;
        this.dept_po = 0;
        console.log(res.code, "budget Details");
      },
        ((err: any) => {
          console.log(err, 'errorrr');
          if (err.error.code === 404) {
            this.toast.error(err.error.message)
          }
        })
      )
    } else if (this.prForm?.value.selectedPRType == 'service') {
      let val = this.createServiceForm.value
      if (val.department_name == null) {
        return this.toast.error("Please Fill Department!");
      } else if (val.po_type == null) {
        return this.toast.error("Please Fill Po Type!");
      } else if (val.financial_year == null) {
        return this.toast.error("Please Fill Financial Year!");
      }
      let data = {
        department_name: val.department_name,
        po_type: val.po_type,
        financial_year: val.financial_year,
      }
      console.log(data, "dep Nmae");
      this.budgetService.getBudgetTypeFinancialDepartment(data).subscribe((res: any) => {
        console.log(res, 'bget data');

        // this.budget_details = res.data
        this.financialYear = res.data.financial_year_id;
        this.budgetAmount = res.data.amount;
        this.remainingAmount = res.data.remainingAmount;
        this.dept_po = res.Total_purchase;
        console.log(res.code, "budget Details");
      },
        ((err: any) => {
          console.log(err, 'errorrr');
          if (err.error.code === 404) {
            this.toast.error(err.error.message)
          }
        })
      )
    }
  }

  get CF_1(): any {
    return this.createPrForm.controls;
  }

  get CF_2(): any {
    return this.createServiceForm.controls;
  }
  // get CF_3(): any {
  //   return this.createServiceForm.controls;
  // }

  deleteRow(i: number) {
    <FormArray>this.CF_1.item_detail.removeAt(i);
    const control = this.createPrForm?.get('item_detail') as FormArray;
    console.log(control.value, 'control');
    let totalAmountPrice = 0;
    for (let a = 0; a <= control.value.length - 1; a++) {
      console.log(control.value[a], 'data[a]');

      totalAmountPrice += control.value[a]?.unit_price
    }
    console.log(totalAmountPrice, 'this.totalAmountPrice');
    this.totalAmountItem = totalAmountPrice
    console.log(this.itemData, 'this.itemData>>>>');
  }

  deleteServiceRow(i: number) {
    <FormArray>this.CF_2.service_detail.removeAt(i);
    const control = this.createServiceForm?.get('service_detail') as FormArray;
    console.log(control.value, 'control');

    let totalAmountPrice = 0;
    for (let a = 0; a <= control.value.length - 1; a++) {
      console.log(control.value[a], 'data[a]');

      totalAmountPrice += control.value[a]?.unit_price
    }
    console.log(totalAmountPrice, 'this.totalAmountPrice');
    this.totalAmountService = totalAmountPrice
    console.log(this.itemData, 'this.itemData>>>>');
  }

  arayEmpty(event: any) {
    if (event.target.value == 'item') {
      this.CF_1.item_detail = new FormArray([])
    } else {
      this.CF_2.service_detail = new FormArray([])
    }
  }

  addProduct(e: any) {
    e.preventDefault();
    const dialogRef = this.dialog.open(AddProductDilogComponent, {
      width: '700px',
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
              item_quantity: new FormControl(e.quantity, [Validators.required]),
              unit_price: new FormControl(0, [Validators.required]),
              amount: new FormControl(null, [Validators.required]),
              tax: new FormControl(null, [Validators.required]),
              asset_category_id: new FormControl(e.asset_id),
            })
          );
        }
        console.log(this.CF_1.item_detail, 'test control cf1');
        this.itemcontrolData = this.CF_1.item_detail.value
      });

      let totalAmountPrice = 0;
      for (let a = 0; a <= this.itemcontrolData.length - 1; a++) {
        console.log(this.itemcontrolData[a], 'this.itemcontrolData[a]');

        totalAmountPrice += Number(this.itemcontrolData[a]?.unit_price)
      }
      console.log(totalAmountPrice, 'this.totalAmountPrice');
      this.totalAmountItem = totalAmountPrice
    });

  }

  addService(e: any) {
    e.preventDefault();
    const dialogRef = this.dialog.open(AddServiceDialogComponent, {
      width: '700px',
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
              service_quantity: new FormControl(e.quantity, [Validators.required]),
              unit_price: new FormControl(0, [Validators.required]),
              amount: new FormControl(null, [Validators.required]),
              tax: new FormControl(null, [Validators.required]),
              service_category_id: new FormControl(e.service_category_id),
            })
          );
        }
        console.log(this.CF_2.service_detail);
        this.serviceControlData = this.CF_2.service_detail.value;
      });

      let totalAmountPrice = 0;
      for (let a = 0; a <= this.serviceControlData.length - 1; a++) {
        console.log(this.serviceControlData[a], 'this.serviceControlData[a]');

        totalAmountPrice += Number(this.serviceControlData[a]?.unit_price)
      }
      console.log(totalAmountPrice, 'this.totalAmountPrice');
      this.totalAmountService = totalAmountPrice
    });

  }

  // item
  keyUpItem(event: any, i: any, data: any) {
    console.log(event, 'event');

    console.log(data, 'data');
    console.log(i, 'index');
    let idControl = data.value.id;

    this.eventKeyUp = event;

    const control = this.createPrForm?.get('item_detail') as FormArray;
    console.log(control.value, 'control');

    let list = control.value;
    for (let a = 0; a <= i; a++) {
      list[i].amount = data?.value?.unit_price * list[i]?.item_quantity
    }
    // list.map((item: any) => {
    //   // itemData
    //   console.log(item, "item for data")
    //   item.amount = data?.value?.unit_price * item?.item_quantity;
    // })
    console.log(list, 'list copy');
    this.createPrForm.patchValue({
      item_detail: list,
    })

    console.log(list, 'listlistlist');
    let totalAmountPrice = 0;
    for (let a = 0; a <= list.length - 1; a++) {
      console.log(list[a], 'data[a]');

      totalAmountPrice += list[a]?.amount
    }
    console.log(totalAmountPrice, 'this.totalAmountPrice');
    this.totalAmountItem = totalAmountPrice
    console.log(this.itemData, 'this.itemData>>>>');
  }

  // service Amount
  keyUpService(event: any, i: any, data: any) {
    console.log(event, 'event');

    console.log(data, 'data');
    let idControl = data.value.id;

    this.eventKeyUp = event;

    const control = this.createServiceForm?.get('service_detail') as FormArray;
    console.log(control.value, 'control');

    let list = control.value;
    for (let a = 0; a <= i; a++) {
      list[i].amount = list[i]?.service_quantity * Number(data?.value?.unit_price)
    }
    // list.map((item: any) => {
    //   // itemData
    //   console.log(item)
    //   item.amount = item?.service_quantity * Number(data?.value?.unit_price);
    // })
    console.log(list, 'list copy');
    this.createServiceForm.patchValue({
      service_detail: list,
    })

    console.log(list, 'listlistlist');
    let totalAmountPrice = 0;
    for (let a = 0; a <= list.length - 1; a++) {
      console.log(list[a], 'data[a]');

      totalAmountPrice += list[a]?.amount
    }
    console.log(totalAmountPrice, 'this.totalAmountPrice');
    this.totalAmountService = totalAmountPrice
    console.log(this.itemData, 'this.itemData>>>>');
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
          confirmButtonColor: '#063178',
          confirmButtonText: 'Ok',
        });
      }
    } else {
      Swal.fire({
        imageUrl: imagePath,
        imageHeight: 250,
        imageAlt: 'Profile Image',
        confirmButtonColor: '#063178',
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
        confirmButtonColor: '#063178',
        confirmButtonText: 'Ok',
      });
    }
  }

  onSubmit() {

    let val = this.createPrForm.value;
    const item_detail = this.createPrForm.get('item_detail') as FormArray;
    const service_det = this.createServiceForm.get('service_detail') as FormArray;

    let val2 = this.createServiceForm.value;

    // this.totalPRValue = this.calculateTotalValue(val.item_detail);
    // if (this.remainingAmount < this.totalPRValue) {
    //   this.openBudgetRemainder();
    //   return;
    // }


    if (this.prForm?.value.selectedPRType == 'item') {
      if (item_detail.value.length == 0) {
        this.toast.warning("Pls Add Item PO");
        return
      }
      if (this.createPrForm.invalid) {
        this.toast.error('Required fields should not be empty', 'Fields Error');
        return;
      }
    }

    if (this.prForm?.value.selectedPRType == 'item') {
      let formData = new FormData();
      formData.append('branch_id', this.branchId);
      formData.append('department_name', val.department_name);
      formData.append('employee_id', this.employee_id);
      formData.append('delivery_branch', val.delivery_branch);
      formData.append('po_type', val.po_type);
      formData.append('financial_year', val.financial_year);
      formData.append('po_supplier_vendor_name', val.po_supplier_vendor_name);
      formData.append('po_date', val.po_date);
      formData.append('po_number', val.po_number);
      formData.append('po_remark', val.po_remark);
      let alld = JSON.stringify(val.item_detail);
      formData.append(`item_detail`, alld);
      formData.append('po_attached_doc', this.imageToUpload);
      formData.append(`po_category_type`, 'Item PO');
      formData.append('total', this.totalAmountItem);
      this.prService.createPo(formData).subscribe((res: any) => {
        this.resdata = res.data;
        if (res.code == 200) {
          this.toast.success(res.message);
          this.route.navigate([
            'master/purchase-main/purchase-order/raise-po',
          ]);
        }

      },
        ((err: any) => {
          console.log(err, 'errorrr');
          if (err.error.code === 403) {
            this.toast.error("Workflow is not created for require department!")
          }
        })
      );
    }


    if (this.prForm?.value.selectedPRType == 'service') {
      if (service_det.value?.length == 0) {
        this.toast.warning("Pls Add Service PO");
        return
      }
      if (this.createServiceForm.invalid) {
        this.toast.error('Required fields should not be empty', 'Fields Error');
        return;
      }
    }
    if (this.prForm?.value.selectedPRType == 'service') {
      let formData2 = new FormData();
      formData2.append('branch_id', this.branchId);
      formData2.append('department_name', val2.department_name);
      formData2.append('employee_id', this.employee_id);
      formData2.append('delivery_branch', val2.delivery_branch);
      formData2.append('po_type', val2.po_type);
      formData2.append('financial_year', val2.financial_year);
      formData2.append('po_supplier_vendor_name', val2.po_supplier_vendor_name);
      formData2.append('po_date', val2.po_date);
      formData2.append('po_number', val2.po_number);
      formData2.append('po_remark', val2.po_remark);
      let serviceData = JSON.stringify(val2.service_detail);
      formData2.append(`service_detail`, serviceData);
      formData2.append('po_attached_doc', this.imageToUpload);
      formData2.append(`po_category_type`, 'Service PO');
      formData2.append('total', this.totalAmountService);
      this.prService.createPo(formData2).subscribe((res: any) => {
        this.resdata = res.data;
        if (res.code == 200) {
          this.toast.success(res.message);
          this.route.navigate([
            'master/purchase-main/purchase-order/raise-po',
          ]);
        }

      },
        ((err: any) => {
          console.log(err, 'errorrr');
          if (err.error.code === 403) {
            this.toast.error("Workflow is not created for require department!")
          }
        })
      );
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

  // onUpdate() {
  //   let val = this.createPrForm.value;

  //   const datas = {
  //     branchName: val.branchName,
  //     branchCode: val.branchCode,
  //     gstNo: val.gstNo,
  //     branchAddress: val.branchAddress,
  //     delivery_branch: val.delivery_branch,
  //     department_name: val.department_name,
  //     po_type: val.po_type,
  //     po_date: val.po_date,
  //     po_number: val.po_number,
  //     po_supplier_vendor_name: val.po_supplier_vendor_name,
  //     employee_id: val.employee_id,
  //     item_name: val.item_detail[0].item_name,
  //     item_code: val.item_detail[0].item_code,
  //     unit: val.item_detail[0].unit,
  //     mvp: val.item_detail[0].mvp,
  //     po_remark: val.po_remark,
  //     unit_price: val.item_detail[0].unit_price,
  //     amount: val.item_detail[0].amount,
  //     tax: val.item_detail[0].tax,
  //   };

  //   let formData = new FormData();
  //   formData.append('branchName', val.branchName);
  //   formData.append('branchCode', val.branchCode);
  //   formData.append('gstNo', val.gstNo);
  //   formData.append('branchAddress', val.branchAddress);
  //   formData.append('delivery_branch', val.delivery_branch);
  //   formData.append('department_name', val.department_name);
  //   formData.append('po_type', val.po_type);
  //   formData.append('po_date', val.po_date);
  //   formData.append('po_number', val.po_number);
  //   formData.append('po_supplier_vendor_name', val.po_supplier_vendor_name);
  //   formData.append('po_remark', val.po_remark);
  //   formData.append('po_attached_doc', this.imageToUpload);
  //   formData.append('item_name', val.item_detail[0]?.item_name);
  //   formData.append('item_code', val.item_detail[0]?.item_code);
  //   formData.append('unit_price', val.item_detail[0]?.unit_price);
  //   formData.append('amount', val.item_detail[0]?.amount);
  //   formData.append('tax', val.item_detail[0]?.tax);
  //   formData.append('unit', val.item_detail[0]?.unit);
  //   formData.append('mvp', val.item_detail[0]?.mvp);
  //   this.prService.updatePr(this.id, formData).subscribe((res: any) => {
  //     this.editedata = res.data;
  //     if (res.code == 200) {
  //       this.toast.success(res.message);
  //       this.route.navigate([
  //         'master/itticket/purchase-inventory/purchase-request/all-pr-list',
  //       ]);
  //     }
  //   });
  // }

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

  calbomTotalValue(products: any): number {
    console.log(products, 'products');
    let totalValueBom: number = 0;

    for (const product of products) {
      const totleMvpProd = product.mvp_product;
      totalValueBom += totleMvpProd;

    }
    console.log(totalValueBom, 'totalValueBom');

    return totalValueBom;

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
  patchData(e: any): FormArray {
    return new FormArray(
      e.map((x: any) => {
        const obj = new FormGroup({});
        Object.keys(x).forEach((k) => {
          obj.addControl(k, new FormControl(x[k]));
        });
        return obj;
      })
    );
  };
}
