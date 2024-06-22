import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeadService } from 'src/app/@shared/services/lead.service';

@Component({
  selector: 'app-planning-audit-details',
  templateUrl: './planning-audit-details.component.html',
  styleUrls: ['./planning-audit-details.component.scss']
})
export class PlanningAuditDetailsComponent {
  @Input() data: any[];
  leftTitle:any[];
  panelOpenState = false
  lead_id: any;
  id: any;
  bodyData: any[] = [];
  singleLeadData: any;
  billing_site: any;
  priceData: any
  matchedData: any[] = [];
  constructor(
    private leadService: LeadService,
    private activeroute: ActivatedRoute
  ){
    let title:any = [];
    this.activeroute.queryParams.subscribe((params:any) => {
      this.id = params;
      this.lead_id = this.id.lead_id;
    });
    this.leadService.getByIdLead(this.lead_id).subscribe((res:any) => {
      this.singleLeadData = res.data;
      console.log(this.singleLeadData.billing_site_copy,"check");
      this.billing_site=this.singleLeadData.billing_site_copy
    }) 
  }


  ngOnInit() {
    this.getPriceTableData();
  }

  getPriceTableData() {
    this.leadService.getPriceTableData(this.lead_id).subscribe((res: any) => {
      this.priceData = res.data;

    
      for (const stage in this.priceData) {
        if (this.priceData.hasOwnProperty(stage)) {
          const stageData = this.priceData[stage];
  
          const stageDataArray = Array.isArray(stageData) ? stageData : [stageData];
  
          const lastObjectWithFees = stageDataArray.slice().reverse().find(
            (item: any) => item.hasOwnProperty('accessement_fee') && item.hasOwnProperty('accrediatitation_logo_fee')
          );
  
          if (lastObjectWithFees) {
            const accesementFee = lastObjectWithFees.accessement_fee;
            const accrediatitationLogoFee = lastObjectWithFees.accrediatitation_logo_fee;
  
            for (const item of stageDataArray) {
              if (item.hasOwnProperty('br_number')) {
                const matchedItem: any = {
                  br_number: item.br_number,
                  noOfMandays: item.noOfMandays,
                  stage: item.stage,
                  accesement_fee: accesementFee,
                  accrediatitation_logo_fee: accrediatitationLogoFee
                };
  
                this.matchedData.push(matchedItem);
              }
            }
          }
        }
      }

    });
  }
  isPriceDataNotEmpty(): boolean {
    return this.priceData && Object.keys(this.priceData).length > 0;
  }

  getLocations(matchedData: any[]): any[] {
    return [...new Set(matchedData.map(data => data.br_number))];
  }
  
  getStages(matchedData: any[]): string[] {
    // console.log( [...new Set(matchedData.map(data => data.stage))],"getstafges");
    return [...new Set(matchedData.map(data => data.stage))];
  }
  
  getStageData(matchedData: any[], brNumber: string | null, stage: string): any {
    return matchedData.find(data => data.br_number === brNumber && data.stage === stage);
  }
    

  getAssessmentFee(data: any[], stage: string): number {
    const stageData = data.find(item => item.stage === stage);
    return stageData ? stageData.accesement_fee : 0;
  }
  
  getAccreditationLogoFee(data: any[], stage: string): number {
    const stageData = data.find(item => item.stage === stage);
    return stageData ? stageData.accrediatitation_logo_fee : 0;
  }
  
  getYearForStage(stage: string): number {
    if (stage === 'S1' || stage === 'S2') {
      return 1;
    } else if (stage === 'CA1') {
      return 2;
    } else if (stage === 'CA2') {
      return 3;
    } else if (stage === 'TRA') {
      return 4;
    } else {
      return 0; // Handle other cases if needed
    }
  }
  
}
