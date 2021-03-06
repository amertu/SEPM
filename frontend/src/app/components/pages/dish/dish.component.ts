import { Component, OnInit, Input } from '@angular/core';
import {AlertService} from '../../../services/alert.service';
import {DishService} from '../../../services/dish.service';
import {Dish} from '../../../dtos/dish';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {
  dishes: Dish[];
  selectedDish: Dish;

  constructor(private dishService: DishService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.loadAllDishes();
  }

  public loadAllDishes() {
    console.log('loadAllDishes()');
    this.dishService.getAllDishes().subscribe(
      (dishes: Dish[]) => {
        this.dishes = dishes;
      },
      error => {
        console.log('Failed to load dishes.');
        this.alertService.error(error);
      }
    );
  }

  formatPrice(price: number) {
    return '' + Math.floor(price / 100) + ',' + (price % 100 + ' €').padStart(4, '0');
  }

  selectDish(dish: Dish) {
    this.selectedDish = dish;
  }
}
