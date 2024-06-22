
import { Component, OnInit } from '@angular/core';
import { LmsServiceService } from 'src/app/@shared/services/lms-service.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/app/environments/environment';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
@Component({
  selector: 'app-upload-review-csv',
  templateUrl: './upload-review-csv.component.html',
  styleUrls: ['./upload-review-csv.component.scss']
})
// export class UploadmangeCsvPopupComponent {

//    databaseKey: any = environment.servralUrl;

//   selectedFile: any = null;
//   CSV_file: any
//   show: boolean = false;
//   fileFormat: any
//   setFileSize: any;
//   setText: any = "no choose file";
//   DemoFileUrl: string;
//   id: any;
//   lead_id: any;
//   singleLeadData: any;
//   auditId: any;
//   constructor(private configService: ConfigurationalmasterService,
//     private _location: Location,
//     private router: Router,
//     private toast: ToastrService,private leadService: LeadService,private activeroute: ActivatedRoute) {
//       this.activeroute.queryParams.subscribe((params:any) => {
//         this.id = params;
//         this.lead_id = this.id.lead_id;
//         console.log(params,'params');
//         this.auditId=params.audit_id;

//         console.log(this.auditId,'this.this.auditId');
        
//         this.leadService.getByIdLead(this.auditId).subscribe((res: any) => {
//           this.singleLeadData = res.data;
//           console.log(this.singleLeadData,'this.singleLeadData');
          
//           // this.patchFormvalue();
//         })
       
//       });
//   }
//   ngOnInit(): void {
//     this.DemoFileUrl=`${this.databaseKey}/masterDocument/contact_review_form-1680243536580.csv`

//   }
  
//   // https://dqsdevapi.elitetraveltech.in/masterDocument/contact_review_form-1680243536580.csv
//   uploadCsv(event:any) {
//     // alert("event")
//     // console.log(event,'event');
//     console.log(event,'event');
    
//     // if (event.target.files[0].name.split('.').pop() === "csv") {
      
//     //   this.selectedFile = event.target.files[0] ?? null;
//     //   this.fileFormat = this.selectedFile.name.split('.').pop();
      
      
      
      
//     //   this.CVS_file_formate();
//     //   return
//     // }
//     // else {
//     //   this.otherFormate();
//     // }
//     // // this._lmsService.createCSV_File(this.selectedFile).subscribe(res=>{
//     // //   this.CSV_file=res;
//     // //   
//     // // })
//   }
//   CVS_file_formate() {
//       const file: any = document.querySelector('#file');
//       console.log(file,'file');
      
//       this.setText = this.selectedFile.name;
//       console.log(this.setText,'this.setText');
      
//       // const fileSize = (size / 1000).toFixed(2);
//       let filesize = (this.selectedFile.size / 1000).toFixed(2)
//       this.setFileSize = `${filesize}kb`
      
      
      
    
//   }
//   otherFormate() {
//     this.setText = "Invalid File"
//     this.setFileSize = ' ';
    

//   }
//   // upload_file() {
//   //   const formData = new FormData();
//   //   let file: File = this.selectedFile;
//   //   formData.append("file", file, file.name);
//   //   console.log(formData,'formData');
//   //   if (this.fileFormat) {
    
    
    
      
      
      
//   //     this.leadService.postAuditL1reviewDataPatch( this.auditId,formData).subscribe(res => {
//   //       this.CSV_file = res;
//   //     this.toast.success("File Upload Successfully.....")
        
//   //       // this.toast.success('')
//   //     this.reloadWindow();
       
//   //     })
//   //     // this.router.navigate(['master/lms/lms-home/user-management']);
//   //     // window.location.reload();
    
//   // }
//   //   // else{
//   //   //   this.toast.error("Invalid File .....L1 reviewer")
//   //   // }
    
//   // }

//   upload_file() {
//     // alert("1")
//     console.log(this.fileFormat,'this.fileFormat');
  
