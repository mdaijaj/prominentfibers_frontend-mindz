import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';

@Component({
  selector: 'app-import-holiday-popup',
  templateUrl: './import-holiday-popup.component.html',
  styleUrls: ['./import-holiday-popup.component.scss']
})
export class ImportHolidayPopupComponent {
  fileForm: FormGroup;
  files: any
  fileToUpload: File | null = null;
  holidayFile: any;
  isUpload:boolean = false;
  show:boolean = false;
  showLoader:boolean = false;

  constructor(public dialogRef: MatDialogRef<ImportHolidayPopupComponent>, @Inject(MAT_DIALOG_DATA) public dialog: MatDialog,  private hrServies: HrServiceService, private toastr:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.fileForm = new FormGroup({
      upload: new FormControl(null,[Validators.required]),
    });

    const file: any = document.querySelector('#file');
    file.addEventListener('change', (e: any) => {
      let setText: any = document.querySelector('.file-name');
      
      const [file] = e.target.files;
      if(file){
        this.show = true;
      }else{
        this.show = false;
        setText.textContent = ''
      }
      const { name: fileName, size } = file;
      const fileSize = (size / 1000).toFixed(2);
      const fileNameAndSize = `${fileName} - ${fileSize}kb`;
      setText.textContent = fileNameAndSize;
      
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  submit() {

    this.isUpload = true;
    if(this.fileForm.invalid){
      this.toastr.error('Please..','Select file');
      return
    };

    this.isUpload = false;
    this.postUploasVenderCsv();
    
  }

  uploadCsv(event: any) {
    // 
    const file = event.target.files[0];
    this.holidayFile = file;
  };

  postUploasVenderCsv(){
    this.showLoader = true;
    this.hrServies.upload_Holiday_By_file(this.holidayFile).subscribe(
      (res)=>{
        
        this.showLoader = false;
        this.dialogRef.close(res);
        this.toastr.success('Holiday Uploaded successfully','Upload Successful');
        this.reloadCurrentRoute();
      },
      (err)=>{
        this.showLoader = false;
        let errMsg = err.error.message;
        this.toastr.error('Somthing wrong please try agian..!','Error Message');
        
      }
    )
  }
}
