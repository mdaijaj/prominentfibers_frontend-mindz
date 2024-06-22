import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationalmasterComponent } from './configurationalmaster.component';
// import { JobTypeComponent } from './job-type/job-type.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationalmasterComponent,children:[
      {
        path: 'config-master',
        loadChildren: () =>
          import('./countrymaster/countrymaster.module').then(
            (m) => m.CountrymasterModule
          ),
      },
      {
        path: 'state-master',
        loadChildren: () =>
          import('./statemaster/statemaster.module').then(
            (m) => m.StatemasterModule
          ),
      },
    
      {
        path: 'department',
        loadChildren: () =>
          import('./department/department.module').then((m) => m.DepartmentModule),
      },
      {
        path: 'designation',
        loadChildren: () =>
          import('./designation/designation.module').then(
            (m) => m.DesignationModule
          ),
      },
    
      {
        path: 'grade',
        loadChildren: () =>
          import('./grade/grade.module').then((m) => m.GradeModule),
      },
      {
        path: 'branch',
        loadChildren: () =>
          import('./branch/branch.module').then((m) => m.BranchModule),
      },
    
      {
        path: 'leave-type',
        loadChildren: () =>
          import('./leavetype/leavetype.module').then((m) => m.LeavetypeModule),
      },
      {
        path: 'marital-status',
        loadChildren: () =>
          import('./maritalstatus/maritalstatus.module').then(
            (m) => m.MaritalstatusModule
          ),
      },
      {
        path: 'employment-type',
        loadChildren: () =>
          import('./employement-type/employement-type.module').then(
            (m) => m.EmployementTypeModule
          ),
      },
      {
        path: 'industry-sector-master',
        loadChildren: () =>
          import('./industry-sector-master/industry-sector-master.module').then(
            (m) => m.IndustrySectorMasterModule
          ),
      },
      // {
      //   path: 'auditor-master',
      //   loadChildren: () =>
          // import('./auditor-master/auditor-master.module').then(
      //       (m) => m.AuditorMasterModule
      //     ),
      // },
      {
        path: 'quotationcurrency',
        loadChildren: () =>
          import('./quotation-currency/quotation-currency.module').then(
            (m) => m.QuotationCurrencyModule
          ),
      },
    
      {
        path: 'vendor-type',
        loadChildren: () =>
          import('./vendor-type/vendor-type.module').then(
            (m) => m.VendorTypeModule
          ),
      },
      {
        path: 'customer-type',
        loadChildren: () =>
          import('./customer-type/customer-type.module').then(
            (m) => m.CustomerTypeModule
          ),
      },
      {
        path: 'training-name',
        loadChildren: () =>
          import('./training-name/training-name.module').then(
            (m) => m.TrainingNameModule
          ),
      },
      {
        path: 'level-slab',
        loadChildren: () =>
          import('./level-slab/level-slab.module').then((m) => m.LevelSlabModule),
      },
      {
        path: 'pricemapping-product',
        loadChildren: () =>
          import('./pricemapping/pricemapping.module').then(
            (m) => m.PricemappingModule
          ),
      },
      {
        path: 'pricing-level',
        loadChildren: () =>
          import('./pricing-level/pricing-level.module').then(
            (m) => m.PricingLevelModule
          ),
      },
      // {
      //   path: 'price-master',
      //   loadChildren: () =>
      //     import('./pricemapping/pricemapping.module').then(
      //       (m) => m.PricemappingModule
      //     ),
      // },
      // {
      //   path: 'product-master',
      //   loadChildren: () =>
      //     import('./product-master/product-master.module').then(
      //       (m) => m.ProductMasterModule
      //     ),
      // },
    
      {
        path: 'asset-category',
        loadChildren: () =>
          import('./asset-category/asset-category.module').then(
            (m) => m.AssetCategoryModule
          ),
      },
    
      {
        path: 'pr-item',
        loadChildren: () =>
          import('./pr-item/pr-item.module').then((m) => m.PrItemModule),
      },
      {
        path: 'currency-master',
        loadChildren: () =>
          import('./currency-master/currency-master.module').then(
            (m) => m.CurrencyMasterModule
          ),
      },
      {
        path: 'expense-category',
        loadChildren: () =>
          import('./expense-category/expense-category.module').then(
            (m) => m.ExpenseCategoryModule
          ),
      },
      {
        path: 'unit-master',
        loadChildren: () =>
          import('./unit-master/unit-master.module').then(
            (m) => m.UnitMasterModule
          ),
      },
    
      {
        path: 'courier-service-name',
        loadChildren: () =>
          import('./courier-service-name/courier-service-name.module').then(
            (m) => m.CourierServiceNameModule
          ),
      },
    
      {
        path: 'courier-contains',
        loadChildren: () =>
          import('./courier-contain/courier-contain.module').then(
            (m) => m.CourierContainModule
          ),
      },
    
      {
        path: 'product-asset-master',
        loadChildren: () =>
          import('./product-asset-master/product-asset-master.module').then(
            (m) => m.ProductAssetMasterModule
          ),
      },
    
      {
        path: 'product-asset-create',
        loadChildren: () =>
          import('./product-asset-create/product-asset-create.module').then(
            (m) => m.ProductAssetCreateModule
          ),
      },
      {
        path: 'new-price-master',
        loadChildren: () =>
          import('../configurationalmaster/new-price-master/new-price-master.module').then(
            (m) => m.NewPriceMasterModule
          ),
      },
    
      {
        path: 'language-master',
        loadChildren: () =>
          import('./language-master/language-master.module').then(
            (m) => m.LanguageMasterModule
          ),
      },
    
      {
        path:'amc-discription',
        loadChildren: () =>
          import('./amc-discription/amc-discription.module').then(
            (m) => m.AmcDiscriptionModule
          ),
      },
      {
        path:'employe-doc',
        loadChildren: () =>
          import('./employe-sign-doc/employe-sign-doc.module').then(
            (m) => m.EmployeSignDocModule
          ),
      },
       {
        path:'branch-setup',
        loadChildren: () =>
          import('./branch-setup/branch-setup.module').then(
            (m) => m.BranchSetupModule
          ),
      },
      {
        path:'my-expense-role',
        loadChildren: () =>
          import('./my-expense-role/my-expense-role.module').then(
            (m) => m.MyExpenseRoleModule
          ),
      },
      {
        path:'plant-master',
        loadChildren: () =>
          import('./plant-master/plant-master.module').then(
            (m) => m.PlantMasterModule
          ),
      },
    
      {
        path:'uom',
        loadChildren: () =>
          import('./uom/uom.module').then(
            (m) => m.UomModule
          ),
      },
    
      {
        path: 'service-category',
        loadChildren: () =>
          import('./service-category/service-category.module').then(
            (m) => m.ServiceCategoryModule
          ),
      },
    
      {
        path: 'service-master',
        loadChildren: () =>
          import('./service-master/service-master.module').then(
            (m) => m.ServiceMasterModule
          ),
      },
      {
        path: 'shift-master',
        loadChildren: () =>
          import('./shift-master/shift-master.module').then(
            (m) => m.ShiftMasterModule
          ),
      },
    
      {
        path: 'work-station',
        loadChildren: () =>
          import('./work-station/work-station.module').then(
            (m) => m.WorkStationModule
          ),
      },
      {
        path: 'product-master',
        loadChildren: () =>
          import('./product-master/product-master.module').then(
            (m) => m.ProductMasterModule
          ),
      },
      {
        path: 'workflow',
        loadChildren: () =>
          import('./work-flow/work-flow.module').then(
            (m) => m.WorkFlowModule
          ),
      },
      {
        path: 'quality-master',
        loadChildren: () =>
          import('./quality-master/quality-master.module').then(
            (m) => m.QualityMasterModule
          ),
      },
    ]
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationalmasterRoutingModule {}
