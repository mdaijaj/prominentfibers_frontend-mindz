import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent {
  form: FormGroup;
  data=[
    {name: 'vrajesh', quantity: '30'},
    {name: 'singh', quantity: '50'},
    {name: 'Raj', quantity: '54'},
    {name: 'sita', quantity: '9999'},
    {name: 'sami', quantity: '77'},
    {name: 'ruhi', quantity: '55'},
    {name: 'rajeev', quantity: '44'},
  ]
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {items: this.fb.array([])});
  }
  get items12(): FormArray {
    return this.form.get('items') as FormArray;
  }
  addItem(): void {
    const itemFormGroup = this.fb.group({
      name: [''],
      quantity: ['']
    });
    this.items12.push(itemFormGroup);
  }
  submit(){  
    console.log(this.form);
    
  }
  removeItem(index: number): void {
    this.items12.removeAt(index);
  }
  patchValue(){
  for (let a=0;a<this.data.length;a++) {
    this.items12.push(
      this.fb.group({
        name: this.data[a].name,
        quantity: this.data[a].quantity
      })
    );
}
}
}

  // Additional methods for adding and removing items
