import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { ProductionService } from 'src/app/@shared/services/production/production.service';
import { environment } from 'src/app/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-production',
  templateUrl: './add-new-production.component.html',
  styleUrls: ['./add-new-production.component.scss']
})
export class AddNewProductionComponent implements OnInit {
addProductionForm:FormGroup
imageToUpload:any;
imagePath: any;
singleItem: any;
id: any;
getAllProductData:any;
production_id:any;
selectedPlantList:any[]=[];
getAllSelectedShifts:any[]=[];
getAllSelectedWorkStation:any[]=[];
view:any;

selectedPlantsFormsArray: FormArray;
// uploaded_image:any
constructor(private location:Location,
  private _configurationalMasterService:ConfigurationalmasterService,
  private _fb:FormBuilder,
   private _empService: EmpRegistrationService,
  private _productionService:ProductionService,
  private toaster:ToastrService,
  private route:Router,
  private activeRouter:ActivatedRoute
  ){
this.addProductionForm=_fb.group({
  product_id:new FormControl('',Validators.required),
  total_qty:new FormControl(''),
  product_code:new FormControl(''),
  image_upload:new FormControl(''),
  product_variant:new FormControl('',Validators.required),
  product_description:new FormControl(''),
  country:new FormControl(''),
  state:new FormControl(''),
  plant_name:new FormControl('' ),
  production_manager_id:new FormControl('',Validators.required),
  total_shift:new FormControl('',Validators.required),
  plant_address:new FormControl(''),
  production_qty:new FormControl('',Validators.required),
  start_date:new FormControl('',Validators.required),
  end_date:new FormControl('',Validators.required),
  shiftList : new FormArray([
    new FormGroup({
      shift_id: new FormControl(null, Validators.required),
      employee_id: new FormControl(null,Validators.required  ),
    }),
  ]),
  workstationList : new FormArray([
    new FormGroup({
      workstation_id: new FormControl(null,Validators.required ),
      workstation_type: new FormControl(null,  ),
    }),
  ]),
  plantList: this._fb.array([]),
})
}

get plantList(): FormArray {
  return this.addProductionForm.get('plantList') as FormArray;
}

 



plantId:any
ngOnInit(): void {
this.addProductionForm.get('total_qty')?.disable()


 this.activeRouter.queryParams.subscribe((res:any)=>{
  this.production_id=res.production_id;
  this.view=res.view;
 })
 if(this.production_id || this.view=='view'){
  this._productionService.getProductionById(this.production_id).subscribe((response:any)=>{
    this.selectedPlantList=response.data.plantList;
    this.getSelectedPlants= this.selectedPlantList;
    this.getAllSelectedShifts=response.data.shiftList;
    this.getAllSelectedWorkStation=response.data.workstationList;
    const modifyData=this.selectedPlantList.filter((res:any)=>{
      return this.plantId=res.id
     })
    console.log(modifyData,'modifyData');
    this.imageToUpload=`${environment.servralUrl}/${response.data.image_upload}`
    console.log( this.imageToUpload,' this.imageToUpload');
    
    this.getAllSelectedWorkStation.forEach((item: any, index: number) => {
      const formGroup = this.WorkStationFormArray.at(index) as FormGroup;
      
      if (formGroup) {
          setTimeout(() => {
          formGroup.patchValue({
            workstation_id:item.workstation_id,
            workstation_type:item.Workstation.type_of_workstation
          });
        },200 )
        } 
      else {
        this.WorkStationFormArray.push(
          this._fb.group({
            workstation_id:item.workstation_id,
            workstation_type:item.Workstation.type_of_workstation
          })
        );
      }
    });

   const selectedPlantIds = this.selectedPlantList.map((plant) => plant.plant_id);
   this.addProductionForm.patchValue({
     plantList: selectedPlantIds,
   });
    this.addProductionForm.patchValue({
    product_id:response.data.product_id,
    product_code:response.data.product_master.product_code,
    product_description:response.data.product_master.product_description,
    product_variant:response.data.product_variant,
    total_qty:response.data.total_qty,
    total_shift:response.data.total_shift,
    production_manager_id:response.data.production_manager_id ,
    start_date:response.data.start_date,
    end_date:response.data.end_date,
    
   })

console.log(this.addProductionForm);



   this.getAllSelectedShifts.forEach((item: any, index: number) => {
    const formGroup = this.itemsFormArray.at(index) as FormGroup;
    if (formGroup) {
        setTimeout(() => {
        formGroup.patchValue({
          shift_id: item.shift_id,
          employee_id: item.employee_id,
        });
      },200 )
     
      } 
    else {
      this.itemsFormArray.push(
        this._fb.group({
          shift_id: item.shift_id,
          employee_id: item.employee_id,
        })
      );
    }
  });
  })
 }
  this.getAllWorkStationMaster()
  this.getEmployeeData()
  this.getAllShiftMaster()
  this.getAllPlantMaster();
  this._configurationalMasterService.getProductMasterList().subscribe((res: any) => {
    this.getAllProductData = res.data
  }) 
}
getVariantList:any;
getVariantById(product_id:any)
{
  this._productionService.getVariantById(product_id).subscribe((res:any)=>{
    this.getVariantList=res.data;
  })
}

getVariant(data:any){
  this.addProductionForm.patchValue({
    product_description:data.product_description
  })
}



get WorkStationFormArray() {
  return this.addProductionForm.get('workstationList') as FormArray;
}
addWorkStation() { 
  let data= this._fb.group({
    workstation_id: new FormControl(null,Validators.required),
    workstation_type: new FormControl(null,  ),
  });
  this.WorkStationFormArray.push(data); 
}
removeWorkStation(index: number): void {
  this.WorkStationFormArray.removeAt(index); 
}
get itemsFormArray() {
  return this.addProductionForm.get('shiftList') as FormArray;
}
addItem() { 
  let data= this._fb.group({
    shift_id: new FormControl(null, ),
    employee_id: new FormControl(null,  ),
    plantId: new FormControl(2),
  });
  this.itemsFormArray.push(data); 
}

removeItem(index: number): void {
  this.itemsFormArray.removeAt(index); 
}



goBack(){
  this.location.back();
}


 
  
 
getProductVal(event:any){
this.getVariantById(event.value)
  this.getAllProductData.filter((res:any)=>{
    if(res.id==event.value){
         this.addProductionForm.patchValue({
          product_code:res.product_code,
          product_variant:res.variant_name,
          product_description:res.product_description
         })
    }
  })
}
// getAllShiftData

shiftData:any[]=[];
getAllShiftMaster() {
  this._configurationalMasterService.getShiftList().subscribe((res: any) => {
    this.shiftData = res.data;
    this.shiftData.forEach((shift: any) => {
      shift.formattedShiftTime = this.formatShiftTime(shift.shift_from_time, shift.shift_to_time);
    });
  });
}
formatShiftTime(fromTime: string, toTime: string): string {
  const formattedFromTime = this.formatTime(fromTime);
  const formattedToTime = this.formatTime(toTime);
  return `${formattedFromTime} to ${formattedToTime}`;
}

formatTime(time: string): string {
  const [hours, minutes] = time.split(':');
  const formattedHours = parseInt(hours, 10) % 12 || 12;
  const period = parseInt(hours, 10) >= 12 ? 'pm' : 'am';
  return `${formattedHours}:${minutes} ${period}`;
}
// getAllWorkStationMaster
getAllWorkStation:any
getAllWorkStationMaster() {
  this._configurationalMasterService.getWorkStationMasterList().subscribe((res: any) => {
    this.getAllWorkStation = res.data;
  });
}
// get workstationControls() {
//   return (this.addProductionForm.get('workstationList') as FormArray).controls;
// }

getWorkStationValue(data:any,index:any){
   console.log(data,'data');
   const workstationControl = this.WorkStationFormArray.at(index)
   workstationControl.patchValue({
    workstation_type: data.type_of_workstation,  
  });
}
// getAllEmployeeList
getAllData:any;
getEmployeeData(){
  this._empService.grtEmployeeList().subscribe((res: any) => {
this.getAllData=res.data
    
  })
}

// getAllPlanList
getAllPlantsData:any[]=[];
getAllPlantMaster() {
  this._configurationalMasterService.getPlantMasterList().subscribe((res: any) => {
    this.getAllPlantsData = res.data;
  });
  
}
getSelectedPlants:any[]=[]
plantList_id:any
plantListArr:any[]=[];
initialSelectedVal:any;
data:any={}
getAllPlants(event:any)
{  

  console.log(event,'event');
    this.data ={
    plantId:event.id,
  }
this.plantList_id=event;
  const index = this.getSelectedPlants.findIndex(pl => pl.id === event.id);
  if (index !== -1) {
    this.getSelectedPlants.splice(index, 1);
    this.plantListArr.splice(index, 1)
  } else {
    this.getSelectedPlants.push(event);
    this.plantListArr.push(this.data)
    
  }
   
   if(this.getSelectedPlants.length!==0){
    this.initialSelectedVal=this.getSelectedPlants[0].id
        this.addProductionForm.patchValue({
          country:this.getSelectedPlants[0].countryss_name,
          state:this.getSelectedPlants[0].states_name,
          plant_name:this.getSelectedPlants[0].plant_name,
          plant_address:this.getSelectedPlants[0].plant_address,
        })
   }
}
plant_id:any
production_QTY:any
pushfinalData:any[]=[]
total_qty:any
getTabVal(event: MatTabChangeEvent){

  const selectedPlant = this.getSelectedPlants[event.index];
  // console.log(selectedPlant ,this.addProductionForm,'selectedPlant ');
  this.plant_id=selectedPlant.id;
  console.log(this.addProductionForm.value.shiftList,'shiftList');
 this.addProductionForm.value.shiftList.map((res:any)=>{
   return res.plantId=this.plant_id
})
this.addProductionForm.value.workstationList.map((res:any)=>{
   return res.plantId=this.plant_id
})
 

 let plantList={
  plantId:selectedPlant.id,
  production_qty:+this.addProductionForm.value.production_qty,
  start_date:moment(this.addProductionForm.value.start_date).format('YYYY-MM-DD'),
  end_date:moment(this.addProductionForm.value.end_date).format('YYYY-MM-DD'),
  total_shift:this.addProductionForm.value.total_shift,
  production_manager_id:this.addProductionForm.value.production_manager_id,
 }
 this.pushfinalData.push(plantList)
 
  this.addProductionForm.patchValue({
    country:selectedPlant.countryss_name,
    state:selectedPlant.states_name,
    plant_name:selectedPlant.plant_name,
    plant_address:selectedPlant. plant_address,
  
  })
 

   
}

// submitting form here
total_qty_plant:any
onSubmit(data:any)
{
  if(this.addProductionForm.invalid){
    // Object.keys(this.addProductionForm.controls).forEach(field => {
    //   const control = this.addProductionForm.get(field);
    //   if (control?.invalid) {
    //     // Handle invalid field here, for example, log to console
    //     console.log('Invalid field:', field);
    //   }
    // });
    this.toaster.error('Required fields are mendatory','Error Message')
    this.addProductionForm.markAllAsTouched()
    return
  }
  const uniqueObjects = this.pushfinalData.filter((value, index, self) => 
  self.findIndex(obj => obj.plantId === value.plantId) === index
);

const totalProductionQty = uniqueObjects.reduce((sum, item) => sum + item.production_qty, 0);
  const formData = new FormData();
  formData.append('product_id',data.product_id);
  formData.append('product_variant',data.product_variant);
  formData.append('total_qty',totalProductionQty);
  formData.append('image_upload',this.imageToUpload);
  formData.append('shiftList',JSON.stringify(this.addProductionForm.value.shiftList));
  formData.append('plantList',JSON.stringify(uniqueObjects));
  formData.append('workstationList',JSON.stringify(this.addProductionForm.value.workstationList));
   
if(this.production_id){
  Swal.fire({
    title: 'Do You Want to schedule production',
    icon: 'warning',
    showCancelButton: true,
    cancelButtonColor: '#998673',
    confirmButtonColor: '#f44336',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
  }).then((result) => { 
    if (result.value) {
      this._productionService.updateProductionById(this.production_id,formData).subscribe((response:any)=>{
        if(response){
       this.toaster.success(response.message);
          this.route.navigate(['/master/production/add-production'])
        }
      },(err:any)=>{
        this.toaster.error(err.error.message)
      })
    } else if (result.dismiss === Swal.DismissReason.cancel) {
    }
  });
}
else{
  Swal.fire({
    title: 'Do You Want to schedule production',
    icon: 'warning',
    showCancelButton: true,
    cancelButtonColor: '#998673',
    confirmButtonColor: '#f44336',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
  }).then((result) => { 
    if (result.value) {
      this._productionService.appProductionData(formData).subscribe((response:any)=>{
        if(response){
       this.toaster.success(response.message);
          this.route.navigate(['/master/production/production-list'])
        }
      },(err:any)=>{
        this.toaster.error(err.error.message)
      })
    } else if (result.dismiss === Swal.DismissReason.cancel) {
    }
  });
  
}
}
 
getProductionData(data:any,plant:any){
  console.log(data.target.value,'data');
  this.total_qty=data;
  console.log(this.total_qty,plant,'production_qty');
  this.addProductionForm.patchValue({
    total_qty:+data.target.value
  })
}

seePreview(path: string, imagePath: any) {
  if (!this.imagePath) {
    if (path) {
      Swal.fire({
        imageUrl: environment.servralUrl+'/'+path,
        imageHeight: 250,
        imageAlt: 'Uploaded Document',
        confirmButtonColor: "#998673",
        confirmButtonText: 'Ok',
      })
    }
  } else {
    Swal.fire({
      imageUrl: imagePath,
      imageHeight: 250,
      imageAlt: 'Profile Image',
      confirmButtonColor: "#998673",
      confirmButtonText: 'Ok',
    })
  }
};
onChange(e: any) {
  if (e.target.files && e.target.files[0]) {
    const data: FileList = e.target.files;
    this.imageToUpload = data.item(0) || null;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePath = e.target.result;
    };
    reader.readAsDataURL(this.imageToUpload);
  }
 console.log(this.generateImageUrl(e)); 
}
generateImageUrl(uploadDoc: any): string {
  const servralUrl = environment.servralUrl;
  return `${servralUrl}/${uploadDoc}`;
}
getFileName(uploadDoc: any): string {
  const pathParts = uploadDoc.split('/');
  return pathParts[pathParts.length - 1];
}
getFileExtension(filename: string): string {
  const parts = filename.split('.');
  return parts[parts.length - 1];
}

}
