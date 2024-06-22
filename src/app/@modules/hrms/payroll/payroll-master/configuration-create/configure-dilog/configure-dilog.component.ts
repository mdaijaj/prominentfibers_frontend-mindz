import { Component, ViewChild, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';

@Component({
  selector: 'app-configure-dilog',
  templateUrl: './configure-dilog.component.html',
  styleUrls: ['./configure-dilog.component.scss']
})
export class ConfigureDilogComponent {
filteredOptions: any[] = [];
nameSearch: any = '';
row:any[] =[];
configeItemlist: any=[];
  filterForm: FormGroup;
  field: any;
  name: any;
  isCheck: number;
constructor(private route: Router, private fb: FormBuilder,
  private hrServies: HrServiceService,
  private toast: ToastrService,public dialog: MatDialogRef<ConfigureDilogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any){
    this.filterForm = this.fb.group({
     filter: new FormControl('')
    })
  }

  ngOnInit(){
    this.getAddList(); 
    // 
    for(let i=0; i<this.data.length; i++){
    this.name = this.data[i].component;
    
    
    }
    setTimeout(() => {
      this.isCheck = this.configeItemlist.findIndex((item:any)=> item.name === this.name)   
      
    }, 100);
    
    
  }

getAddList(){
  this.hrServies.getAddList().subscribe((res: any) => {
    this.configeItemlist = res.data;
    
  });
}

applyFilter(filterValue: any) {
  this.configeItemlist.filter = filterValue.trim().toLocaleLowerCase();
}

addFormRowField(e:any, component:any, type:any){
  
  if (e.target.checked === true){
    this.field = {component:component,Type:type, isChecked:e.target.checked};
    this.row.push(this.field);
  }
  if (e.target.checked === false) {
    let index = this.row.findIndex(item => item.component === component)
    
    this.row.splice(index, 1)
  }
}

onSubmit(){
  for(let i=0; i < this.row.length; i++){}
  
  this.dialog.close(this.row)
}
}


