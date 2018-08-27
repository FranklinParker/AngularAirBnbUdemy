import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {endWith} from 'rxjs/internal/operators/endWith';

@Component({
  selector: 'bwm-editable-input',
  templateUrl: './editable-input.component.html',
  styleUrls: ['./editable-input.component.scss']
})
export class EditableInputComponent implements OnInit {
  @Input() entity: any;
  @Input() field: string;
  @Input() className:string;
  @Output() entityUpdate= new EventEmitter<string>();
  isActiveInput: boolean = false;

  constructor() { }

  ngOnInit() {
  }
  onEnterKey(){
    this.entityUpdate.emit( this.entity[this.field])

  }

}