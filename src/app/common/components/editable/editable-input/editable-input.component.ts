import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {endWith} from 'rxjs/internal/operators/endWith';

@Component({
  selector: 'bwm-editable-input',
  templateUrl: './editable-input.component.html',
  styleUrls: ['./editable-input.component.scss']
})
export class EditableInputComponent implements OnInit {
  @Input() entity: any;
  @Input() set field(entityField:string){
    this.entityField = entityField;
    this.setOriginValue();
  };
  @Input() className:string;
  @Input() type:string = 'text'
  @Input() style:any;
  @Output() entityUpdate= new EventEmitter<any>();
  isActiveInput: boolean = false;
  public originalValue: any;
  public entityField:string;

  constructor() { }

  ngOnInit() {
  }
  updateEntity(){
    const entityValue = this.entity[this.entityField];
    if(this.originalValue!== entityValue){
      this.entityUpdate.emit({[this.entityField]:this.entity[this.entityField]});
      this.setOriginValue();
    }
    this.isActiveInput = false;
  }
  cancelUpdate(){
    this.isActiveInput = false;
    this.entity[this.entityField] = this.originalValue;
  }
  setOriginValue(){
    this.originalValue = this.entity[this.entityField];
  }


}
