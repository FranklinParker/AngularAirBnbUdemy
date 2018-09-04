import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ImageUploadService} from '../../service/image-upload.service';

class FileSnippet {
  static readonly IMAGE_SIZE = {width: 950, height: 720};

  pending: boolean = false;
  status: string = 'INIT';

  constructor(public src: string, public file: File) {

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
  imageChangedEvent: any;


  constructor(private imageUploadService: ImageUploadService) {
  }

  ngOnInit() {
  }

  onSuccess(imageUrl) {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'OK';
    this.imageUploaded.emit(imageUrl);
  }

  onFailure(err) {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'FAIL';
    this.selectedFile.src = '';
    this.imageError.emit('');
  }

  imageCropped(file: File): FileSnippet | File {
    if (this.selectedFile) {
      return this.selectedFile.file = file;
    }
    return this.selectedFile = new FileSnippet('', file);
  }

  processFile(event: any) {

    this.selectedFile = undefined;
    const URL = window.URL;
    let file, img;
    const self = this;

    if ((file = event.target.files[0]) && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      img = new Image();

      const self = this;
      img.onload = function() {

        if (this.width > FileSnippet.IMAGE_SIZE.width && this.height > FileSnippet.IMAGE_SIZE.height) {
          self.imageChangedEvent = event;
        } else {
         // self.toastr.error(`Minimum width is ${FileSnippet.IMAGE_SIZE.width} and minimum heigth is ${FileSnippet.IMAGE_SIZE.height}`, 'Error!');
        }
      }

      img.src = URL.createObjectURL(file);
    } else {
      //this.toastr.error('Unsupported File Type. Only jpeg and png is allowed!', 'Error!');
    }

  }


  uploadImage() {
    if (this.selectedFile) {
      const reader = new FileReader();

      reader.addEventListener('load', (event: any) => {
        this.selectedFile.pending = true;
        this.imageUploadService.uploadImage(this.selectedFile.file)
          .subscribe((imageUrl) => {
            console.log('imageUrl', imageUrl);
            this.onSuccess(imageUrl);
          }, (err) => {
            console.log('err', err);
            this.onFailure(err);
          });
      });
      reader.readAsDataURL(this.selectedFile.file);
    }


  }
}
