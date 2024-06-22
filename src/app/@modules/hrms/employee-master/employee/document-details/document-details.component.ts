import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { DMSService } from 'src/app/@shared/services/dms.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss']
})
export class DocumentDetailsComponent implements OnInit, AfterViewInit {
  documentForm: any;
  file: any;
  imageToUpload: any;
  imagePath: any;
  documentDetails: any;
  id: any;
  documentDetailss: any;
  employeId: any;
  empId: any;
  FilePaths: any = [];
  isSend: boolean = false;
  singleDocumentData: any;
  isDisable: boolean = false;
  curentIndex: any;
  selectedImg: any;
  pdfFile: any = '/assets/icons/pdfimg.png';
  docFile: any = '/assets/icons/word.png';
  excelFile: any = '/assets/icons/exc3.png';
  acceptedFiles: any = ['PDF', 'DOC','DOCX', 'JPEG', 'JPG', 'GIF', 'PNG']
  file_type: any;
  add_document: boolean = false;
  doc_id: any;
  show: boolean = true;

  constructor(private fb: FormBuilder,
    private activetedRoute: ActivatedRoute,
    private locatin: Location,
    private route: Router, private toastr: ToastrService, 
    private recruitService: RecruitService, 
    private toast: ToastrService, private employService: EmpRegistrationService) {
    // documentName:new FormControl(null,Validators.required),
    this.documentForm = this.fb.group({
      tableRows: new FormArray([
        new FormGroup({
          document_type: new FormControl(null, [Validators.required]),
          document_name: new FormControl(null, [Validators.required]),
          description: new FormControl(null, [Validators.required]),
          document_file: new FormControl(null, [Validators.required]),
        })
      ]),
    })

    this.CF_1.tableRows.controls[0].isSend = false;
    this.CF_1.tableRows.controls[0].showLoader = false;

   }

   get tableRows(): FormArray {
    return this.documentForm.get('tableRows') as FormArray;
  }

  ngOnInit(): void {
    this.activetedRoute.queryParams.subscribe((params: any) => {
      console.log(params);
      
      this.id = params;
      this.employeId = parseInt(this.id.employee_id);
      console.log(this.employeId);
      
      if (params.employee_id) {
        
      } else {
        // this.route.navigate(['/hrms/employee-master/employ']) 
      }
    })
    this.employService.setEmpTitle('DOCUMENT DETAILS')

    // if (this.employeId) {
    //   this.getSingleDocument(this.employeId);
    // };
  }

