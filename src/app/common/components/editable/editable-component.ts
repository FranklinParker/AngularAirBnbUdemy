import {Input, Output, OnInit, EventEmitter, OnChanges} from '@angular/core';

export class EditableComponent implements OnInit, OnChanges {
  @Input() entity: any;
  @Input() set field(entityField:string){
    this.entityField = entityField;
    this.setOriginValue();
  };
  @Input() className:string;
  @Input() style:any;
  @Output() entityUpdate= new EventEmitter<any>();
  isActiveInput: boolean = false;
  public originalValue: any;
  public entityField:string;

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(){
    this.setOriginValue();
    this.isActiveInput = false;
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
    console.log('update cancelled');
    this.isActiveInput = false;
    this.entity[this.entityField] = this.originalValue;
  }
  setOriginValue(){
    this.originalValue = this.entity[this.entityField];
  }


}
