import { Component, OnInit } from '@angular/core';
import {AlertService} from '../../../services/alert.service';
import {Bill} from '../../../dtos/bill';
import {BillService} from '../../../services/bill.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BillingAddComponent } from './billing-add/billing-add.component';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  error: boolean = false;
  errorMessage: string = '';

  constructor(private alertService: AlertService, private billService: BillService, private modalService: NgbModal) {
  }

  bills: Bill[];

  ngOnInit(): void {
    this.loadBills();
  }

  loadBills(): void {
    this.billService.getBills().subscribe(
      (bills: Bill[]) => {
        this.bills = bills;
        console.log(this.bills);
      },
      error => {
        this.alertService.error(error);
      }
    );
  }

  openAddBill() {
    const modalRef = this.modalService.open(BillingAddComponent);
    modalRef.result.then( () => {
      console.log('Bill successfully created.');
      this.loadBills();
    }, (reason) => {
      // on dismiss
    });
  }

  /**
   * get a pdf of bill
   * @param invoiceId of the invoice
   */
  getInvoicePDF(invoiceId: number) {
    this.billService.getInvoicePdf(invoiceId).subscribe(
      res => {
        const byteCharacters = atob(res.pdf);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {type: 'application/pdf'});
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL);
      },
      error => {
        this.defaultServiceErrorHandling(error);
      });
  }

  formatPrice(price: number) {
    return price.toFixed(2) + ' €';
  }

  /**
   * error handling
   * @param error the error message
   */
  private defaultServiceErrorHandling(error: any) {
    this.error = true;
    if (typeof error.error === 'object') {
      this.errorMessage = error.error.error;
    } else {
      this.errorMessage = error.error;
    }
  }
}
