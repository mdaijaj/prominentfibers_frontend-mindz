import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DMSService } from 'src/app/@shared/services/dms.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-folder',
  templateUrl: './edit-folder.component.html',
  styleUrls: ['./edit-folder.component.scss']
})
export class EditFolderComponent {


  getbyIDdata: any
  myFiles: any = [];
  fileList: any;
  id: any;
  selectedFile: any;
  showFileInput: boolean = false;
  onChangeIndexIDofFile: any;


  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileDes: new FormControl('', [Validators.required, Validators.minLength(5)]),
    selectFile: new FormControl('', []),
  });

  constructor(private http: HttpClient,
    private activateRoute: ActivatedRoute,
    private _location: Location,
    private toast: ToastrService,
    private _dmsService: DMSService,

    private router: Router) {
    this.activateRoute.queryParams.subscribe(
      (res: any) => {
        

        this.id = res.document_master_id;
        
        this.getSingledata()
      })
    this.getSingledata();
  }

  get f() {
    return this.myForm.controls;
  }
  onFileChange(event: any) {

  }
  fileChange(e: any) {
    this.fileList = e.target.files[0];
    

  }

  updateForm(val: any) {
    
    if (this.myForm.valid) {
      
      let val: any = this.myForm.value;
      const formData = new FormData();
      let file: File = this.fileList;
      formData.append("indexId", this.onChangeIndexIDofFile);
      formData.append("folder_name", val.name);
      formData.append("file_description", val.fileDes);
      formData.append("employee_photo", file, file.name);

      

      


      this._dmsService.updateFileAndFolder(this.getbyIDdata.document_master_id, formData)
        .subscribe(res => {
          
          this.toast.success("Folder Created Successfully.....")
          this.router.navigate(['master/hrms/DMS/dataManagement/docLibrary']);
        })

    }
    else {

    }

  }
  cancel() {
  }
  back() {
    this._location.back();
  }
  getSingledata() {
    this._dmsService.AddById(this.id).subscribe(res1 => {
      this.getbyIDdata = res1.data;
      
      
      this.myForm.patchValue({
        name: this.getbyIDdata.folder_name,
        file: this.getbyIDdata.employee_photo,
        fileDes: this.getbyIDdata.file_description,
      })
    })
  }

  fileChangeInUpdateTime(file: any) {
    

    this.showFileInput = true;
    this.selectedFile = file.value;
    this.onChangeIndexIDofFile = file.source._keyManager._activeItemIndex;
  }

  formDataPatch(getbyIDdata: any) {
  }
}