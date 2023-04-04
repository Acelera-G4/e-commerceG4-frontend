import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/isLoggedIn.service';
import { CategoriesComponent } from '../categories/categories.component';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  displaySidebar = false;
  displaySidebarDashboard = false;
  isDashboard = false;
  isLogin = false;
  isSignUp = false;
  isHome = false;
  isFormAddress = false;
  name: string | null = localStorage.getItem('name');
  mainCategories: Category[] = [];
  error: any;
  constructor(
    private router: Router,
    private auth: AuthService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (
        this.router.url === '/' ||
        this.router.url === '/login' ||
        this.router.url === '/sign-up' ||
        this.router.url.startsWith('/form-address')
      ) {
        this.isLogin = true;
        this.isSignUp = true;
        this.isFormAddress = true;
      } else {
        this.isLogin = false;
        this.isSignUp = false;
        this.isFormAddress = false;
      }

      if (
        this.router.url === '/dashboard' ||
        this.router.url === '/category' ||
        this.router.url === '/list-users' ||
        this.router.url === '/users' ||
        this.router.url === '/product'
      ) {
        this.isDashboard = true;
        this.isHome = true;
      } else {
        this.isDashboard = false;
        this.isHome = false;
      }
    });
    this.getMainCategories();
  }

  getMainCategories() {
    this.categoryService.getMainCategories().subscribe({
      next: (response) => {
        this.mainCategories = response;
        console.log('CHEGUEI NAS CATEGORIAS', this.mainCategories);
      },
      error: (error) => (this.error = error),
    });
  }

  logout() {
    console.log('saindo');
    this.displaySidebar = false;
    this.auth.logout();
  }
}
