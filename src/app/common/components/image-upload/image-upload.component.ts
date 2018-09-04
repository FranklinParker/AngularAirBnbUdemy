import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ImageUploadService} from '../../service/image-upload.service';

class FileSnippet {
  pending: boolean = false;
  status: string = 'INIT'
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
    this.selectedFile.pending = false;
    this.selectedFile.status = 'OK';
    this.imageUploaded.emit(imageUrl);
  }

  onFailure(err){
    this.selectedFile.pending = false;
    this.selectedFile.status = 'FAIL';
    this.selectedFile.src ='';
    this.imageError.emit('');
  }

  processFile(file: File){

    const reader = new FileReader();

    reader.addEventListener('load', (event:any)=>{
      this.selectedFile = new FileSnippet(event.target.result, file);
      this.selectedFile.pending = true;
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
