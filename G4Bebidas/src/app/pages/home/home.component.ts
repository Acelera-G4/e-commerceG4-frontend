import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { AuthService } from 'src/app/services/isLoggedIn.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  display: boolean = false;

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private toast: ToastService,
    private auth: AuthService
  ) {}

  showDialog() {
    this.display = true;
  }
  closeDialog() {
    this.display = false;
  }

  ngOnInit(): void {
    localStorage.getItem('log') != (null || 'false')
      ? this.router.navigate(['/home'])
      : this.router.navigate(['/']);
    this.showDialog();
  }
}
