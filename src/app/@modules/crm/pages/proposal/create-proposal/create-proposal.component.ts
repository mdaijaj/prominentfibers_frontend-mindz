import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { CrmService } from 'src/app/@shared/services/crm/crm.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ProposalService } from 'src/app/@shared/services/crm/proposal.service';
import { AssignProposalDialogComponent } from '../dialogs/assign-proposal-dialog/assign-proposal-dialog.component';


@Component({
  selector: 'app-create-proposal',
  templateUrl: './create-proposal.component.html',
  styleUrls: ['./create-proposal.component.scss']
})
export class CreateProposalComponent {
  proposalForm: FormGroup;
  invoiceAddressForm: FormGroup;
  icon: boolean = true;
  leadFormSetupId: any;
  isDisabled: boolean = false;
  proposalTypeList: any = ["GST", "NON GST"];
  gstTypeList: any = ["CGST/SGST", "IGST"];
  leadId: any;
  proposalId: any;
  actionType: any;
  version_id: any;
  proposal_list_id: any;
  routerParams: any;
  status: any;
  isInvoiceSubmitted: boolean = false;
  userLoginId: any;
  formDisabled: boolean = false;
  isDiscountRequired: boolean = false;
  isDiscountApproved: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private $crm: CrmService,
    private location: Location,
    private dialog: MatDialog,
    private $proposal: ProposalService,
  ) {
    this.route.queryParams.subscribe((params: any) => {
      this.actionType = params?.actionType;
    });

    // Main form start
    this.proposalForm = this.fb.group({
      proposal_no: new FormControl(this.generateRandomPropWithDate(), Validators.required),
      proposal_type: new FormControl(null, Validators.required),
      company_name: new FormControl(null, Validators.required),
      contact_person_name: new FormControl(null, Validators.required),
      contact_number: new FormControl(null, Validators.required),
      mail_id: new FormControl(null, Validators.required),
      gst_no: new FormControl(null),

      total_cost: new FormControl(null, Validators.required),
      additional_charges: new FormControl(0, Validators.required),
      discount: new FormControl(null, Validators.required),
      taxable_value: new FormControl(null, Validators.required),
      sgst: new FormControl(null, Validators.required),
      cgst: new FormControl(null, Validators.required),
      igst: new FormControl(null, Validators.required),
      grant_total: new FormControl(null, Validators.required),

      // Product list start
      productDetailList: new FormArray([
        new FormGroup({
          id: new FormControl(null),
          product_master_id: new FormControl(null),
          variant_id: new FormControl(null),
          product_varient_list: new FormControl([]),
          product_code: new FormControl(null),
          product_description: new FormControl(null),
          uom_name: new FormControl(null),
          uom_id: new FormControl(null),
          qty: new FormControl(null),
          price_per_unit: new FormControl(null),
          gst_type: new FormControl(null),
          cgst: new FormControl(null),
          sgst: new FormControl(null),
          igst: new FormControl(null),
          maximum_discount: new FormControl(null),
          discount_approved: new FormControl(null),
          discount_request: new FormControl(null),
          readonly: new FormControl(true),
        }),
      ]),

      total_received: new FormControl(null),
      approvalRemark: new FormControl(null),
      invoice_remark: new FormControl(null),
    });

    // Invoice address form
    this.invoiceAddressForm = this.fb.group({
      branch_id: new FormControl(null, Validators.required),
      company_name: new FormControl(null, this.defferentAddress ? Validators.required : null),
      gst_no: new FormControl(null),
      complete_address: new FormControl(null),
    });
  }

  ngOnInit() {
    this.userLoginId = localStorage.getItem('EmpMainId')
    this.route.queryParams.subscribe((params: any) => {
      this.leadId = params?.id;
      this.proposalId = params?.proposalId;
      this.actionType = params?.actionType;
      this.version_id = params?.version_id;
      this.proposal_list_id = params?.proposal_list_id;
      this.routerParams = params;
      if (this.leadId || this.proposalId) {
        this.getAllproduct();
      }
      if (this.version_id) {
        this.proposalVersionListById()
      }
      else {
        if (this.leadId) {
          this.getLeadData(this.leadId);
        }
        if (this.proposalId) {
          this.getProposalList();
          this.branchSetup_get();
        }
      }
    });
    this.handleFormDisabled();
  }

  handleFormDisabled() {
    if (this.proposalId && this.actionType != 'edit') {
      this.formDisabled = true;
    }
  }

  handleShowHide(data: any) {
    if ((this.actionType == 'edit' || this.actionType == 'view') && data?.request_type == 'discount') {
      this.isDiscountRequired = true;
      this.isDiscountApproved = true;
    }
  }

  generateRandomPropWithDate() {
    if (this.actionType == 'create') {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '');
      const randomNumber = Math.floor(1000 + Math.random() * 9000);
      return 'PROP' + formattedDate + randomNumber;
    }
  }

  // Product selection start
  selectProduct(data: any, index: any) {
    let currentList = this.proposalForm?.value?.productDetailList;
    let productObj = this.productList?.find((elem: any) => elem?.id == data);

    // varient list create start
    let tempList = [...this.productList];
    let productVarientList: any = [];
    tempList?.map((item: any) => {
      if (item?.id == data) {
        productVarientList = item?.product_variant_masters;
      }
    })

    currentList[index] = {
      ...currentList[index],
      product_master_id: productObj?.id,
      product_code: productObj?.product_code,
      product_varient_list: productVarientList,

      variant_id: '',
      product_description: '',
      uom_name: '',
      uom_id: '',
      price_per_unit: '',
    }
    this.proposalForm.patchValue({
      productDetailList: currentList,
    });
    console.log(this.proposalForm)
  }

  generateProductVarient(data: any, index: any) {
    let currentList = [...this.proposalForm?.value?.productDetailList];

    // Varient object generate start
    let varientObj: any = {};
    this.productList?.map((item: any) => {
      item?.product_variant_masters?.map((subItem: any) => {
        if (subItem?.id == data) {
          varientObj = subItem;
        }
      })
    })
    // Varient object end

    // handle duplicate entry start
    let isDuplicate = true;
    if (currentList?.length > 1) {
      let newList = currentList.slice();
      if (currentList && currentList.length > 1) newList.splice(index, 1)
      newList?.map((item: any) => {
        if (item.variant_id == data) {
          isDuplicate = false;
          this.toast.error('This variant has been already added.')
        };
      });
    }
    // handle duplicate entry end

    currentList[index] = {
      ...currentList[index],
      variant_id: isDuplicate ? varientObj?.id : '',
      product_description: isDuplicate ? varientObj?.product_description : '',
      uom_name: isDuplicate ? varientObj?.tbl_uom?.uom_name : '',
      uom_id: isDuplicate ? varientObj?.uom_id : '',
      price_per_unit: isDuplicate ? varientObj?.price_per_unit : '',
      maximum_discount: isDuplicate ? varientObj?.maximum_discount : '',
    }
    this.proposalForm.patchValue({
      productDetailList: currentList,
    });
    this.productColculation();
  }

  get CF_1(): any {
    return this.proposalForm.controls;
  };

  addrow() {

    <FormArray>this.CF_1.productDetailList.push(
      new FormGroup({
        product_master_id: new FormControl(null),
        variant_id: new FormControl(null),
        product_varient_list: new FormControl([]),
        product_code: new FormControl(null),
        product_description: new FormControl(null),
        uom_name: new FormControl(null),
        uom_id: new FormControl(null),
        qty: new FormControl(null),
        price_per_unit: new FormControl(null),
        cgst: new FormControl(null),
        gst_type: new FormControl(null),
        sgst: new FormControl(null),
        igst: new FormControl(null),
        maximum_discount: new FormControl(null),
        discount_approved: new FormControl(null),
      }),
    );

    console.log(this.proposalForm);
  }

  deleteRow(i: any, control: any) {
    if (this.CF_1.productDetailList.length >= 1) {
      this.CF_1.productDetailList.removeAt(i);
    } else {
      this.toast.error('must be one', "Can't Deleted!");
    }
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

  goBack() {
    this.location.back();
  }

  // Get product name start
  productList: any = [];
  getAllproduct() {
    try {
      this.$crm.getAllproduct().subscribe((response: any) => {
        if (response) {
          this.productList = response.data;
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }
  // Get product name end

  // Get lead data start
  leadData: any = {};
  getLeadData(id: any) {
    try {
      this.$proposal.getProposalCompanyData(id).subscribe((response: any) => {
        if (response) {
          let obj = response.data;
          this.leadData = obj;
          this.setAllData(obj)
          this.handleShowHide(obj);
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  // Get proposal data start
  getData: any;
  getProposalList() {
    try {
      this.$proposal.getProposalList(this.proposalId, 'proposal_no', this.userLoginId).subscribe((response: any) => {
        if (response) {
          debugger
          let obj = response.data;
          this.status = obj?.proposal_status;
          this.getData = obj;
          this.setAllData(obj)
          this.handleShowHide(obj);
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  setAllData(obj: any) {
    // handle variant start
    let productDetailList = obj?.productDetailList;
    if (productDetailList) {
      this.productList?.map((item: any) => {
        productDetailList?.map((subSubItem: any) => {
          if (subSubItem?.product_master_id == item?.id) {
            subSubItem.product_varient_list = item.product_variant_masters;
          }
        });
      });
      this.CF_1.productDetailList = this.patchData(productDetailList);
    }
    // handle variant end

    this.proposalForm.patchValue({
      proposal_type: obj?.proposal_type,
      company_name: obj?.company_name,
      contact_person_name: obj?.contact_person_name,
      contact_number: obj?.contact_number,
      mail_id: obj?.mail_id,
      address: obj?.address,
      gst_no: obj?.gst_no,

      total_cost: obj?.total_cost,
      additional_charges: obj?.additional_charges,
      discount: obj?.discount,
      taxable_value: obj?.taxable_value,
      sgst: obj?.sgst,
      cgst: obj?.cgst,
      igst: obj?.igst,
      grant_total: obj?.grant_total,
    });
    this.proposalForm.patchValue({ total_cost: obj?.total_cost })
    if (this.actionType != 'create') {
      this.proposalForm.patchValue({ proposal_no: obj?.proposal_no })
    }
  }

  // Get proposal data version wise start
  proposalVersionListById() {
    try {
      this.$proposal.proposalVersionListById(this.version_id, this.proposalId).subscribe((response: any) => {
        if (response) {
          let obj = response.data;
          this.status = obj?.proposal_status;
          this.getData = obj;
          this.setAllData(obj)
          this.handleShowHide(obj)
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  // Product colculation start
  productColculation() {
    let formObj = this.proposalForm?.value;
    let currentList = this.proposalForm?.value?.productDetailList;
    if (currentList?.length) {
      let total_cost = 0;
      let taxable_value = 0;
      let discount = 0;
      let cgst = 0;
      let sgst = 0;
      let igst = 0;
      let grant_total = 0;
      currentList?.map((item: any) => {
        if (item?.qty) {
          total_cost = total_cost + (item?.qty * item?.price_per_unit);
        }
        else {
          total_cost = total_cost + Number(item?.price_per_unit);
        }

        if (item?.discount_approved) {
          discount = discount + (item?.qty ? item?.qty * item?.price_per_unit * item?.discount_approved / 100 : item?.price_per_unit * item?.discount_approved / 100);
        }
        else {
          discount = discount + (item?.qty ? item?.qty * item?.price_per_unit * item?.maximum_discount / 100 : item?.price_per_unit * item?.maximum_discount / 100);
        }

        if (item?.gst_type == 'CGST/SGST') {
          cgst = cgst + (item?.qty * item?.price_per_unit * item?.cgst / 100);
          sgst = sgst + (item?.qty * item?.price_per_unit * item?.sgst / 100);
        }
        else {
          igst = igst + (item?.qty * item?.price_per_unit * item?.igst / 100);
        }
      })
      taxable_value = taxable_value + (total_cost + Number(formObj?.additional_charges)) - discount;
      grant_total = taxable_value + cgst + sgst + igst;
      this.proposalForm.patchValue({
        total_cost: total_cost?.toFixed(2),
        discount: discount.toFixed(2),
        taxable_value: taxable_value.toFixed(2),
        cgst: cgst.toFixed(2),
        sgst: sgst.toFixed(2),
        igst: igst.toFixed(2),
        grant_total: grant_total.toFixed(2)
      });
    }
  }
  // Product colculation end

  // to restrict user from entering strings
  keyPress(event: Event | any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  // Add modal open start
  dialogOpen() {
    if (this.proposalForm.status === 'INVALID') {
      this.toast.error('Required fields should not be empty', 'Fields Error');
      return;
    }
    if (this.proposalForm?.value?.productDetailList?.length) {
      const dialogRef = this.dialog.open(AssignProposalDialogComponent, {
        width: '1200px',
        data: { value: this.proposalForm?.value, productList: this.productList, create_lead_id: this.getData?.create_lead_id },
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog closed with result:', result);
      });
    }
  }
  // Add modal open end

  // Handle upsell start
  upsellCreate() {
    Swal.fire({
      title: `You want to do Up-Sell ${'<br>'} Product Price`,
      // text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        let currentList = this.proposalForm?.value?.productDetailList;
        currentList?.map((item: any) => item.readonly = false)
        this.proposalForm.patchValue({
          productDetailList: currentList,
        });
      };
    });
  }

  // Update proposal start
  formObj: any = {};
  updateProposalStatus(statusType: any) {
    let approvalRemark = this.proposalForm?.value?.approvalRemark;
    let list: any = [];
    this.proposalForm?.value?.productDetailList?.map((item: any) => {
      list.push({ id: Number(item?.id), discount_approved: Number(item?.discount_approved) })
    })
    if (!approvalRemark) {
      return this.toast.error('Remark is required');
    }
    let data = {
      remark: approvalRemark,
      id: this.proposalId,
      proposal_status: statusType == "AP" ? "approved" : "rejected",
      productDetailList: list,
    }
    this.$proposal.updateProposalStatus(data).subscribe((res: any) => {
      if (res) {
        this.toast.success(res.message);
        this.goBack();
      }
    },
      (err) => {
        if (err.status == 400) {
          this.toast.error('Something went Wrong');
        } else if (err.status == 403) {
          this.toast.error('Already Exits!');
        }
        else {
          this.toast.error('Something went Wrong');
        }
      }
    );
  }

  setReceivedAmount(receivedAmt: any) {
    this.proposalForm.patchValue({
      total_received: receivedAmt,
    })
  }

  // Make invoice start
  showInvoice: boolean = false;
  defferentAddress: boolean = false;
  invoiceAddress: boolean = false;
  branchObj: any = {};

  makeInvoice() {
    this.showInvoice = true;
  }
  backInvoice() {
    this.showInvoice = false;
    this.invoiceAddress = false;
    this.resetAddressUpdateForm();
  }

  defferentAddressChange() {
    this.defferentAddress = !this.defferentAddress;
  }

  resetAddressUpdateForm() {
    this.invoiceAddressForm.reset();
    this.branchObj = {};
  }

  // Get branch address start
  branchList: any = [];
  branchSetup_get() {
    try {
      this.$crm.branchSetup_get().subscribe((response: any) => {
        if (response) {
          this.branchList = response.data?.filter((elem: any) => elem?.billing_status == 1);
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  backFromViewInvoice() {
    this.actionType = this.routerParams?.actionType;
    this.showInvoice = true;
    this.invoiceAddress = false;
    this.resetAddressUpdateForm();
  }

  viewInvoice() {
    this.branchObj = this.branchList?.find((elem: any) => elem?.id == this.invoiceAddressForm?.value?.branch_id);
    if (this.invoiceAddressForm.status === 'INVALID') {
      return this.toast.error('Required fields should not be empty', 'Fields Error');
    }
    this.getLeadData(this.proposalId);
    if (this.defferentAddress) {
      this.updateAddress();
      this.getUpdatedAddress();
    }
    else {
      this.showInvoice = false;
      this.defferentAddress = false;
      this.invoiceAddress = true;
      this.actionType = '';
    }
  }

  // Update address start
  updateAddress() {
    try {
      let req = this.invoiceAddressForm?.value;
      req.branch_id = this.branchObj?.id;
      req.proposal_id = this.proposalId;
      this.$proposal.createBilling(req).subscribe((response: any) => {
        if (response) {
          this.toast.success(response.message);
          this.showInvoice = false;
          this.defferentAddress = false;
          this.invoiceAddress = true;
          this.actionType = '';
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  // get updated address start
  getUpdatedAddress() {
    try {
      this.$proposal.getUpdatedAddress().subscribe((response: any) => {
        if (response) {
          let obj = response?.data;
          this.branchObj = {
            ...obj,
            ...this.branchObj,
            branch_address: obj?.complete_address,
            billing_id: obj?.id,
          };
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  // Save invoice start
  saveInvoice() {
    try {
      let req = {
        proposal_id: this.proposalId,
        billing_id: this.branchObj?.billing_id,
        invoice_remark: this.proposalForm?.value?.invoice_remark,
      }
      this.$proposal.createInvoice(req).subscribe((response: any) => {
        if (response) {
          this.isInvoiceSubmitted = true;
          this.toast.success(response.message);
          this.invoiceAddress = false;
          this.actionType = this.routerParams?.actionType;
          this.resetAddressUpdateForm();
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  // Gst validator start
  checkGSTNumber(value: any) {
    if (value) {
      const pattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
      return pattern.test(value);
    }
  }

  // Create proposal start

  createProposal() {
    let value = this.proposalForm?.value;
    if (this.proposalForm.status === 'INVALID') {
      return this.toast.error('Required fields should not be empty', 'Fields Error');
    }
    const gstValidate = this.checkGSTNumber(value?.gst_no);
    if (!gstValidate) {
      return this.toast.error('Enter Currect GST No.', 'Fields Error');
    }
    let data = {
      ...value,
      additional_charges: Number(value?.additional_charges),
      create_lead_id: this.leadId,
      login_id: this.userLoginId,
      request_type: 'normal'
    };
    if (this.actionType == 'edit') {
      data.id = this.proposalId;
      data.create_lead_id = this.getData?.create_lead_id;
      data.request_type = 'normal'
    }
    debugger
    this.$proposal.createProposal(data).subscribe((res: any) => {
      if (res) {
        this.toast.success(res.message);
        this.proposalForm.reset();
        this.proposalForm.patchValue({
          total_cost: null,
          additional_charges: 0,
          discount: null,
          taxable_value: null,
          sgst: null,
          cgst: null,
          igst: null,
          grant_total: null,
        })
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
  // Create proposal end

}
