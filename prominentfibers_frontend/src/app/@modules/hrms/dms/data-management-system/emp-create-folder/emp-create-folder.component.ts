import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { getAriaLevel } from 'ag-grid-community/dist/lib/utils/aria';
import { ToastrService } from 'ngx-toastr';
import { DMSService } from 'src/app/@shared/services/dms.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-create-folder',
  templateUrl: './emp-create-folder.component.html',
  styleUrls: ['./emp-create-folder.component.scss']
})
export class EmpCreateFolderComponent implements OnInit{

  // errorMsg: string = '';
  // fileDetails: { filePath: string | any; file: any } = {
  //   filePath: '',
  //   file: null,
  // };
  // getAllData: any;
  // file!:File
  // backgroundForm: FormGroup = new FormGroup({});
  // loading: boolean = false;
  // resumeUploaded: any;
  // emailVerify: any;
  // clicked: boolean = false;
  // clickedTwo: boolean = false;
  // clickedSix: boolean = false;
  // clickedFive: boolean = false;
  // clickedThree: boolean = false;
  // clickedFour: boolean = false;
  // phoneVerify: any;
  //   bvg_id: any;
  // previousJob: any;
  // imageToUpload: any;
  // imagePath: any;
  // pdfFile: any = '/assets/icons/pdfimg.png';
  // docFile: any = '/assets/icons/word.png';
  // excelFile: any = '/assets/icons/exc3.png';
  // FilePaths: any = [];
  // constructor(
  //   private fb: FormBuilder, private recruitService: RecruitService, private toast: ToastrService,
  //   private route: Router,
  //   private dms_Service: DMSService,
  // ) {
  //   this.backgroundForm = this.fb.group({
  //     folderName: new FormControl(null),

  //     allfilesName: new FormArray([
  //       new FormGroup({
  //         fileName: new FormControl(null)
  //       })
  //     ]),
  //   });
  // }


  // get CF_1(): any {
  //    return this.backgroundForm.controls
  //    };

  // fileInputChange(fileInput: File[] | any) {
  //   this.errorMsg = '';
  //   
  //   this.resumeUploaded = fileInput.target.files[0].name
  //   if (fileInput.target.files && fileInput.target.files[0]) {
  //     const file = fileInput.target.files[0];
  //     const reader = new FileReader();
  //     const fileSizeInMb = file.size / 1024 ** 2;
  //     if (fileSizeInMb > 30) {
  //       this.errorMsg = 'File size should be less than 30MB';
  //       return;
  //     }
  //     reader.onload = (e: any) => {
  //       this.fileDetails.filePath = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //     this.fileDetails.file = file;
  //   } else {
  //     this.fileDetails = { filePath: '', file: null };
  //   }
  // }
  // addRow(){
  //   <FormArray>this.CF_1.allfilesName.push(
  //     new FormGroup({
  //       fileName: new FormControl(null),
  //     })
  //   )
  // };

  // saveDetails(form: FormGroup) {
  //   const formValues = this.backgroundForm.value;
  //   
  //   
  //   this.createData(formValues);

  //   
  //   let bvgData: any = this.CF_1.allfilesName.value
  //   

  //   const data: any = {
  //     folderName: formValues?.folderName,

  //     allfilesName: bvgData,
  //     fileName_verification: this.previousJob
  //   };


  //   this.dms_Service.createList(data)
  //   .subscribe((res: any) => {
  //     this.loading = true;
  //     
  //     this.bvg_id = res.data.candidtaes_v_Id;
  //     this.dms_Service.createPdf(this.bvg_id, this.fileDetails.file).subscribe((res:any) => {
  //       this.toast.success('Candidate Profile Updated successfully..');
  //       this.route.navigate(['hrms/recuitment-module/verification-list']);
  //     })
  //   });
  // }

  // createData(val: any) {
  //   this.dms_Service.createList(val).subscribe(
  //     res => {
  //       this.getAll();
  //     })
  // }
  // getAll() {
  //   this.getAllData = this.dms_Service
  // }



  // remove() {
  //   this.backgroundForm.reset();
  // }
  // **************************Ok code start************************************
  // errorMsg: string = '';
  // fileDetails: { filePath: string | any; file: any } = {
  //   filePath: '',
  //   file: null,
  // };
  // backgroundForm: FormGroup = new FormGroup({});
  // loading:boolean = false;
  // resumeUploaded: any;
  // emailVerify: any;
  // clicked: boolean = false;
  // clickedTwo: boolean = false;
  // clickedSix: boolean = false;
  // clickedFive: boolean = false;
  // clickedThree: boolean = false;
  // clickedFour: boolean = false;
  // phoneVerify: any;
  // previousJob: any;
  // bvg_id: any;
  // constructor(
  //   private fb: FormBuilder, private recruitService: RecruitService, private toast: ToastrService,
  //   private route: Router,
  //   private _dmsService:DMSService
  // ) {
  //   this.backgroundForm = this.fb.group({
  //     candidate: new FormControl(null),
  //     // email: new FormControl(null, [
  //     //   Validators.required,
  //     //   Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
  //     // ]),
  //     // mobile_no: new FormControl(null, [
  //     //   Validators.required,
  //     //   Validators.maxLength(10),
  //     //   Validators.pattern('^[0-9]*$'),
  //     //   Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
  //     // ]),
  //     others_documents: new FormControl(null),
  //     previousJobRow: new FormArray([
  //       new FormGroup({
  //         precious_job_status: new FormControl(null)
  //       })
  //     ]),
  //   });
  // }

  // get CF_1(): any { return this.backgroundForm.controls };

