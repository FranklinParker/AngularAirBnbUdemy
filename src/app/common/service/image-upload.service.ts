import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) {
  }

  public uploadImage(image:File){
    const formData = new FormData();
    formData.set('image', image);
    return this.http.post('/api/v1/image-upload', formData)
      .pipe(map(((json: any) =>  json.imageUrl)));

  }
}
