import {Component, Input, OnInit} from '@angular/core';
import {Dish} from '../../../../dtos/dish';
import {DishService} from '../../../../services/dish.service';
import {AlertService} from '../../../../services/alert.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-dish-delete',
    templateUrl: './dish-delete.component.html',
    standalone: true,
  imports: [],
    styleUrls: ['./dish-delete.component.scss']
})
export class DishDeleteComponent implements OnInit {
  @Input() dish: any;

  constructor(public dishService: DishService,
              public alertService: AlertService,
              public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  public onSubmitDelete(dish: Dish): void {
    this.dishService.deleteDish(dish.id).subscribe({
      next: () => {
        window.location.reload();
        this.activeModal.close();
      },
      error: (err) => {
        this.alertService.error(err);
      }

    });
  }
}
