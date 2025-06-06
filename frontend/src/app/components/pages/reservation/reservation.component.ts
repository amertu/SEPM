import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { Reservation } from 'src/app/dtos/reservation';
import {AlertService} from '../../../services/alert.service';
import {ReservationEditComponent} from './reservation-edit/reservation-edit.component';
import {ReservationDetailsComponent} from './reservation-details/reservation-details.component';
import {ReservationAddComponent} from './reservation-add/reservation-add.component';
import {ReservationDeleteComponent} from './reservation-delete/reservation-delete.component';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation.component.html',
  standalone: true,
  imports: [
    ReservationEditComponent,
    ReservationDetailsComponent,
    ReservationAddComponent,
    ReservationDeleteComponent,
    NgIf,
    NgForOf,
  ],
  styleUrls: ['./reservation.component.scss']
})

export class ReservationComponent implements OnInit {
  reservations: Reservation[];
  selectedReservation: Reservation;

  constructor(private reservationService: ReservationService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.loadAllReservations();
  }

  public loadAllReservations() {
    this.reservationService.getAllReservations().subscribe(
      (reservations: Reservation[]) => {
        this.reservations = reservations;
      },
      error => {
        this.alertService.error(error);
      }
    );
  }

  public formatDate(date: string): string {
    return date.replace('T', ' ').substring(0, date.length - 3);
  }

  selectReservation(reservation: Reservation) {
    this.selectedReservation = reservation;
  }
}
