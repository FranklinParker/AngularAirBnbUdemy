import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditableInputComponent} from './editable-input/editable-input.component';
import {FormsModule} from '@angular/forms';
import { EditableTextareaComponent } from './editable-textarea/editable-textarea.component';
import { EditableSelectComponent } from './editable-select/editable-select.component';
import { EditableImageComponent } from './editable-image/editable-image.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    EditableInputComponent,
    EditableTextareaComponent,
    EditableSelectComponent,
    EditableImageComponent
  ],
  exports:[
    EditableInputComponent,
    EditableTextareaComponent,
    EditableSelectComponent,
    EditableImageComponent
  ]
})
export class EditableModule { }
