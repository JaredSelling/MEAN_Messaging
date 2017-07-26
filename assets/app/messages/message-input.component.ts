import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';
import { Message } from './message.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html'
})
export class MessageInputComponent implements OnInit {
  message: Message;

  constructor(private messageService: MessageService) {}


  onSubmit(form: NgForm){
    if(this.message) {
      //edit
      this.message.content = form.value.content;
      this.messageService.updateMessage(this.message)
          .subscribe(
              result => console.log(result)
          );
      //set message to null so that form is reset
      this.message = null;
    } else {
      //create
      const message = new Message(form.value.content, 'Max');
      this.messageService.addMessage(message)
        .subscribe(
          data => console.log(data),
          error => console.error(error)
        );
    }
    form.resetForm();
  }

  onClear(form: NgForm){
    this.message = null;
    form.resetForm()
  }

  //ensure input box is subscribed to any edit events so that it can receive value to be edited
  ngOnInit(){
    this.messageService.messageIsEdit.subscribe(
      //set this.message to message passed through event emitter
      (message: Message) => this.message = message
    );
  }
}
