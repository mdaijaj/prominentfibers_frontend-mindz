// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { DmsComponent } from '../dms.component';
// import { DataManagementSystemComponent } from './data-management-system.component';
// import { DocumentLibraryComponent } from './document-library/document-library.component';
// import { EmpCreateFolderComponent } from './emp-create-folder/emp-create-folder.component';
// import { EmpSeeDetailsComponent } from './emp-see-details/emp-see-details.component';

// const routes: Routes = [
//   {path:'dataManagement/docLibrary/seeDetails/:id',component:DocumentLibraryComponent},

//   { path: '', component: DmsComponent },
//   {
//     path: 'dataManagement',
//     children: [
//       { path: '', component: DataManagementSystemComponent },

//       {
//         path: 'docLibrary',
//         children: [
//           { path: '', component: DocumentLibraryComponent },
//           { path: 'seeDetails', component: EmpSeeDetailsComponent },
//           { path: 'createFolder',
//         children:[
//           { path: '', component: EmpCreateFolderComponent },
//           { path: 'seeDetails', component: EmpSeeDetailsComponent },

//           // { path: 'docLibrary', component: DocumentLibraryComponent },

//         ]
//         },

//         ]
//       },
//     ]
//   },
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class DMSRoutingModule { }
