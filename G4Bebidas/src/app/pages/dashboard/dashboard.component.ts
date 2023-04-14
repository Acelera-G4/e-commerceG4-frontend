import { UserService } from 'src/app/services/users.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  data: any;
  listUsers: User[];

  constructor(
    private router: Router,
    private userService: UserService,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.userService.listAllUsers().subscribe((users) => {
      const userCount = users.length;

      this.productService.getProducts().subscribe((products) => {
        const productCount = products.length;

        this.categoryService.getCategories().subscribe((categories) => {
          const categoriesCount = categories.length;
          this.data = {
            labels: ['Users', 'Products', 'Categories'],
            datasets: [
              {
                label: 'First Dataset',
                data: [userCount, productCount, categoriesCount],
              },
            ],
          };
        });
      });
    });
  }
  ngOnInit(): void {
    localStorage.getItem('log') != (null || 'false')
      ? this.router.navigate(['/dashboard'])
      : this.router.navigate(['/']);
  }

  // update(event: Event) {
  //   this.data = {
  //     labels: [
  //       'Geladeira',
  //       'Fogão',
  //       'Máquina de lavar',
  //       'TV',
  //       'Rádio',
  //       'Fone',
  //       'Mesa',
  //     ],
  //     datasets: [
  //       {
  //         label: 'First Dataset',
  //         data: [65, 59, 80, 81, 56, 55, 40],
  //       },
  //       {
  //         label: 'Second Dataset',
  //         data: [28, 48, 40, 19, 86, 27, 90],
  //       },
  //     ],
  //   };
  // }
}
