import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { DMSRoutingModule } from './data-management-system/dms-routing.module';
import { DmsComponent } from './dms.component';
import { DataManagementSystemComponent } from './data-management-system/data-management-system.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { MatNativeDateModule } from '@angular/material/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { InternalAnnouncementModule } from '../employee-master/internal-announcement/internal-announcement.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ComplaintModule } from '../employee-master/complaint/complaint.module';
import { TimesheetModule } from '../employee-master/timesheet/timesheet.module';
import { DMSDialogComponent } from './data-management-system/dms-dialog/dms-dialog.component';
import { ActionComponent } from './data-management-system/action/action.component';
import { DocumentLibraryComponent } from './data-management-system/document-library/document-library.component';
import { EmpSeeDetailsComponent } from './data-management-system/emp-see-details/emp-see-details.component';
import { EmpCreateFolderComponent } from './data-management-system/emp-create-folder/emp-create-folder.component';
import { ListPrintPipe } from 'src/app/@shared/pipe/list-print.pipe';
import { EditFolderComponent } from './data-management-system/edit-folder/edit-folder.component';
import { ToastrModule } from 'ngx-toastr';
import { DMSRoutingModule } from './dms-routing.module';
import { DMSService } from 'src/app/@shared/services/dms.service';
import { SearchPipe } from 'src/app/@shared/pipe/search.pipe';
import { FilterPipe } from 'src/app/@shared/pipe/filter.pipe';
import { PreviewComponent } from './data-management-system/emp-see-details/preview/preview.component';


@NgModule({
  declarations: [
    DmsComponent,
    DataManagementSystemComponent,
    DMSDialogComponent,
    ActionComponent,
    DocumentLibraryComponent,
    EmpSeeDetailsComponent,
    EmpCreateFolderComponent,
    EditFolderComponent,
    SearchPipe,
    PreviewComponent,
    // FilterPipe,
    // ListPrintPipe
  ],
  imports: [
    CommonModule,
    DMSRoutingModule,
    MaterialModule,
    AgGridModule,
    MatNativeDateModule,
    MatDialogModule,
    InternalAnnouncementModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ComplaintModule,
    TimesheetModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule,
    // NgModule
    // listPrint

  ],
  providers:[DMSService]
  
})
export class DMSModule { }
