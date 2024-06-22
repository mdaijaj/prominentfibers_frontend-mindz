import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItticketingService } from 'src/app/@shared/services/itticketing.service';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { ExportService } from 'src/app/@shared/services/export/export.service';
import { environment } from 'src/app/environments/environment';
declare var require: any;
const FileSaver = require('file-saver');
@Component({
  selector: 'app-download-travel-ticket',
  templateUrl: './download-travel-ticket.component.html',
  styleUrls: ['./download-travel-ticket.component.scss']
})
export class DownloadTravelTicketComponent {
  expenseData: any;
  leadId: any;
  rowDataConfirm: any;
  value: any;
  downloadLink: any;
  empId: any;
  databaseKey: any = environment.servralUrl;

  attachTicket: any;
  onbordingData: any;
  invoicePdfName: any;
  singleFile: string;
  downloadIconRemove: boolean = false;
  filterAttachTicket: any;
  filterAttachInvoice: any;
  filterOnBording: any;
  onbordingNo: boolean=false;
  attachTicketNo: boolean=false;
  attacInvoiceNo: boolean=false;
  constructor(private activeroute: ActivatedRoute, private downloadService: ExportService, private _iticketService: ItticketingService, private route: Router, private leadService: LeadService) {

  }
  ngOnInit() {
    this.activeroute.queryParams.subscribe((params: any) => {

      this.leadId = params.lead_id;


    });
    this.getByBookTicket();
    this.getByTicketConfirm();
    //  this.getGstFile();
    this.getOnBordingForm()
  }


  getByBookTicket() {
    this._iticketService.getBybookTravelTicket(this.leadId).subscribe((res: any) => {
      this.expenseData = res.data;
      console.log(this.expenseData, 'this.expenseData');


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
  cancel() {
    this.route.navigate(['/master/expense-main/travel-request/travel-request']);

  }
  getByTicketConfirm() {


    // this.leadService.ticketId.subscribe((idExpense:any)=>{
    //   
    //   this.tiketId=idExpense;
    //   

    //   // if( this.tiketId){
    //   // this.addContact=true;
    //   // //  this.getByTicketList()

    //   // }
    //   })

    this.empId = localStorage.getItem('EmpMainId')

    this.leadService.getTravelTicketConfirmcopy(this.empId, this.leadId).subscribe((res: any) => {
      this.rowDataConfirm = res.result;
      console.log(this.rowDataConfirm, ' this.rowDataConfirm');
      // let attachTicket=[]
      // let attachInvoice=[]
      

// console.log(this.filterAttachTicket,"filterAttachTicket");
// console.log(this.filterAttachInvoice,"filterAttachInvoice");



for(let a=0; a<=this.rowDataConfirm.length; a++){
if(this.rowDataConfirm[a]?.attach_ticket=="https://dqsapi.elitetraveltech.in/Null"){
  this.rowDataConfirm[a].attach_ticket=null
}
if(this.rowDataConfirm[a]?.attach_invoice=="https://dqsapi.elitetraveltech.in/Null"){
  this.rowDataConfirm[a].attach_invoice=null
}
}
// for(let a=0; a<=this.filterAttachInvoice.length; a++){
//   if(this.filterAttachInvoice[a].attach_invoice=="https://dqsapi.elitetraveltech.in/Null"){
//     this.filterAttachInvoice[a].attach_invoice=null
//   }
//   if(this.filterAttachInvoice[a].attach_ticket=="https://dqsapi.elitetraveltech.in/Null"){
//     this.filterAttachInvoice[a].attach_ticket=null
//   }
// }

console.log( this.rowDataConfirm,' this.rowDataConfirm>>>>>>>>>>pdf invoice');

    this.filterAttachTicket=this.rowDataConfirm.filter((res:any)=>res.attach_ticket)
      this.filterAttachInvoice=this.rowDataConfirm.filter((res:any)=>res.attach_invoice)

      for(let a=0;a<=this.filterAttachTicket.length; a++){
        if(this.filterAttachTicket.length==0){
      this.attachTicketNo=true
        }
      }

      for(let a=0;a<=this.filterAttachInvoice.length; a++){
        if(this.filterAttachInvoice.length==0){
      this.attacInvoiceNo=true
        }
      }

console.log(this.filterAttachTicket,"filterAttachTicket2");
console.log(this.filterAttachInvoice,"filterAttachInvoice2");
      // for (let i = 0; i <= this.rowDataConfirm.length; i++) {
      //   console.log(this.rowDataConfirm,"rodata");
        
      //   if(this.rowDataConfirm[i].attach_ticket=='null'){
      //     attachTicket.push(this.rowDataConfirm[i].attach_ticket)
      //   }
      //   if(this.rowDataConfirm[i].attach_invoice=='null'){
      //     attachInvoice.push(this.rowDataConfirm[i].attach_invoice)
      //   }

      // }
      // console.log(attachTicket,"ticket");
      // console.log(attachInvoice,"invoice");

      console.log(this.rowDataConfirm, 'this.rowDataConfirm');
      this.invoicePdfName = res.result.attach_invoice;
      console.log(this.invoicePdfName, 'this.invoicePdfName');

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
      this.filesArray?.map((c: any) =>


        c.attach_ticket),
      'DQS_Project_Folder'
    );
  }


  getOnBordingForm() {
    this._iticketService.getOnBordingFile(this.leadId).subscribe((res: any) => {

      this.onbordingData = res.data;
      console.log(this.onbordingData, 'this.onbordingData');
      this.filterOnBording=this.onbordingData.filter((res:any)=>res.upload_onbording)
console.log(this.filterOnBording,'this.filterOnBording');

for(let a=0;a<=this.filterOnBording.length; a++){
  if(this.filterOnBording.length==0){
this.onbordingNo=true
  }
}

    })
  }

  getDownloadPdf(url: any) {
    console.log(url, 'urlll');
    var parts = url.split("/");
    console.log(parts, 'parts');

    var lastSlash = parts.slice(-1).join('');
    console.log(lastSlash, 'lastSlash');
    this.singleFile = `${this.databaseKey}/download_Document_attach_invoice/${lastSlash}`

    // this._iticketService.getByDownloadPdf(this.invoicePdfName).subscribe((res:any)=>{
    // console.log(res,'ress');

    // })
  }

}
