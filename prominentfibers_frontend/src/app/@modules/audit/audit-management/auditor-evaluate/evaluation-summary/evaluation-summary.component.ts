import { Component } from '@angular/core';

@Component({
  selector: 'app-evaluation-summary',
  templateUrl: './evaluation-summary.component.html',
  styleUrls: ['./evaluation-summary.component.scss']
})
export class EvaluationSummaryComponent {
  RequiredData: { month: string; percentage: string; Status: string; }[];

  // longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  // from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  // originally bred for hunting.`;

  constructor(){

    this.RequiredData=[
      {
        "month": "January 2023",
        "percentage": '90%',
        "Status":'very-good' 
      },
      {
        "month": "February 2023",
        "percentage": '70%',
        "Status":'good' 
      },
        {
        "month": "March 2023",
        "percentage": '40%',
        "Status":'bad' 
      },
      ];
  }

  


}
