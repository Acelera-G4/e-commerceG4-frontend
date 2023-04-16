import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  isDashboard = false;
  isHome = false;
  isFormAddres = false;
  mainCategories: Category[] = [];
  error: any;

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (
        this.router.url === '/' ||
        this.router.url === '/dashboard' ||
        this.router.url === '/category' ||
        this.router.url === '/users' ||
        this.router.url === '/product' ||
        this.router.url === '/login' ||
        this.router.url === '/sign-up' ||
        this.router.url === '/list-users' ||
        this.router.url.startsWith('/form-address')
      ) {
        this.isDashboard = true;
        this.isFormAddres = true;
      } else {
        this.isDashboard = false;
        this.isFormAddres = false;
      }
    });
    this.getMainCategories();
  }

  getMainCategories() {
    this.categoryService.getMainCategories().subscribe({
      next: (response) => {
        this.mainCategories = response;
      },
      error: (error) => (this.error = error),
    });
  }
}
