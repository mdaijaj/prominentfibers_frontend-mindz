import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataManagementSystemComponent } from './data-management-system/data-management-system.component';
import { DocumentLibraryComponent } from './data-management-system/document-library/document-library.component';
import { EditFolderComponent } from './data-management-system/edit-folder/edit-folder.component';
import { EmpCreateFolderComponent } from './data-management-system/emp-create-folder/emp-create-folder.component';
import { EmpSeeDetailsComponent } from './data-management-system/emp-see-details/emp-see-details.component';
import { DmsComponent } from './dms.component';

const routes: Routes = [
  {path:'dataManagement/docLibrary/seeDetails/:id',component:DocumentLibraryComponent},

  { path: '', component: DmsComponent },
  {
    path: 'dataManagement',
    children: [
      // { path: '', component: DataManagementSystemComponent },
      // {path:'editFolder',component:EditFolderComponent},
      { path: '', component: DocumentLibraryComponent },
      {
        path: 'docLibrary',
        children: [
       
          { path: 'seeDetails', component: EmpSeeDetailsComponent },
          { path: 'createFolder',
        children:[
          { path: '', component: EmpCreateFolderComponent },
          { path: 'seeDetails', component: EmpSeeDetailsComponent },

          // { path: 'docLibrary', component: DocumentLibraryComponent },

        ]
        },

        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DMSRoutingModule { }
