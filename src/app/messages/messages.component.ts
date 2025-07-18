import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Message} from '../model/message';
import {tap} from 'rxjs/operators';
import { MessagesService } from './messages.service';

@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css'],
    standalone: false
})
export class MessagesComponent implements OnInit {
 
  showmessages=false; 

  errors$: Observable<string[]>;

  constructor(public messagesService: MessagesService) {
    // You can inject the MessagesService here if needed
    console.log('MessagesComponent constructor called');
  }

  ngOnInit() {
this.errors$ = this.messagesService.errors$.pipe(
  tap(()=> this.showmessages = true) // Show messages when errors are emitted
)

  }


  onClose() {
this.showmessages=false;

  }

}
