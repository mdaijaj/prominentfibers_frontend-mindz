import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pay-slip-dilog',
  templateUrl: './pay-slip-dilog.component.html',
  styleUrls: ['./pay-slip-dilog.component.scss']
})
export class PaySlipDilogComponent {
  EmpListData: any;
  id: any;
  doc: jsPDF;
  URL ="./pay-slip-dilog.component.html";

  constructor(public dialog: MatDialogRef<PaySlipDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private hrService: HrServiceService) {
    this.id = this.data.id;
    
  }

ngOnInit(){
  let payslip_Id = this.id;
  this.hrService.paySlipById(payslip_Id).subscribe((res: any) => {
    this.EmpListData = res.result;
    
  });

}

print() {
  window.print();
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas:any) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('pay-slip.pdf');
    });
  }

}