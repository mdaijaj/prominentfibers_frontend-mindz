import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';

@Component({
  selector: 'app-statemasterdialog',
  templateUrl: './statemasterdialog.component.html',
  styleUrls: ['./statemasterdialog.component.scss']
})
export class StatemasterdialogComponent {
  state_id: any;
  countryss_id:any;
  singleStateData: any;
  singleCountryData: any;
  constructor(
    private dialog: MatDialogRef<StatemasterdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _configurationalmasterService: ConfigurationalmasterService,
  ) {
    this.state_id = Number(data.id);
    this.countryss_id= Number(data.id)
  }
  ngOnInit() {
  this.getByIdState();
  this.getByIdCountry();
  }

  getByIdState() {
    this._configurationalmasterService.getByIdState(this.state_id).subscribe((res: any) => {
      this.singleStateData = res.data;
      
    })
  }
  getByIdCountry() {
    this._configurationalmasterService.getByIdCountry(this.countryss_id).subscribe((res: any) => {
      this.singleCountryData = res.data;
      
    })
  }
}
