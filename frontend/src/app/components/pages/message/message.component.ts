import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MessageService} from '../../../services/message.service';
import {Message} from '../../../dtos/message';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {AlertService} from '../../../services/alert.service';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  standalone: true,
  imports: [
    DatePipe,
    NgClass,
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  protected messageForm: FormGroup;
  // After first submission attempt, form validation will start
  submitted: boolean = false;
  private message: Message[];

  constructor(private messageService: MessageService, private ngbPaginationConfig: NgbPaginationConfig, private formBuilder: FormBuilder,
              private cd: ChangeDetectorRef, protected authService: AuthService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.initMessageFormGroup();
    this.loadMessage();
  }

  private initMessageFormGroup() {
    this.messageForm = this.formBuilder.group<{
      title: FormControl<string>;
      summary: FormControl<string>;
      text: FormControl<string>;
    }>({
      title: this.formBuilder.control<string>('', Validators.required),
      summary: this.formBuilder.control<string>('', Validators.required),
      text: this.formBuilder.control<string>('', Validators.required)
    });
  }

  /**
   * Starts form validation and builds a message dto for sending a creation request if the form is valid.
   * If the procedure was successful, the form will be cleared.
   */
  addMessage() {
    this.submitted = true;
    if (this.messageForm.valid) {
      const message: Message = new Message(null,
        this.messageForm.controls.title.value,
        this.messageForm.controls.summary.value,
        this.messageForm.controls.text.value,
        new Date().toISOString()
      );
      this.createMessage(message);
      this.clearForm();
    } else {
      console.log('Invalid input');
    }
  }

  /**
   * Sends message creation request
   * @param message the message which should be created
   */
  createMessage(message: Message) {
    this.messageService.createMessage(message).subscribe({
        next: () => {
          this.loadMessage();
        },
        error: (error) => {
          console.log('Error while creating a message');
          this.alertService.error(error);
        }
      }
    );
  }

  getMessage(): Message[] {
    return this.message;
  }

  /**
   * Shows the specified message details. If it is necessary, the details text will be loaded
   * @param id the id of the message which details should be shown
   */
  getMessageDetails(id: number) {
    if (_.isEmpty(this.message.find(x => x.id === id).text)) {
      this.loadMessageDetails(id);
    }
  }

  /**
   * Loads the text of message and update the existing array of message
   * @param id the id of the message which details should be loaded
   */
  loadMessageDetails(id: number) {
    this.messageService.getMessageById(id).subscribe({
        next: (message) => {
          const result = this.message.find(x => x.id === id);
          result.text = message.text;
        }
        ,
        error: (error) => {
          this.alertService.error(error);
        }
      }
    );
  }

  /**
   * Loads the specified page of message from the backend
   */
  private loadMessage() {
    this.messageService.getMessages().subscribe({
        next: (message: Message[]) => {
          this.message = message;
        },
        error: (error) => {
          this.alertService.error(error);
        }
      }
    );
  }

  private clearForm() {
    this.messageForm.reset();
    this.submitted = false;
  }

}
