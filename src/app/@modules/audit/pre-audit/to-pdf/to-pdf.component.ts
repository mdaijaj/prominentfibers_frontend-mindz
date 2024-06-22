import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-to-pdf',
  templateUrl: './to-pdf.component.html',
  styleUrls: ['./to-pdf.component.scss']
})
export class TOPDFComponent {

  constructor(
    private toast: ToastrService,

  ){

  }

  pdfGenerate() {

    const dashboard = document.getElementById('dashboard');
    if (!dashboard) {
      console.error("Dashboard element not found");
      return;
    }
  
    const pdfWidth = dashboard.offsetWidth; 
    const pdfHeight = dashboard.offsetHeight; 
  
    const canvas = document.createElement('canvas');
    canvas.width = pdfWidth;
    canvas.height = pdfHeight;
  
    const context = canvas.getContext('2d');
    const capturePromise = html2canvas(dashboard, { canvas: canvas}, );
    
  
    capturePromise.then((canvas:any) => {
      
      const doc = new jsPDF(pdfWidth > pdfHeight ? 'landscape' : 'portrait', 'px', [pdfWidth, pdfHeight]);
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight,
      );
      doc.save(` Offer-Latter.pdf`);
      this.toast.info('Please Attach Offer Latter with Mail..')
    }).catch((error:any) => {
      console.error("Error capturing dashboard content: ", error);
    });
    // this.dialog.close();
  }

}
