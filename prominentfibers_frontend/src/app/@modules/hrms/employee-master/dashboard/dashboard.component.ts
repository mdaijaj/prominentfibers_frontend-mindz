import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('barChart') private barChartRef: any;
  @ViewChild('pieChart') private pieChartRef: any;
  public barChart: any;
  public pieChart:any;

  constructor() { }

  ngOnInit() {
  }
  
  ngAfterViewInit() {
    this.createBarChart();
    this.createPieChart()
  }

  // Chart start

  createPieChart(){
    const ctx = this.pieChartRef.nativeElement.getContext('2d');
    this.pieChart = new Chart(ctx, {
      type: 'line',
      data: {

        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September'
        ],
        datasets: [{
          label: 'Monthly Growth',
          data: [65, 59, 80, 81, 56, 55, 40,30,10],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
      
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category',
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
}

  createBarChart() {
    const ctx = this.barChartRef.nativeElement.getContext('2d');
    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {

        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
        datasets: [
          {
            label: "Sales",
            data: ['467', '576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]

      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category',
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  // Chart end

}
