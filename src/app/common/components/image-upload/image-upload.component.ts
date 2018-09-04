import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ImageUploadService} from '../../service/image-upload.service';

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
  selectedFile: FileSnippet;
  constructor(private imageUploadService: ImageUploadService) { }

  ngOnInit() {
  }

  onSuccess(imageUrl){
    alert('file uploaded:' + imageUrl);
  }

  onFailure(err){
    alert('file upload fail:' + err);
  }
  processFile(file: File){

    const reader = new FileReader();

    reader.addEventListener('load', (event:any)=>{
      this.selectedFile = new FileSnippet(event.target.result, file);
      this.imageUploadService.uploadImage(this.selectedFile.file)
        .subscribe((imageUrl)=>{
          console.log('imageUrl', imageUrl);
          this.onSuccess(imageUrl);
        },(err)=>{
          console.log('err', err);
          this.onFailure(err);
        })


    });

    reader.readAsDataURL(file);
  }

}
