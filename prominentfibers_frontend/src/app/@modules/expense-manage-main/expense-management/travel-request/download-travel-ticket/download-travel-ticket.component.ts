import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItticketingService } from 'src/app/@shared/services/itticketing.service';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { ExportService } from 'src/app/@shared/services/export/export.service';
declare var require: any;
const FileSaver = require('file-saver');
@Component({
  selector: 'app-download-travel-ticket',
  templateUrl: './download-travel-ticket.component.html',
  styleUrls: ['./download-travel-ticket.component.scss']
})
export class DownloadTravelTicketComponent {
  expenseData:any;
  leadId: any;
  rowDataConfirm: any;
  value: any;
  downloadLink: any;
  empId: any;
  attachTicket: any;

  constructor(private activeroute: ActivatedRoute,  private downloadService: ExportService, private _iticketService:ItticketingService,private route: Router,private leadService:LeadService){

  }
  ngOnInit() {
   this.activeroute.queryParams.subscribe((params:any) => {
  
  this.leadId=params.lead_id;
  
  
});
   this.getByBookTicket();
   this.getByTicketConfirm();
  //  this.getGstFile();
  }
 

  getByBookTicket(){
    this._iticketService.getBybookTravelTicket(this.leadId).subscribe((res:any)=>{
      this.expenseData=res.data;
      
      
    })
  }
  pdfGenerate() {
    const dashboard = document.getElementById('dashboard');

    const dashboardHeight = dashboard!.clientHeight;
    const dashboardWidth = dashboard!.clientWidth;
    const options = { background: 'white', width: dashboardWidth, height: dashboardHeight };

    domtoimage.toPng(dashboard!, options).then((imgData) => {
      const doc = new jsPDF(dashboardWidth > dashboardHeight ? 'l' : 'p', 'mm', [dashboardWidth, dashboardHeight]);
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      window.open(URL.createObjectURL(doc.output("blob")));
    });
  }
  cancel(){
    this.route.navigate(['/master/expense-main/expense-managment/travel-request']);

  }
  getByTicketConfirm(){

  
    // this.leadService.ticketId.subscribe((idExpense:any)=>{
    //   
    //   this.tiketId=idExpense;
    //   
      
    //   // if( this.tiketId){
    //   // this.addContact=true;
    //   // //  this.getByTicketList()
  
    //   // }
    //   })
      
    this.empId=localStorage.getItem('EmpMainId')
    
    this.leadService.getTravelTicketConfirmcopy(this.empId, this.leadId).subscribe((res:any)=>{
      this.rowDataConfirm=res.result;
      
        //  this.value= res.data.attach_ticket;
         
//          for(let item of res.data){
// 
// this.downloadLink=item;
// 


//          }
      })
     }

    //  downloadPdf(e: any) {
    //   
    //   const pdfUrl =this.downloadLink?.attach_ticket ;
    //   const pdfName = this.downloadLink?.attach_ticket;
    //   
    //   
      
    //   FileSaver.saveAs(pdfUrl, pdfName);
      
    //   e.stopPropagation();
    // }

    
    filesArray: any[] = [
      // {
      //   filePath:
      //     'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
      // },
      // {
      //   filePath:
      //     'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
      // },
  
      {
        attach_ticket:
          'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
      },
    ];
    // getGstFile(){
    //   this._iticketService.getGstFileDownload(this.empId,this.leadId).subscribe((res:any)=>{
    //     this.filesArray=res;
    //     
        
    //   })
    // }
    downloadFile() {
      this.downloadService.createZip(
        this.filesArray?.map((c:any) =>
    
        
        c.attach_ticket),
        'DQS_Project_Folder'
      );
    }
}
