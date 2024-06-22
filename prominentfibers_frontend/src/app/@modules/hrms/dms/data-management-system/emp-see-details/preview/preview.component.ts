import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent {
  name = 'Angular';
  fileUrl = "";
  sourceName = "Google preview of Power point(.ppt)";
  url: any;
  type:any;
  constructor(
    private sanitise: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.url = data.path
    this.type=data.typeFile
    
    

    this. openFilePreview (this.url,this.type);
  //   for(var i=1;i<this.url.employee_photo.length;i++){
  //   this.openFilePreview (this.url.employee_photo[i],this.url.file_category[i])
  // }
  }
 
  openFilePreview (url:any,type:any) {
    // var parts = url.split("/"); 
    // var lastSlash = parts.slice(-1).join('');
    // 
    
    if(type=='.docx'){
    switch(type){
      // case 'gppt' :
      // this.fileUrl = "https://docs.google.com/gview?url=https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pptx&embedded=true";
      // this.sourceName = "Google preview of Power point(.ppt)";
      // break;
      // case 'oppt' :
      // this.fileUrl = "https://view.officeapps.live.com/op/embed.aspx?src=https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pptx";
      // this.sourceName = "MS Office preview of Power point(.ppt)";
      // break;
        // case '.docx' :
        // this.fileUrl = 'https://dqsdevapi.elitetraveltech.in/documents/employee_photo-1674756885639.docx';
        // this.sourceName = "Google preview of Document(.doc)";
      // break;
      case '.docx' :
      this.fileUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${url}`;
      this.sourceName = "MS Office preview of Document(.doc)";
  // window.open(this.fileUrl, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=300,left=300,width=800,height=800");

      break;
      // case 'gxlsx' :
      // this.fileUrl = "https://docs.google.com/gview?url=https://pgcconline.blackboard.com/webapps/dur-browserCheck-bb_bb60/samples/sample.xlsx&embedded=true";
      // this.sourceName = "Google preview of Excel(.xls)";
      // break;
      // case 'oxlsx' :
      // this.fileUrl = "https://view.officeapps.live.com/op/embed.aspx?src=https://pgcconline.blackboard.com/webapps/dur-browserCheck-bb_bb60/samples/sample.xlsx";
      // this.sourceName = "MS Office preview of Excel(.xls)";
      // break;
      // default : 
      // this.fileUrl = "https://docs.google.com/gview?url=https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pptx&embedded=true";
      // this.sourceName = "Google preview of Power point(.ppt)";
    }
  }
  else
  this.fileUrl=url;

  // window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=300,left=300,width=800,height=800");

}
cleanUrl(url:any){
  return this.sanitise.bypassSecurityTrustResourceUrl(url);
}

}
