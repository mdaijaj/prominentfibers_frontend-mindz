// import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { SearchPipe } from 'src/app/@shared/pipe/search.pipe';
import { DMSService } from 'src/app/@shared/services/dms.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
// import { SearchPipe } from '@angular/common';

@Component({
  selector: 'app-document-library',
  templateUrl: './document-library.component.html',
  styleUrls: ['./document-library.component.scss']
})
export class DocumentLibraryComponent {
  // filteredString:any
  getData: any = [];
  nameSearch: any = ''
  file_length: any = [];
  rowData: any = [];
  photoEmp: any;
  constructor(private _dms: DMSService,
    private router: Router,
    // private search:SearchPipe
    private _empService: EmpRegistrationService,
  ) {

  }
  ngOnInit() {
    this.getAllData();
    this.employes()
  }

  getAllData() {
    this._dms.getList().subscribe((res: any) => {
      this.getData = res.result

      // for(var i=0;i<this.getData.length;i++){
      //   this.file_length.push(this.getData.employee_photo[i])
      //   


      // }

    });

  }
  gotoSeeDetails(id: any) {
    this.router.navigate(['master/hrms/DMS/dataManagement/docLibrary/seeDetails'],
      { queryParams: { id: id } });
  };


  employes() {
    this._empService.grtEmployeeList().subscribe((res: any) => {
      // 
      this.rowData = res.data;
    });
  }

  getProfilrPhoto(url:any){
      if (url.includes('profile_photo') && !url.endsWith('.pdf')) {
        return url;
      }else if(url.endsWith('.pdf')){
       return "assets/icons/pdfimg.png"
      } else 
       {
        return "assets//icons/icon_DQS/Folder.png";
      }
  }
}

