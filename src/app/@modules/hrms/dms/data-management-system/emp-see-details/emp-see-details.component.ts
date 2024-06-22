import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerFactory } from 'ag-grid-community';
import { DMSService } from 'src/app/@shared/services/dms.service';
import { environment } from 'src/app/environments/environment';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PreviewComponent } from './preview/preview.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
@Component({
  selector: 'app-emp-see-details',
  templateUrl: './emp-see-details.component.html',
  styleUrls: ['./emp-see-details.component.scss']
})
export class EmpSeeDetailsComponent {
  name = 'Angular';
  fileUrl = "";
  sourceName = "Google preview of Power point(.ppt)";
 databaseKey: any = environment.servralUrl;
  url1:any
  singleFile:any
  disable: any = ''
  rowID: any
  getbyIDdata: any
  hide_show: boolean = true
  existingItem: any;
  formateData: any[] = [];
  empid: any;
  documentsData: any;
  noData: any;
  getData: any;
  nameEmploye: any;
  constructor(private activateRoute: ActivatedRoute,
    public dialog: MatDialog,
    private sanitise: DomSanitizer,
    private _dmsService: DMSService,
    private toast: ToastrService,
    private employService: EmpRegistrationService,
    private router: Router,) {
   
  }
  ngOnInit() {
    this.activateRoute.queryParams.subscribe(
      (res: any) => {
        console.log(res,'ressss');
        this.empid=res.id
        this.getSingleFolderData(res.id)
      })

      this.getSingleDocument();
      this.getByIdUse();
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  getSingleFolderData(id: any) {
    this._dmsService.AddById(id).subscribe(res1 => {
      this.getbyIDdata = res1.data;
      
      
      for (let i = 0; i < res1.data.employee_photo.length; i++) {
        this.formateData.push({ employee_photo: res1.data.employee_photo },)
      }
      for (let i = 0; i < this.formateData.length; i++) {
        for (let j = 0; j < res1.data.file_name.length; j++) {
          this.formateData[i].file_name = res1.data.file_name
        }
      }
      this.rowID = this.getbyIDdata.document_master_id;
    })
    
  }

  hideShow(id: any) {
    console.log(id,'iddd document');
Swal.fire({
  title: `File will be deleted parmanently.`,
  text: 'Are you sure to delete this file?',
  icon: 'warning',
  showCancelButton: true,
  cancelButtonColor: "#8B817D",
  confirmButtonColor: "#f44336",
  confirmButtonText: 'Yes',
  cancelButtonText: 'No, Skip'
}).then((result:any) => {

  if (result.isConfirmed){
    // // const data = {
    //   indexId: index
    // }
     this.employService.deleteDocument(id).subscribe(
        (res) => {
          this.getSingleDocument()
          // this.CF_1.tableRows.removeAt(i);
          this.toast.success('Item delete successful', 'Delete successfully ');
        },
        (err) => {
          
          this.toast.error('Somthing wrong please try again..!', 'Error Message ');
        }
      )
  }

})

    // if(id.employee_photo.length-1){
    //   // 
    //   // const data = {
    //   //   indexId: index
    //   // }
    //   // this._dmsService.deleteFiles(id.document_master_id, data).subscribe(res => {
    //   //   
    //   //   this.toast.success("User File sucessfully delete");
    //   //   // this.reloadCurrentRoute();
    //   //   window.location.reload();

    //   // })
    //   Swal.fire({
    //     title: `File will be deleted parmanently.`,
    //     text: 'Are you sure to delete this file?',
    //     icon: 'warning',
    //     showCancelButton: true,
    //     cancelButtonColor: "#8B817D",
    //     confirmButtonColor: "#f44336",
    //     confirmButtonText: 'Yes',
    //     cancelButtonText: 'No, Skip'
    //   }).then((result:any) => {
  
    //     if (result.isConfirmed){
    //       const data = {
    //         indexId: index
    //       }
    //        this.employService.deleteDocument(control.value.emp_document_id).subscribe(
    //           (res) => {
                
    //             this.CF_1.tableRows.removeAt(i);
    //             this.toastr.success('Item delete successful', 'Delete successfully ');
    //           },
    //           (err) => {
                
    //             this.toastr.error('Somthing wrong please try again..!', 'Error Message ');
    //           }
    //         )
    //     }
  
    //   })
      
    // }
    // else{
    //    Swal.fire({
    //   title: `Employee :- ${id.folder_name} Folder will be deleted parmanently.`,
    //   text: 'Are you sure to delete this file?',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   cancelButtonColor: "#8B817D",
    //   confirmButtonColor: "#f44336",
    //   confirmButtonText: 'Yes',
    //   cancelButtonText: 'No, Skip'
    // }).then((result:any) => {

    //   if (result.isConfirmed){
    //     const data = {
    //       indexId: index
    //     }
    //     this._dmsService.deleteFiles(id.document_master_id, data).subscribe(res => {
          
    //       // this.reloadCurrentRoute();
    //     this.toast.success("User File sucessfully delete");
    //     this.router.navigate(['master/hrms/DMS/dataManagement/docLibrary']);
    //       // window.location.reload();
    //     }) 
    //   }

    // })
    

    // }
   
    // this.toastr.success('Hello world!', 'Toastr fun!')
  }
  // reloadCurrentRoute() {
  //   let currentUrl = this.router.url;
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     window.location.reload();
  // this.router.navigate(['currentUrl']);
  //   });
  // }

  download(url:any){
    console.log(url,'url');
    
    var parts = url.split("/"); 
    console.log(parts,'parts');
    
    var lastSlash = parts.slice(-1).join('');
    console.log(lastSlash,'lastSlash');
    
    this.singleFile=`${this.databaseKey}/api/v1/downloadDocumentMaster/${lastSlash}`
    // this._dmsService.downloadSingleFiles(lastSlash).subscribe((res:any)=>{
    //   this.singleFile=res
      // alert(this.singleFile);
      
    // })    
  }
  preview(url: any) {
    var parts = url.split("/"); 
    var lastSlash = parts.slice(-1).join('');
    `/api/v1/downloadDocumentMaster/${lastSlash}`
    
    
    
    
    window.open(url, "_blank", "toolbar=yes,scroll/bars=yes,resizable=yes,top=300,left=300,width=800,height=800");
  }
  openDialog(path:any,typeFile:any) {
    // 
    this.dialog.open(PreviewComponent, {
      width: '100%',
      height: '80%',
      data:{path,typeFile}
    })
  }

  openFilePreview (url:any,type:any) {
    // var parts = url.split("/"); 
    // var lastSlash = parts.slice(-1).join('');
    // 
    
    if(type=='.docx'){
    switch(type){
      // case 'gppt' :
      // this.fileUrl = "https://docs.google.com/gview?url=https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pptx&embedded=true";
      // this.sourceName = "Google preview of Power point(.ppt)";
      // break;
      // case 'oppt' :
      // this.fileUrl = "https://view.officeapps.live.com/op/embed.aspx?src=https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pptx";
      // this.sourceName = "MS Office preview of Power point(.ppt)";
      // break;
        // case '.docx' :
        // this.fileUrl = 'https://dqsdevapi.elitetraveltech.in/documents/employee_photo-1674756885639.docx';
        // this.sourceName = "Google preview of Document(.doc)";
      // break;
      case '.docx' :
      this.fileUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${url}`;
      this.sourceName = "MS Office preview of Document(.doc)";
  // window.open(this.fileUrl, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=300,left=300,width=800,height=800");

      break;
      // case 'gxlsx' :
      // this.fileUrl = "https://docs.google.com/gview?url=https://pgcconline.blackboard.com/webapps/dur-browserCheck-bb_bb60/samples/sample.xlsx&embedded=true";
      // this.sourceName = "Google preview of Excel(.xls)";
      // break;
      // case 'oxlsx' :
      // this.fileUrl = "https://view.officeapps.live.com/op/embed.aspx?src=https://pgcconline.blackboard.com/webapps/dur-browserCheck-bb_bb60/samples/sample.xlsx";
      // this.sourceName = "MS Office preview of Excel(.xls)";
      // break;
      // default : 
      // this.fileUrl = "https://docs.google.com/gview?url=https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pptx&embedded=true";
      // this.sourceName = "Google preview of Power point(.ppt)";
    }
  }
  else
  this.fileUrl=url;

  // window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=300,left=300,width=800,height=800");

}
cleanUrl(url:any){
  return this.sanitise.bypassSecurityTrustResourceUrl(url);
}

getSingleDocument() {
  this.employService.getSingleDocument(this.empid).subscribe((res: any) => {
    console.log(res,'ressssssss');

    this.documentsData=res.data;
    if(res.data.length==0){
      this.noData="No Data Found"
    }
    // for(let a=0;a<=this.documentsData.length;a++){
    //   console.log(res.data[a],'res.data[a].length');
      
    //   }

    console.log(this.noData,'this.noData');
    
})
  }
  getByIdUse() {
    this.employService.getByUserId(this.empid).subscribe((res: any) => {
      this.getData = res.data;
      // this.reposting = res.data?.reporting_manager;
     // this.basicFormPatch(this.getData, this.propertyManager);
    this.nameEmploye= `${this.getData.title} ` + `${this.getData.first_name}`+ ` ${this.getData.last_name}`
    });
  }
}