import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/isLoggedIn.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  data: any;

  constructor(private router: Router, private auth: AuthService) {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    };
  }
  ngOnInit(): void {
    localStorage.getItem('log') == 'false'
      ? console.log('é falsoooo')
      : console.log('é verdade');
    localStorage.getItem('log') != (null || 'false')
      ? this.router.navigate(['/dashboard'])
      : this.router.navigate(['/']);
  }

  update(event: Event) {
    this.data = {
      labels: [
        'Geladeira',
        'Fogão',
        'Máquina de lavar',
        'TV',
        'Rádio',
        'Fone',
        'Mesa',
      ],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    };
  }
}