  ngAfterViewInit(): void {
    if (this.employeId) {
      this.getSingleDocument(this.employeId);
    };
  }

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }

  onChange(e: any, i: any) {
     if (e.target.files && e.target.files[0]) {
      const data: FileList = e.target.files;
      this.imageToUpload = data.item(0);
      let file = this.imageToUpload.name.split('.');
      let fileExe = file[file.length - 1].toUpperCase();
      const reader = new FileReader();
      if (fileExe === "PDF") {
        this.CF_1.tableRows.controls[i].imagePath = this.pdfFile;
      } else if (fileExe === 'XLSX') {
        this.CF_1.tableRows.controls[i].imagePath = this.excelFile;
      } else if (fileExe === 'CSV') {
        this.CF_1.tableRows.controls[i].imagePath = this.excelFile;
      } else if (fileExe === 'DOC') {
        this.CF_1.tableRows.controls[i].imagePath = this.docFile;
      } else if (fileExe === 'DOCX') {
        this.CF_1.tableRows.controls[i].imagePath = this.docFile;
      } else if (fileExe === 'DOTX') {
        this.CF_1.tableRows.controls[i].imagePath = this.docFile;
      } else if (fileExe === 'JPEG' || 'JPG' || 'GIF' || 'PNG') {
        reader.onload = (e: any) => {
          this.imagePath = e.target.result;
          this.CF_1.tableRows.controls[i].imagePath = this.imagePath;
        };
      }
      console.log('fileExe', fileExe)
      this.file_type = fileExe

     // code to patch file type 
     this.documentForm.controls.tableRows.value[0].document_type =  this.file_type
     const fg = this.tableRows.at(i);     
     const fgValue = fg.value;
     fg.patchValue({
      document_type: this.file_type
     });    

      reader.readAsDataURL(this.imageToUpload);

    }
    this.addFiles(this.imageToUpload, i);
  };

  addFiles(filepath: any, i: any) {
    // ! create an array of selected file path
    let result: any = [];
    result.push({ path: filepath, index: i })

    if (result.length !== 0) {
      for (let j = 0; j < result.length; j++) {
        let index = this.FilePaths.findIndex((e: any) => e.index === result[j].index)
        if (index === -1) {
          this.FilePaths.push({ path: filepath, index: i })
        } else {
          this.FilePaths[index].path = filepath;
        };
      };
    };
    // 
  };

  getSingleDocument(id: any) {
    this.employService.getSingleDocument(id).subscribe((res: any) => {
      console.log(res,'ressssssss');
      
      this.singleDocumentData = res.data;
      let data: any = [];
      if (res.data.length != 0) {
        for (let i = 0; i <= res.data.length - 1; i++) {

          let fileExe = res.data[i].document_type;
          if (fileExe === "PDF") {
           res.data[i].fileImage = this.pdfFile;
          } else if (fileExe === 'XLSX') {
           res.data[i].fileImage = this.excelFile;
          } else if (fileExe === 'CSV') {
           res.data[i].fileImage = this.excelFile;
          } else if (fileExe === 'DOC') {
           res.data[i].fileImage = this.docFile;
          } else if (fileExe === 'DOCX') {
           res.data[i].fileImage = this.docFile;
          } else if (fileExe === 'DOTX') {
           res.data[i].fileImage = this.docFile;
          } else if (fileExe === 'JPEG' || 'JPG' || 'GIF' || 'PNG') {
             res.data[i].fileImage = res.data[i].document_file;
          }

          data.push({
            document_type: res.data[i].document_type,
            document_name: res.data[i].document_name,
            description: res.data[i].description,
            ExsitDocument_file: res.data[i].document_file,
            document_file: null,
            emp_document_id: res.data[i].emp_document_id,
            fileImage: res.data[i].fileImage
          })
        }
        this.CF_1.tableRows = this.patchData(data);
        
      }
    }, (err) => {
      
    })
  }

  patchData(e: any): FormArray {
    return new FormArray(
      e.map((x: any) => {
        const obj = new FormGroup({});
        Object.keys(x).forEach(k => {
          obj.addControl(k, new FormControl(x[k]));
        });
        return obj;
      })
    );
  }

  onSubmitForm() {
    let loginUserId = localStorage.getItem('EmpMainId')
    const data = {
      emp_id: this.employeId,
      status:'ACTIVE'
     }
     console.log(loginUserId);
   if (loginUserId) {
    this.recruitService.approvedCandidate(loginUserId, data).subscribe(
      (res: any) => {
        this.toastr.success("Submited successfully");
     this.route.navigate(['master/hrms/employee-master/employ']);
      }, (err) => {
        
       this.toast.error(err.error.message)
      }
    )
   }

     
  };

  initiateForm(): FormGroup {
    return this.fb.group({
      documentType: [''],
      documentName: [''],
      decriptionComment: [''],
      remark: [''],

    });
  };

  get getFormControls() {
    const control = this.documentForm.get('tableRows') as FormArray;
    return control;
  };

  get CF_1(): any { return this.documentForm.controls };

  addRow() {
    console.log('single--',this.singleDocumentData)

    // if (this.singleDocumentData && this.singleDocumentData.length !== 0) {
    //   this.toastr.warning('You are not able to add new Document Details');
    // } else if (this.singleDocumentData && this.singleDocumentData.length === 0) {
    //   const tableRows = this.documentForm.get('tableRows') as FormArray;
    //   this.CF_1.tableRows.push(
    //     new FormGroup({
    //       document_type: new FormControl(null, [Validators.required]),
    //       document_name: new FormControl(null, [Validators.required]),
    //       description: new FormControl(null, [Validators.required]),
    //       document_file: new FormControl(null, [Validators.required]),
    //     })
    //   )
    //   for (let i = 1; i < this.CF_1.tableRows.controls.length; i++) {
    //      this.CF_1.tableRows.controls[i + this.curentIndex].isSend = false;
    //      this.CF_1.tableRows.controls[i + this.curentIndex].showLoader = false;        
    //   };
    // }

    // new code 
    if (this.documentForm.controls?.tableRows?.value && this.documentForm.controls?.tableRows?.value.length > 0) {
      let canAddNewRow = true;

      for (const obj of this.documentForm.controls?.tableRows?.value) {
          if (!obj.document_file && !obj.ExsitDocument_file) {
              canAddNewRow = false;
              break;
          }
      }

      if (canAddNewRow) {
          // Logic to add a new row
          console.log("Adding a new row");
           const tableRows = this.documentForm.get('tableRows') as FormArray;
          this.CF_1.tableRows.push(
            new FormGroup({
              document_type: new FormControl(null, [Validators.required]),
              document_name: new FormControl(null, [Validators.required]),
              description: new FormControl(null, [Validators.required]),
              document_file: new FormControl(null, [Validators.required]),
            })
          )
          for (let i = 1; i < this.CF_1.tableRows.controls.length; i++) {
             this.CF_1.tableRows.controls[i + this.curentIndex].isSend = false;
             this.CF_1.tableRows.controls[i + this.curentIndex].showLoader = false;        
          };
          // ... Add new row logic here
      } else {
          // Show error because some existing rows have empty document files
          this.toastr.error('Please add document details first');
          // Display an error message for the user
      }
  } else {
      // Allow to add a new row since there are no existing rows
    //   console.log("Adding a new row");
    //   const tableRows = this.documentForm.get('tableRows') as FormArray;
    //  this.CF_1.tableRows.push(
    //    new FormGroup({
    //      document_type: new FormControl(null, [Validators.required]),
    //      document_name: new FormControl(null, [Validators.required]),
    //      description: new FormControl(null, [Validators.required]),
    //      document_file: new FormControl(null, [Validators.required]),
    //    })
    //  )
    //  for (let i = 1; i < this.CF_1.tableRows.controls.length; i++) {
    //     this.CF_1.tableRows.controls[i + this.curentIndex].isSend = false;
    //     this.CF_1.tableRows.controls[i + this.curentIndex].showLoader = false;        
    //  };
      // ... Add new row logic here
  }
   
    
      // console.log(obj);
   
      
    // }
    //  if(this.show == true){
    //   const tableRows = this.documentForm.get('tableRows') as FormArray;
    //     this.CF_1.tableRows.push(
    //       new FormGroup({
    //         document_type: new FormControl(null, [Validators.required]),
    //         document_name: new FormControl(null, [Validators.required]),
    //         description: new FormControl(null, [Validators.required]),
    //         document_file: new FormControl(null, [Validators.required]),
    //       })
    //     )
    //     for (let i = 1; i < this.CF_1.tableRows.controls.length; i++) {
    //        this.CF_1.tableRows.controls[i + this.curentIndex].isSend = false;
    //        this.CF_1.tableRows.controls[i + this.curentIndex].showLoader = false;        
    //     };
    // }
    // else if(this.show == false){
    //   this.toastr.error('You are not able to add new Document Details');
    // }

  };

  sendAndUpdate(i: any, control: any) {
    this.curentIndex = i;
    if (control.invalid) {
      this.toastr.error("required fields should not be empty", "Required fields");
      return
    }
    // ! check if not matched document file to document type------------------:(
    let doc: any = `${control.value.document_file}`.split('.');
    let doc_file = doc[doc.length - 1].toUpperCase();
    let doc_type = control.value.document_type.toUpperCase();

    let exist = this.acceptedFiles.findIndex((e: any) => e === doc_file);
    if (exist === -1) {
      this.toastr.error("selected file format not acceptable", "File not acceptable");
      return
    }

    if (doc_file !== doc_type) {
      this.toastr.error("selected file did not match to document type", "Not Match");
      return
    }

    // ! modify document_file control from file path------------------:(
    for (let j = 0; j < this.FilePaths.length; j++) {
      if (this.FilePaths[j].index === i) {
        control.value.document_file = this.FilePaths[j].path
      };
    };
    const val = control.value;

    const data: any = {
      document_type: val.document_type,
      document_name: val.document_name,
      description: val.description,
      employee_id: this.employeId
    }
    const file = val.document_file;
    this.CF_1.tableRows.controls[i].showLoader = true;
    this.doc_id = control.value.emp_document_id;
    console.log('this.doc_id', this.doc_id)
    if (this.singleDocumentData && this.singleDocumentData.length === 0 || (this.doc_id==null || undefined) ) {
      // !create documnet------------------:(
      this.employService.create_DocumentDetails(data, file).subscribe((res) => {
        
        this.CF_1.tableRows.controls[i].isSend = true;
        this.CF_1.tableRows.controls[i].showLoader = false;
        this.add_document = false;
        console.log('this.add_document create ********', this.add_document)

        this.toastr.success("Document Details Submitted successfully");
        control.disable();
      }, (err) => {
        this.toastr.error("Something went wrong please try again", "Error Message");
        
        this.CF_1.tableRows.controls[i].isSend = false;
        this.CF_1.tableRows.controls[i].showLoader = false;
        this.add_document = true;
      }
      );
    } else {
      // ! update documnet ------------------:(
      const doc_id = control.value.emp_document_id;
      this.employService.update_DocumentDetails(doc_id, data, file).subscribe((res) => {
        
        this.CF_1.tableRows.controls[i].isSend = true;
        this.CF_1.tableRows.controls[i].showLoader = false;      
        this.add_document = false;
        console.log('this.add_document create ********', this.add_document)

        this.toastr.success("Document Details Updated successfully");
        control.disable();
        // this.route.navigate(['/hrms/employee-master/employ']);
      }, (err) => {
        this.toastr.error("Something went wrong please try again", "Error Message");
        
        this.CF_1.tableRows.controls[i].isSend = false;
        this.CF_1.tableRows.controls[i].showLoader = false;
      }
      );
    }
  }

  deleteSingleDoc(i: any, control: any,) {
    console.log('i and control', i, control)
    this.doc_id = control.value.emp_document_id;
    console.log('this.doc_id', this.doc_id)
    if(this.doc_id ==null || undefined){
      if (this.CF_1.tableRows.length > 1) {
        this.CF_1.tableRows.removeAt(i);
      } else {
        this.toastr.error("Can't Deleted", "must be one")
      }
    }
    else{
      if (this.CF_1.tableRows.length > 1) {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#be0000',
          cancelButtonColor: '#8B817D',
          confirmButtonText: 'Delete'
        }).then((result) => {
          if (result.isConfirmed) {
            this.employService.deleteDocument(control.value.emp_document_id).subscribe(
              (res) => {
                
                this.CF_1.tableRows.removeAt(i);
                this.toastr.success('Item delete successful', 'Delete successfully ');
              },
              (err) => {
                
                this.toastr.error('Somthing wrong please try again..!', 'Error Message ');
              }
            )
          };
        })
      } else {
        this.toastr.error("Can't Deleted", "must be one")
      };

    }
    // if ((this.singleDocumentData && this.singleDocumentData.length !== 0)) {
    //    if (this.CF_1.tableRows.length > 1) {
    //     Swal.fire({
    //       title: 'Are you sure?',
    //       text: "You won't be able to revert this!",
    //       icon: 'question',
    //       showCancelButton: true,
    //       confirmButtonColor: '#be0000',
    //       cancelButtonColor: '#8B817D',
    //       confirmButtonText: 'Delete'
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         this.employService.deleteDocument(control.value.emp_document_id).subscribe(
    //           (res) => {
                
    //             this.CF_1.tableRows.removeAt(i);
    //             this.toastr.success('Item delete successful', 'Delete successfully ');
    //           },
    //           (err) => {
                
    //             this.toastr.error('Somthing wrong please try again..!', 'Error Message ');
    //           }
    //         )
    //       };
    //     })
    //   } else {
    //     this.toastr.error("Can't Deleted", "must be one")
    //   };
    // } else if (this.singleDocumentData && this.singleDocumentData.length === 0 || (this.doc_id == null || undefined)) {
    //   if (this.CF_1.tableRows.length > 1) {
    //     this.CF_1.tableRows.removeAt(i);
    //   } else {
    //     this.toastr.error("Can't Deleted", "must be one")
    //   }
    // };
  };

  seeDocuments(file:any,control:any){
    // 
    if(!control.controls.document_file.value){
      window.open(file, '_blank');
      // "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400"
    }else{
      this.toastr.warning('Selected file not uploaded');
    };
  };

  Skip() {
    this.route.navigate(['master/hrms/employee-master/employ']);
  };

}
