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
import { AddBomDialogComponent } from '../add-bom-dialog/add-bom-dialog.component';


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
  bomProductAll: any;
  itemData: any;
  noOfBom: any;
  values = '';
  eventKeyUp: any;
  totalbomValue: any;
  totleAmountPrice: any;
  totalAmountPrice: any;
  totalAmountService: any;
  totalAmountItem: any;
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
    private budgetService: DepartmentBudgetService
  ) {
    this.prForm = this.fb.group({
      selectedPRType: ['item'] // or 'service' based on your default
    });
    this.createPrForm = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required]),
      employee_id: new FormControl(null, [Validators.required]),
      employee_code: new FormControl(null, [Validators.required]),
      item_detail: new FormArray([]),
      location: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      pin: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      delivery_address: new FormControl(null, [Validators.required]),
      file: new FormControl(null),
      type: new FormControl(null, [Validators.required]),
      financial_year: new FormControl(null, [Validators.required]),

    });
    this.createServiceForm = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required]),
      employee_id: new FormControl(null, [Validators.required]),
      employee_code: new FormControl(null, [Validators.required]),
      service_detail: new FormArray([]),
      location: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      pin: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      delivery_address: new FormControl(null, [Validators.required]),
      file: new FormControl(null),
      type: new FormControl(null, [Validators.required]),
      financial_year: new FormControl(null, [Validators.required]),
      // bomPr: new FormArray([]),
      bomPr: new FormArray([
        new FormGroup({
          // estimate_description: new FormControl(null),
          // estimate_amount: new FormControl(null),
          service_document: new FormControl(null),
          product_name: new FormControl(null),
          product_code: new FormControl(null),
          product_quantity: new FormControl(null),
          priority: new FormControl(null),
          mvp_product: new FormControl(null),
          mvp: new FormControl(null),
          item_document: new FormControl(null),
          old_quantity: new FormControl(null),
          old_mvp: new FormControl(null),
        }),
      ]),
    });
  }
  get bomPr(): FormArray {
    return this.createServiceForm.get('bomPr') as FormArray;
  }
  ngOnInit() {
    var empData: any = localStorage.getItem('signInUser');
    const singleEmpData = JSON.parse(empData);
    let employee_id = singleEmpData?.employee_id;

    this.activeroute.queryParams.subscribe((params: any) => {
      console.log(params, 'params');

      this.id = params.pr_id;
      (this.status = params?.status);
      this.getByPr();
    });

    if (this.id) {
      this.prService.getByIdPR(this.id).subscribe((res: any) => {
        this.singlePrData = res.data;
        console.log(this.singlePrData, ' this.singlePrData');

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
          this.createPrForm.patchValue({
            name: this.getEmpData[0]?.fullName,
            department: this.getEmpData[0]?.department,
            employee_id: this.getEmpData[0]?.employee_id,
            employee_code: this.getEmpData[0]?.employee_code,
          });
        this.createServiceForm.patchValue({
          name: this.getEmpData[0]?.fullName,
          department: this.getEmpData[0]?.department,
          employee_id: this.getEmpData[0]?.employee_id,
          employee_code: this.getEmpData[0]?.employee_code,
        });
      });
    }


  }

  getByPr() {
    this.prService.getByPr(this.id).subscribe((res: any) => {
      console.log(res, 'ressss');

    })
  }

  budget_details() {
console.log(this.prForm?.value.selectedPRType,'this.prForm?.value.selectedPRType');
console.log(this.createPrForm.value,'val');
console.log(this.createServiceForm.value,'val 2');

    let val = this.prForm?.value.selectedPRType == 'service' ? this.createServiceForm.value : this.createPrForm.value
console.log(val , "val 3");

    if (val.department == null) {
      return this.toast.error("Please Fill Department!");
    } else if (val.type == null) {
      return this.toast.error("Please Fill PR Type!");
    } else if (val.financial_year == null) {
      return this.toast.error("Please Fill Financial Year!");
    }
    let data = {
      dept_name: val.department,
      pr_type: val.type,
      financial_year: val.financial_year,
    }

    console.log(data, "dep Nmae");

    this.budgetService.getByIdDepartments(data).subscribe((res: any) => {
      console.log(res, 'bget data');

      // this.budget_details = res.data
      this.financialYear = res.data.financial_year_id;
      this.budgetAmount = res.data.amount;
      this.remainingAmount = res.data.remainingAmount;
      this.dept_po = res.total_mvp;
      console.log(res.data, "budget Details");
    },
      ((err: any) => {
        console.log(err, 'errorrr');
        if (err.error.code === 500) {
          this.toast.error("This Department Budget Is Not Define!")
        }
      })
    )
  }

  get CF_1(): any {
    return this.createPrForm.controls;
  }

  get CF_2(): any {
    return this.createServiceForm.controls;
  }
  get CF_3(): any {
    return this.createServiceForm.controls;
  }

  deleteRow(i: number) {
    <FormArray>this.CF_1.item_detail.removeAt(i);

    const control = this.createPrForm?.get('item_detail') as FormArray;
    console.log(control.value, 'control');
    let totalAmountPrice = 0;
    for (let a = 0; a <= control.value.length - 1; a++) {
      console.log(control.value[a], 'data[a]');

      totalAmountPrice += control.value[a]?.mvp
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

      totalAmountPrice += control.value[a]?.mvp
    }
    console.log(totalAmountPrice, 'this.totalAmountPrice');
    this.totalAmountService = totalAmountPrice
    console.log(this.itemData, 'this.itemData>>>>');
  }

  deleteBomRow(i: number) {
    <FormArray>this.CF_3.bomPr.removeAt(i);
    const control = this.createServiceForm?.get('bomPr') as FormArray;
    console.log(control);
    let totalAmountPrice = 0;
    for (let a = 0; a <= control.value.length - 1; a++) {
      console.log(control.value[a], 'control.value[a]');

      totalAmountPrice += control.value[a]?.mvp_product
    }
    console.log(totalAmountPrice, 'this.totalAmountPrice');
    this.totalAmountPrice = totalAmountPrice
  }

  arayEmpty(event: any) {
    if (event.target.value == 'item') {
      this.CF_1.item_detail = new FormArray([])
    } else if (event.target.value == 'BOM') {
      this.CF_3.bomPr = new FormArray([])
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
              old_mvp: new FormControl(e.MVP)
            })
          );
        }
        console.log(this.CF_1.item_detail.value, 'test control cf1');
        this.itemcontrolData = this.CF_1.item_detail.value
      });

      let totalAmountPrice = 0;
      for (let a = 0; a <= this.itemcontrolData.length - 1; a++) {
        console.log(this.itemcontrolData[a], 'this.itemcontrolData[a]');

        totalAmountPrice += Number(this.itemcontrolData[a]?.mvp)
      }
      console.log(totalAmountPrice, 'this.totalAmountPrice');
      this.totalAmountItem = totalAmountPrice
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
              old_mvp: new FormControl(e.MVP)
            })
          );
        }
        console.log(this.CF_2.service_detail);
        this.serviceControlData = this.CF_2.service_detail.value;
      });

      let totalAmountPrice = 0;
      for (let a = 0; a <= this.serviceControlData.length - 1; a++) {
        console.log(this.serviceControlData[a], 'this.serviceControlData[a]');

        totalAmountPrice += Number(this.serviceControlData[a]?.mvp)
      }
      console.log(totalAmountPrice, 'this.totalAmountPrice');
      this.totalAmountService = totalAmountPrice
    });

  }


  addBomService(e: any) {
    const dialogRef = this.dialog.open(AddBomDialogComponent, {
      width: '600px',
      data: { cellData: e.data },
    });
    dialogRef.afterClosed().subscribe((result) => {

      console.log(result, 'result')
      this.bomProductAll = result;
      this.selectVarient(this.bomProductAll);
      this.bomProductAll?.map((e: any) => {

        // if (e) {
        //   <FormArray>this.CF_3.bomPr.push(
        //     new FormGroup({
        //       service_id: new FormControl(e.service_id),
        //       service_document: new FormControl(`${environment.servralUrl + '/' + e.item_document}`),
        //       product_name: new FormControl(e.item_name),
        //       product_code: new FormControl(e.service_code),
        //       product_quantity: new FormControl(e.quantity),
        //       priority: new FormControl(null),
        //       mvp_product: new FormControl(e.quantity == null ? 0 : e.quantity * e.MVP),
        //       service_category_id: new FormControl(e.service_category_id),


        //     })
        //   );
        // }
        console.log(this.CF_3.bomPr);
      });
    });

    console.log(this.itemData, "itemData");
    let data: any = []
    for (let i = 0; i <= this.itemData.length; i++) {
      data.push({
        product_name: this.itemData[i]?.product_name,
        product_code: this.itemData[i]?.product_code,
        MVP: this.itemData[i]?.MVP,
        product_quantity: this.itemData[i]?.product_quantity,
        priority: this.itemData[i]?.priority,
        mvp_product: this.itemData[i]?.mvp_product,
        // `${environment.servralUrl + '/' + e.item_document}`
        item_document: `${environment.servralUrl + '/' + this.itemData[i]?.item_document}`,


      })
    }


    console.log(data, 'datadata');

    this.CF_3.bomPr = this.patchData(data);

  }



  // item
  keyUpItem(event: any, i: any, data: any) {
    console.log(event, 'event');

    console.log(data, 'data');
    let idControl = data.value.id;

    this.eventKeyUp = event;

    const control = this.createPrForm?.get('item_detail') as FormArray;
    console.log(control.value, 'control');

    let list = control.value;

    list.map((item: any) => {
      // itemData
      console.log(item)
      item.mvp = item?.item_quantity * Number(data?.value?.old_mvp);
    })
    console.log(list, 'list copy');
    this.createPrForm.patchValue({
      item_detail: list,
    })

    console.log(list, 'listlistlist');
    let totalAmountPrice = 0;
    for (let a = 0; a <= list.length - 1; a++) {
      console.log(list[a], 'data[a]');

      totalAmountPrice += list[a]?.mvp
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

    list.map((item: any) => {
      // itemData
      console.log(item)
      item.mvp = item?.service_quantity * Number(data?.value?.old_mvp);
    })
    console.log(list, 'list copy');
    this.createServiceForm.patchValue({
      service_detail: list,
    })

    console.log(list, 'listlistlist');
    let totalAmountPrice = 0;
    for (let a = 0; a <= list.length - 1; a++) {
      console.log(list[a], 'data[a]');

      totalAmountPrice += list[a]?.mvp
    }
    console.log(totalAmountPrice, 'this.totalAmountPrice');
    this.totalAmountService = totalAmountPrice
    console.log(this.itemData, 'this.itemData>>>>');
  }
  // bom amount

  keyUpAmount(event: any, i: any, data: any) {
    console.log(event, 'event');

    console.log(data);
    let idControl = data.value.id;

    this.eventKeyUp = event;

    const control = this.createServiceForm?.get('bomPr') as FormArray;
    console.log(control.value, 'control');

    let list = control.value;

    list.map((item: any) => {
      // itemData
      console.log(item)
      item.mvp_product = item?.product_quantity * data?.value?.mvp;
    })
    console.log(list, 'list copy');
    this.createServiceForm.patchValue({
      bomPr: list,
    })

    console.log(list, 'listlistlist');
    let totalAmountPrice = 0;
    for (let a = 0; a <= list.length - 1; a++) {
      console.log(list[a], 'data[a]');

      totalAmountPrice += list[a]?.mvp_product
    }
    console.log(totalAmountPrice, 'this.totalAmountPrice');
    this.totalAmountPrice = totalAmountPrice
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
    const dataBom = this.createServiceForm.get('bomPr') as FormArray;
    const service_det = this.createServiceForm.get('service_detail') as FormArray;

    let val2 = this.createServiceForm.value;

    console.log(val, 'val');



    if (this.prForm?.value.selectedPRType == 'item') {

      if (item_detail.value.length == 0) {
        this.toast.warning("Pls Add Item PR");
        return
      }
      if (this.createPrForm.invalid) {
        this.toast.error('Required fields should not be empty', 'Fields Error');
        return;
      }
    }

    this.totalPRValue = this.calculateTotalValue(item_detail.value);
    console.log(this.totalPRValue, 'this.totalPRValue');
    console.log(this.remainingAmount, 'this.remainingAmount');

    if (this.remainingAmount < this.totalPRValue) {
      this.openBudgetRemainder();
      return;
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
      formData.append('total_mvp', this.totalAmountItem);
      formData.append('type', val.type);
      formData.append('financial_year', val.financial_year);


      this.prService.createPr(formData).subscribe((res: any) => {
        this.resdata = res.data;
        if (res.code == 200) {
          this.toast.success(res.message);
          this.route.navigate([
            'master/purchase-main/purchase-request/all-pr-list',
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

      // this.totalPRValue = this.calculateTotalValue(item_detail.value);
      console.log(this.totalAmountService, 'this.totalPRValue');
      console.log(this.remainingAmount, 'this.remainingAmount');

      if (this.remainingAmount < this.totalAmountService) {
        this.openBudgetRemainder();
        return;
      }

      if (service_det.value?.length == 0) {
        this.toast.warning("Pls Add Serive PR");
        return
      }


      if (this.createServiceForm.invalid) {
        this.toast.error('Required fields should not be empty', 'Fields Error');
        return;
      }
    }
    if (this.prForm?.value.selectedPRType == 'service') {
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
      formData2.append('total_mvp', this.totalAmountService);
      formData2.append('type', val2.type);
      formData2.append('financial_year', val2.financial_year);

      this.prService.createPr(formData2).subscribe((res: any) => {
        this.resdata = res.data;
        if (res.code == 200) {
          this.toast.success(res.message);
          this.route.navigate([
            'master/purchase-main/purchase-request/all-pr-list',
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


    if (this.prForm?.value.selectedPRType == 'BOM') {
      if (dataBom.value?.length == 0) {

        this.toast.warning("Pls Add BOM PR");
        return
      }
      let val3 = this.createPrForm.value;
      console.log(val3, 'val3 test');

      if (this.createPrForm.invalid) {
        this.toast.error('Required fields should not be empty', 'Fields Error');
        return;
      }
    }

    if (this.prForm?.value.selectedPRType == 'BOM') {

      let val3 = this.createServiceForm.value;

      console.log(dataBom, 'dataBom');

      console.log(val3, 'val3');
      this.totalbomValue = this.calbomTotalValue(dataBom.value);
      console.log(this.totalbomValue, 'this.totalbomValue');
      console.log(this.remainingAmount, 'this.remainingAmount');

      if (this.remainingAmount < this.totalbomValue) {
        this.openBudgetRemainder();
        return;
      }
      // alert("bom")


      let formData2 = new FormData();
      formData2.append('department', val3.department);
      formData2.append('employee_id', val3.employee_id);
      formData2.append('location', val.location);
      formData2.append('state', val.state);
      formData2.append('city', val.city);
      formData2.append('pin', val.pin);
      formData2.append('delivery_address', val.delivery_address);
      let bomdata = JSON.stringify(dataBom.value);
      formData2.append(`bom_detail`, bomdata);
      formData2.append('file', this.imageToUpload);
      formData2.append(`PR_category`, 'BOM PR');
      formData2.append('total_mvp', this.totalAmountPrice);
      formData2.append('type', val.type);
      formData2.append('financial_year', val.financial_year);

      console.log(formData2, 'formData2')
      this.prService.createPr(formData2).subscribe((res: any) => {
        this.resdata = res.data;
        if (res.code == 200) {
          this.toast.success(res.message);
          this.route.navigate([
            'master/purchase-main/purchase-request/all-pr-list',
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


  selectVarient(e: any) {

    console.log(this.bomProductAll, 'this.bomProductAll');

    console.log(e, 'eeeee');
    this.noOfBom = e.noOfBOM;
    let data = {
      product_variant: e.varient.product_variant
    }
    this.prService.getAllItemVerient(e.varient.product_id, data).subscribe((res: any) => {

      console.log(res, 'res');
      this.itemData = res.data
      let data: any = []
      for (let i = 0; i <= this.itemData.length - 1; i++) {
        data.push({
          product_name: this.itemData[i]?.item_name,
          product_code: this.itemData[i]?.item_code,
          mvp_product: this.itemData[i]?.MVP * this.itemData[i]?.PRO_BOM_DETAILS_MSTs[0]?.bom_qty * this.bomProductAll?.noOfBOM,
          product_quantity: this.itemData[i]?.PRO_BOM_DETAILS_MSTs[0]?.bom_qty * this.bomProductAll?.noOfBOM,
          id: this.itemData[i]?.id,
          item_id: this.itemData[i]?.id,
          mvp: this.itemData[i]?.MVP,
          item_document: `${environment.servralUrl + '/' + this.itemData[i]?.item_document}`,
          product_varient: e.varient?.product_variant,
          bom_category_id: e?.bomCategory,
          item_quantity: this.itemData[i]?.PRO_BOM_DETAILS_MSTs[0]?.bom_qty,
          product_id: e?.product_name,
          no_of_bom: e?.noOfBOM,
          old_quantity: this.itemData[i]?.PRO_BOM_DETAILS_MSTs[0]?.bom_qty,
          old_mvp: this.itemData[i]?.MVP


        })
      }

      this.CF_3.bomPr = this.patchData(data);
      console.log(data, 'datadatadatadatadata');

      //       data.map((item:any)=>{
      // console.log(item,'item');
      // this.totalAmountPrice += item?.mvp_product
      //       })
      //       console.log(this.totalAmountPrice,'this.totalAmountPrice');
      let totalAmountPrice = 0;
      for (let a = 0; a <= data.length - 1; a++) {
        console.log(data[a], 'data[a]');

        totalAmountPrice += data[a]?.mvp_product
      }
      console.log(totalAmountPrice, 'this.totalAmountPrice');
      this.totalAmountPrice = totalAmountPrice


    })



  }
  calculateTotalValue(products: any): number {
    console.log(products, 'products');

    let totalValue: number = 0;
    for (const product of products) {
      const mvp: number = product.mvp;
      // const unit: number = product.unit;
      // const productValue: number = mvp * unit;
      totalValue += mvp;
    }
    console.log(totalValue, 'totalValue');

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
