import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'bwm-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  @Output() imageUploaded = new EventEmitter<any>();
  @Output() imageError = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