//     if (this.fileFormat) {
//       console.log(this.fileFormat,'this.fileFormat');
      
//       alert("2")
//     const formData = new FormData();
//     let file: File = this.selectedFile;
//     formData.append("file", file, file.name);
//     if (this.selectedFile) {
      
//       alert("3")
      
//       this.leadService.postAuditL1reviewDataPatch( this.auditId,formData).subscribe(res => {
//         this.CSV_file = res;
        
//         // this.toast.success('')
       
//       })
//       this.toast.success("File Upload Successfully.....")
//       // this.router.navigate(['master/lms/lms-home/user-management']);
//       // window.location.reload();
//       this.reloadWindow();
//     }
//   }
//     else{
//       this.toast.error("Invalid File .....")
//     }
    
//   }
//   reloadWindow() {
//     setTimeout(() => {
//       window.location.reload();
//     }, 800);
//   }

// }
export class UploadReviewCsvComponent implements OnInit {
  databaseKey: any = environment.servralUrl;

 selectedFile: any = null;
 CSV_file: any
 show: boolean = false;
 fileFormat: any
 setFileSize: any;
 setText: any = "no choose file";
 DemoFileUrl: string;
 id: any;
 lead_id: any;
 singleLeadData: any;
  auditId: any;
 constructor(private configService: ConfigurationalmasterService,
   private _location: Location,
   private router: Router,
   private toast: ToastrService,private leadService: LeadService,private activeroute: ActivatedRoute) {
     this.activeroute.queryParams.subscribe((params:any) => {
       this.id = params;
       this.lead_id = this.id.lead_id;
       this.auditId=params.audit_id;

       console.log(this.auditId,'this.this.auditId');
       this.leadService.getByIdLead(this.auditId).subscribe((res: any) => {
         this.singleLeadData = res.data;
         
         // this.patchFormvalue();
       })
      
     });
 }
 ngOnInit(): void {
   this.DemoFileUrl=`${this.databaseKey}/api/v1/download_Document_lead_file/document_link-1690199714873.xlsx`

 }
 
 // https://dqsdevapi.elitetraveltech.in/masterDocument/contact_review_form-1680243536580.csv
 uploadCsv(event: any) {
   console.log(event,'event');
   
  //  alert("1")
   if (event.target.files[0].name.split('.').pop() === "xlsx") {
     
     this.selectedFile = event.target.files[0] ?? null;
     this.fileFormat = this.selectedFile.name.split('.').pop();
     
     
     
     
     this.CVS_file_formate();
     return
   }
   else {
     this.otherFormate();
   }
   // this._lmsService.createCSV_File(this.selectedFile).subscribe(res=>{
   //   this.CSV_file=res;
   //   
   // })
 }
 CVS_file_formate() {
     const file: any = document.querySelector('#filesCopy');
     
     this.setText = this.selectedFile.name
     // const fileSize = (size / 1000).toFixed(2);
     let filesize = (this.selectedFile.size / 1000).toFixed(2)
     this.setFileSize = `${filesize}kb`
     
     
     
   
 }
 otherFormate() {
   this.setText = "Invalid File"
   this.setFileSize = ' ';
   

 }
 upload_file() {
 
   if (this.fileFormat) {
   const formData = new FormData();
   let file: File = this.selectedFile;
   formData.append("file", file, file.name);
   if (this.selectedFile) {
     
     
     
     this.leadService.updateL1ReviewFile(this.auditId,formData).subscribe(res => {
       this.CSV_file = res;
       
       // this.toast.success('')
      
     })
     this.toast.success("File Upload Successfully.....")
     // this.router.navigate(['master/lms/lms-home/user-management']);
     // window.location.reload();
      this.reloadWindow();
   }
 }
   else{
     this.toast.error("Invalid File .....")
   }
   
 }

 reloadWindow() {
   setTimeout(() => {
     window.location.reload();
   }, 800);
 }

}