  // fileInputChange(fileInput: File[] | any) {
  //   this.errorMsg = '';
  //   
  //   this.resumeUploaded = fileInput.target.files[0].name
  //   if (fileInput.target.files && fileInput.target.files[0]) {
  //     const file = fileInput.target.files[0];
  //     const reader = new FileReader();
  //     const fileSizeInMb = file.size / 1024 ** 2;
  //     if (fileSizeInMb > 30) {
  //       this.errorMsg = 'File size should be less than 30MB';
  //       return;
  //     }
  //     reader.onload = (e: any) => {
  //       this.fileDetails.filePath = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //     this.fileDetails.file = file;
  //   } else {
  //     this.fileDetails = { filePath: '', file: null };
  //   }
  // }
  // addRow() {
  //     <FormArray>this.CF_1.previousJobRow.push(
  //       new FormGroup({
  //         precious_job_status: new FormControl(null),
  //       })
  //     )
  // };
  // passValue(e: any) {
  //   
  //   if (e.target.outerText === "Verified") {
  //     this.emailVerify = "1";
  //     this.clicked = true;
  //     this.clickedTwo = false;
  //   }
  //   if (e.target.outerText === "Not Verified") {
  //     this.emailVerify = "0";
  //     this.clickedTwo = true;
  //     this.clicked = false;
  //   }
  // }
  // passValueTwo(e: any) {
  //   
  //   if (e.target.outerText === "Verified") {
  //     this.phoneVerify = "1";
  //     this.clickedThree = true;
  //     this.clickedFour = false;
  //   }
  //   if (e.target.outerText === "Not Verified") {
  //     this.phoneVerify = "0";
  //     this.clickedFour = true;
  //     this.clickedThree = false;
  //   }
  // }
  // passValueThree(e: any) {
  //   
  //   if (e.target.outerText === "Verified") {
  //     this.previousJob = "1";
  //     this.clickedFive = true;
  //     this.clickedSix = false;
  //   }
  //   if (e.target.outerText === "Not Verified") {
  //     this.previousJob = "0";
  //     this.clickedSix = true;
  //     this.clickedFive = false;
  //   }
  // }
  // saveDetails(form: FormGroup) {
  //   const formValues = form.value;
  //   
  //   if (form.status === 'INVALID') {
  //     this.toast.error('Required fields should not be empty', 'Fields Error');
  //     return;
  //   }
  //   // if (this.fileDetails.file === null) {
  //   //   this.errorMsg = 'File size should be less than 30MB';
  //   //   return;
  //   // }

  //   // this.submitted = true;
  //   
  //   let bvgData: any = this.CF_1.previousJobRow.value
  //   

  //   const data: any = {
  //     candidate: formValues?.candidate,
  //     email: formValues?.email,
  //     email_verification: this.emailVerify,
  //     mobile_no: formValues?.mobile_no,
  //     phone_verification: this.phoneVerify,
  //     precious_job_status: bvgData,
  //     precious_job_status_verification: this.previousJob
  //   };


  //     this._dmsService.createCandidate(data)
  //       .subscribe((res: any) => {
  //         this.loading = true;
  //         
  //         this.bvg_id = res.data.candidtaes_v_Id;
  //         this._dmsService.createPdf(this.bvg_id, this.fileDetails.file).subscribe((res:any) => {
  //           this.toast.success('Candidate Profile Updated successfully..');
  //           this.route.navigate(['hrms/recuitment-module/verification-list']);
  //         })
  //       });
  // }
  // remove(){
  //   this.backgroundForm.reset();
  // }

  // **************************Ok code End************************************
  myFiles: any = [];
  fileList: any;
  Login_user_id:any=localStorage.getItem('EmpMainId');
  LoginGetData:any
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileDes: new FormControl('', [Validators.required, Validators.minLength(5)]),
    // employee_id: new FormControl('', []),

  });

  constructor(private http: HttpClient,
    private _location: Location,
    private toast: ToastrService,
    private _dmsService: DMSService,

    private router: Router) { 
       


    }
    ngOnInit(): void {
      
      
      this._dmsService.get_logIn_Admin_name(this.Login_user_id).
      subscribe((res:any)=>{
        this.LoginGetData=res.data
        
        
        
        
        
      })
      
    }

  get f() {
    return this.myForm.controls;
  }
  onFileChange(event: any) {
    
    
    this.fileList = event.target.files;
    
  }
  submit(val: any) {

    if (this.myForm.status=="VALID") {
      
      
      let val: any = this.myForm.value;
      const formData = new FormData();
      formData.append("employee_id", this.LoginGetData?.employee_id);
      formData.append("author", this.LoginGetData?.first_name);
      formData.append("folder_name", val.name);
      formData.append("file_description", val.fileDes);
      for (var i = 0; i < this.fileList.length; i++) {
        let file: File = this.fileList[i];
        
        formData.append("employee_photo", file, file.name);   
      };
      
      
      // this.http.post('https://dqsapi.elitetraveltech.in/api/v1/createDocumentMaster', formData)

      // this.http.post('http://192.168.20.134:5000/api/v1/createDocumentMaster', formData)
      this._dmsService.createFileAndFoler(formData)
         .subscribe(res => {
          
          this.toast.success("Folder Created Successfully.....")
          this.router.navigate(['master/hrms/DMS/dataManagement/docLibrary']);
          
        },
        )

        
      // this._location.back();
    }
    else{
      this.toast.error("Please fill valid data","Error")

    }
 
  }
  cancel() {
  }
  back() {
    this._location.back();
  }

 
}