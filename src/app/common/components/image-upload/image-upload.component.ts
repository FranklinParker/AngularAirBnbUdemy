import {Component, EventEmitter, OnInit, Output} from '@angular/core';

class FileSnippet {
  constructor(public src:string, public file:File){

  }
}
@Component({
  selector: 'bwm-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  @Output() imageUploaded = new EventEmitter<any>();
  @Output() imageError = new EventEmitter();
  seletedFile: FileSnippet;
  constructor() { }

  ngOnInit() {
  }
  processFile(file: File){

    const reader = new FileReader();

    reader.addEventListener('load', (event:any)=>{
      this.seletedFile = new FileSnippet(event.target.result, file);
      console.log(this.seletedFile);

    });

    reader.readAsDataURL(file);
  }

}
